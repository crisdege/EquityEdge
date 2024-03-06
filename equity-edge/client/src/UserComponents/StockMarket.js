import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Badge,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import CartDialog from "./CartDialog";

const availableStocks = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "GOOGL", name: "Alphabet Inc." },
  // Add more stocks as needed
];

// Function to generate random stock prices
const generateRandomStockPrice = (
  initialPrice,
  volatility,
  maxFluctuation,
  steps
) => {
  let price = initialPrice;
  const priceHistory = [initialPrice];

  for (let i = 0; i < steps; i++) {
    // Generate a random fluctuation within the range of maxFluctuation
    const fluctuation = (Math.random() - 0.5) * 2 * maxFluctuation;

    // Update the price with the fluctuation and add it to the price history
    price += fluctuation;
    priceHistory.push(price);

    // Gradually increase or decrease volatility throughout the day
    volatility *= Math.random() * 0.2 + 0.9; // Random factor between 0.9 and 1.1

    // Apply volatility to the next fluctuation
    const nextFluctuation =
      (Math.random() - 0.5) * 2 * volatility * maxFluctuation;

    // Update the price with the next fluctuation
    price += nextFluctuation;
    priceHistory.push(price);
  }

  return priceHistory;
};

const StockMarket = () => {
  const [cartItems, setCartItems] = useState([]);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [stockPrices, setStockPrices] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(0);

  useEffect(() => {
    // Generate random prices for each stock
    const generatePrices = () => {
      const prices = {};
      availableStocks.forEach((stock) => {
        const initialPrice = Math.floor(Math.random() * 1000) + 1; // Initial price between 1 and 1000
        const volatility = Math.random() * 0.1 + 0.05; // Random volatility between 0.05 and 0.15
        const maxFluctuation = Math.floor(Math.random() * 10) + 1; // Random max fluctuation between 1 and 10
        const steps = 100; // Number of steps throughout the day
        prices[stock.ticker] = generateRandomStockPrice(
          initialPrice,
          volatility,
          maxFluctuation,
          steps
        );
      });
      setStockPrices(prices);
    };

    generatePrices();
  }, []);

  const generateStockChartData = (ticker) => {
    const stockData = [];
    const prices = stockPrices[ticker] || [];

    for (let i = 0; i < prices.length; i++) {
      stockData.push([Date.now() - i * 1000, prices[i]]);
    }

    return stockData;
  };

  const addToCart = (stock) => {
    const stockWithPrice = {
      ...stock,
      price: (generateFakeData()[stock.ticker]?.price || 0).toFixed(2), // Add price information formatted to 2 decimal places
    };
    setSelectedStock(stockWithPrice);
    setOpenBuyDialog(true);
  };

  const handleAddToCart = () => {
    setCartItems([...cartItems, { ...selectedStock, quantity: buyQuantity }]);
    setOpenBuyDialog(false);
    setBuyQuantity(0);
    setSelectedStock(null);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const generateFakeData = () => {
    const fakeData = {};
    availableStocks.forEach((stock) => {
      const initialPrice = Math.floor(Math.random() * 1000) + 1;
      const volume = Math.floor(Math.random() * 1000) + 1;
      const marketCap = initialPrice * volume;
      const openingPrice = initialPrice;
      const stockPrice = stockPrices[stock.ticker];
      const high = stockPrice ? Math.max(...stockPrice).toFixed(2) : 0;
      const low = stockPrice ? Math.min(...stockPrice).toFixed(2) : 0;

      fakeData[stock.ticker] = {
        price: stockPrice ? stockPrice[0] : 0,
        volume,
        marketCap,
        openingPrice,
        high,
        low,
      };
    });
    return fakeData;
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "white", color: "black" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
            Stock Market
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setOpenCartDialog(true)}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Available Stocks
        </Typography>
        <Grid container spacing={2}>
          {availableStocks.map((stock) => (
            <Grid item xs={12} md={6} lg={4} key={stock.ticker}>
              <Box
                boxShadow={1}
                p={2}
                bgcolor="background.paper"
                borderRadius={2}
              >
                <Typography variant="h6" gutterBottom>
                  {stock.name} ({stock.ticker})
                </Typography>
                <Typography gutterBottom>
                  Price: {generateFakeData()[stock.ticker]?.price}, Volume:{" "}
                  {generateFakeData()[stock.ticker]?.volume}, Market Cap:{" "}
                  {generateFakeData()[stock.ticker]?.marketCap}
                </Typography>
                <Typography gutterBottom>
                  Open: {generateFakeData()[stock.ticker]?.openingPrice}, High:{" "}
                  {generateFakeData()[stock.ticker]?.high}, Low:{" "}
                  {generateFakeData()[stock.ticker]?.low}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => addToCart(stock)}
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
                <HighchartsReact
                  key={stock.ticker}
                  highcharts={Highcharts}
                  options={{
                    title: {
                      text: `${stock.name} (${stock.ticker}) Stock Price`,
                    },
                    series: [
                      {
                        name: "Stock Price",
                        data: generateStockChartData(stock.ticker),
                      },
                    ],
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <CartDialog
        open={openCartDialog}
        handleClose={() => setOpenCartDialog(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <Dialog
        open={openBuyDialog}
        onClose={() => setOpenBuyDialog(false)}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Buy Stocks
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
          <TextField
            label="Quantity"
            type="number"
            value={buyQuantity}
            onChange={(e) => setBuyQuantity(e.target.value)}
            fullWidth
            style={{ margin: "8px 0" }} // Adjusted margin
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyDialog(false)}>Cancel</Button>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockMarket;
