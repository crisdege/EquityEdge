const express = require('express');
const mongoose = require('./db');
const User = require('./models/User'); 
const stocksRoutes = require('./stocksRoutes');
const userRoutes = require('./user'); 
const stockMarketRoutes = require('./stockmarket'); 
const app = express();

app.use(express.json());

app.use('/api', stocksRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/stockmarket', stockMarketRoutes); 

app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findOne({ userId: '123' }); // placeholder data

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// route for buying stocks
app.post('/api/buy-stocks', async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
