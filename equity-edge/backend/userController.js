const { User } = require("./eedb.js");
const jwt = require("jsonwebtoken");

//async function registerUser(req, res) {
 // try {
  //  console.log("Request Body:", req.body);
   // const newUser = new User(req.body);
   // const savedUser = await newUser.save();

  //  res.status(201).json(savedUser);
 // } catch (error) {
  //  console.error("Error creating user:", error);
  //  res.status(500).json({ error: "Internal server error" });
 // }
//}

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

//async function loginUser(req, res) {
  //try {
   // const { username, password } = req.body;
   // const user = await User.findOne({ username });

   // console.log("user", user);

   // if (!user || user.password !== password) {
    //  return res.status(401).json({ error: "Invalid username or password" });
   // }
    

    // Generate JWT token
   // const token = jwt.sign(
    //  { userId: user._id, username: user.username },
    //  "your_secret_key"
   // );
   // res.json({ token, user });
  //} catch (error) {
  //  console.error("Error logging in:", error);
   // res.status(500).json({ error: "Internal server error" });
  //}
//}

async function getUserByUsername(req, res) {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = {
  //registerUser,
  getAllUsers,
  getUserByUsername,
  checkPassword,
  //loginUser,
};
