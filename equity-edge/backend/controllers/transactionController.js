const User = require('../models/User');
const depositFunds = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.save();

    res.json({ message: 'Funds deposited successfully' });
  } catch (error) {
    console.error('Error depositing funds:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const withdrawFunds = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.save();

    res.json({ message: 'Funds withdrawn successfully' });
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ transactions: user.transactions });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { depositFunds, withdrawFunds, getTransactionHistory };
