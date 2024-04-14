const { User } = require("../backend/eedb");

async function registerUser(req, res) {
  try {
    console.log("Request Body:", req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { registerUser };
