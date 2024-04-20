const express = require("express");
const { db, Stock } = require("./eedb.js");
const {
  registerUser,
  getAllUsers,
  getUserByUsername,
  checkPassword,
  loginUser,
  depositCash,
  withdrawCash,
  buyStocks,
  sellStocks,
  getUserStocks,
} = require("./userController");
const { getAllStocks, addStock } = require("./stockController");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/user", registerUser);

app.get("/api/users", getAllUsers);

app.get("/api/user/:username", getUserByUsername);

app.post("/api/user/checkpassword", checkPassword);

app.post("/api/user/login", loginUser);

app.post("/api/stocks", addStock);

app.get("/api/stocks", getAllStocks);

app.post("/api/user/deposit-cash", depositCash);
app.post("/api/user/withdraw-cash", withdrawCash);

app.post("/api/user/buy-stocks", buyStocks);
app.post("/api/user/sell-stocks", sellStocks);

app.get("/api/user/:userId/stocks", getUserStocks);
app.get("/api/stocks/:stock");

app.get("/api/stocks/:stockIds", async (req, res) => {
  try {
    // Extract stock IDs from the request parameters
    const stockIds = req.params.stockIds.split(",");

    // Fetch stock details for the provided IDs
    const stockDetails = await Stock.find({ _id: { $in: stockIds } });

    // Send the fetched stock details in the response
    res.json(stockDetails);
  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
