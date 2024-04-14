const express = require("express");
const cors = require("cors");
const { db, User } = require("./eedb.js");
const { registerUser } = require("./userController");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/user", registerUser);

const PORT = process.env.PORT || 3001;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
