const express = require("express");
const { db } = require("./eedb.js"); 
const jwt = require("jsonwebtoken");
const {
  registerUser,
  getAllUsers,
  checkPassword,
  loginUser,
} = require("./userController");
const { getAllStocks, addStock } = require("./stockController"); 

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

//app.post("/api/user", registerUser);
app.post("/api/user", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users", getAllUsers);

app.post("/api/user/checkpassword", checkPassword);

app.post("/api/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_secret_key"
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/stocks", addStock)

app.get("/api/stocks", getAllStocks); 

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
