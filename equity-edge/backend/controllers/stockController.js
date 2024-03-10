const User = require('../models/User');

const buyStocks = async (req, res) => {
  try {
    const { userId, stocksToBuy } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

await user.save();

    res.json({ message: 'Stocks bought successfully' });
  } catch (error) {
    console.error('Error buying stocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sellStocks = async (req, res) => {
  try {
    const { userId, stockToSell } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.save();

    res.json({ message: 'Stock sold successfully' });
  } catch (error) {
    console.error('Error selling stocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { buyStocks, sellStocks };
