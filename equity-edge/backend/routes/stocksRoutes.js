const express = require('express');
const router = express.Router();
const Transaction = require('./models/Transaction');
const User = require('./models/User');

const authenticateUser = (req, res, next) => {
  // jwt authentication will go here
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.userId = userId;
  next();
};

router.get('/user/:userId/transactions', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/user/:userId/transactions', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const newTransaction = new Transaction({ userId, ...req.body });
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/user/:userId/transactions/:transactionId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactionId = req.params.transactionId;

    await Transaction.deleteOne({ _id: transactionId, userId });

    res.json({ message: 'Transaction canceled successfully' });
  } catch (error) {
    console.error('Error canceling transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
