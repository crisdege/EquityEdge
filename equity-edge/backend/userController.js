const { User, Stock } = require("./eedb.js");
const jwt = require("jsonwebtoken");
const StockPurchase = require("./schema/stockPuchaseSchema.js");

async function registerUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function checkPassword(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password === password) {
      return res.json({ message: "Password matches" });
    } else {
      return res.status(401).json({ error: "Password does not match" });
    }
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_secret_key"
    );
    res.json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// async function getUserByUsername(req, res) {
//   try {
//     const username = req.body;

//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

async function depositCash(req, res) {
  try {
    const { username, amount } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the deposited amount to the user's cash balance
    user.portfolio.cash += amount;

    // Save the updated user object
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error depositing cash:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function withdrawCash(req, res) {
  try {
    const { username, amount } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the deposited amount to the user's cash balance
    user.portfolio.cash -= amount;

    // Save the updated user object
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error depositing cash:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCash(req, res) {
  try {
    const { username } = req.query;
    console.log(req.query.username);

    // Find the user by their username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the cash balance from the user's portfolio
    const cashBalance = user.portfolio.cash;

    res.status(200).json({ cashBalance });
  } catch (error) {
    console.error("Error getting cash balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function buyStocks(req, res) {
  try {
    const data = req.body; // Assuming req.body is an array of objects
    console.log(data);
    for (const item of data) {
      const { username, stockTicker, sharesPurchased, initialPrice } = item;

      // Find the user by their username
      const user = await User.findOne({ username: username });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Calculate the total value of the transaction
      const totalValue = initialPrice * sharesPurchased;

      // Check if the user has enough cash to buy the stocks
      if (user.portfolio.cash < totalValue) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      // Find the stock by its ticker symbol
      const stock = await Stock.findOne({ stockTicker });

      if (!stock) {
        return res.status(404).json({ error: "Stock not found" });
      }

      // Update the user's cash balance
      user.portfolio.cash -= totalValue;

      // Update the total amount of shares purchased by the user
      user.portfolio.totalSharesPurchased += sharesPurchased;

      // Save the updated user object
      await user.save();

      // Create a new stock purchase instance
      const newStockPurchase = new StockPurchase({
        user: user._id,
        stock: stock._id,
        sharesPurchased,
        initialPrice,
      });

      // Save the new stock purchase
      await newStockPurchase.save();

      // Push the ID of the new stock purchase into the user's stocks array
      user.portfolio.stocks.push(newStockPurchase._id);

      // Save the user object again to update the stocks array
      await user.save();
    }

    res.status(200).json({ message: "Stocks purchased successfully" });
  } catch (error) {
    console.error("Error buying stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function sellStocks(req, res) {
  try {
    const { username, stockTicker, sharesToSell } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the stock by its ticker symbol
    const stock = await Stock.findOne({ stockTicker });

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Find the stock purchase associated with the user and the stock
    const stockPurchase = await StockPurchase.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (!stockPurchase) {
      return res.status(404).json({ error: "Stock purchase not found" });
    }

    // Check if the user has enough shares to sell
    if (stockPurchase.sharesPurchased < sharesToSell) {
      return res.status(400).json({ error: "Insufficient shares to sell" });
    }

    // Calculate the total value of the transaction
    const totalValue = stock.initialPrice * sharesToSell;

    // Update the user's cash balance
    user.portfolio.cash += totalValue;

    // Update the sharesPurchased field in the stock purchase
    stockPurchase.sharesPurchased -= sharesToSell;

    // Save the updated user and stock purchase
    await user.save();
    await stockPurchase.save();

    res.status(200).json({ message: "Stocks sold successfully" });
  } catch (error) {
    console.error("Error selling stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getUserStocks(req, res) {
  try {
    const userId = req.params;

    // Find the user by their ID
    const user = await User.findById(userId.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the stocks owned by the user
    const userStocks = await StockPurchase.find({ user: user._id });

    res.status(200).json({ userStocks });
  } catch (error) {
    console.error("Error fetching user stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  registerUser,
  getAllUsers,
  // getUserByUsername,
  checkPassword,
  loginUser,
  depositCash,
  withdrawCash,
  buyStocks,
  sellStocks,
  getUserStocks,
  getCash,
};
