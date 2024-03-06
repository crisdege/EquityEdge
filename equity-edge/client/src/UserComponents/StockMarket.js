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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import BuyStockDialog from "./BuyStockDialog";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [stockPrices, setStockPrices] = useState({});

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
    setCartItems([...cartItems, stock]);
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
      const high = stockPrice ? Math.max(...stockPrice) : 0;
      const low = stockPrice ? Math.min(...stockPrice) : 0;

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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Stock Market
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenDialog(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Available Stocks
      </Typography>
      <List>
        {availableStocks.map((stock) => (
          <div key={stock.ticker}>
            <ListItem>
              {/* <ListItemText
                primary={`${stock.name} (${stock.ticker})`}
                secondary={`Price: ${stockPrices[stock.ticker]?.[0] || 0}`}
              /> */}
              <ListItemText
                primary={`${stock.name} (${stock.ticker}) - Price: ${generateFakeData()[stock.ticker]?.price}, Volume: ${generateFakeData()[stock.ticker]?.volume}, Market Cap: ${generateFakeData()[stock.ticker]?.marketCap}`}
                secondary={`Open: ${generateFakeData()[stock.ticker]?.openingPrice}, High: ${generateFakeData()[stock.ticker]?.high}, Low: ${generateFakeData()[stock.ticker]?.low}`}
              />
              <Button variant="contained" onClick={() => addToCart(stock)}>
                Add to Cart
              </Button>
            </ListItem>
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
          </div>
        ))}
      </List>
      <BuyStockDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default StockMarket;
