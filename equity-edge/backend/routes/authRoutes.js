const express = require('express');
const router = express.Router();

// placeholder data
const users = [
  { id: 1, username: 'demo', password: 'password' },
  // more can be added
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

module.exports = router;
