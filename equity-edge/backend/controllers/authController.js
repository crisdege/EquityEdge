const jwt = require('jsonwebtoken');
const User = require('../models/User');

//authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, 'your-secret-key'); 

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { authenticateUser };

