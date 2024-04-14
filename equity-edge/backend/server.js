const express = require("express");
const { db } = require("./eedb.js"); 
const { registerUser, getAllUsers } = require("./userController");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/user", registerUser);

app.get("/api/users", getAllUsers);

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});