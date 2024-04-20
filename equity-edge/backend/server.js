const express = require("express");
const { db } = require("./eedb.js");
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

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
