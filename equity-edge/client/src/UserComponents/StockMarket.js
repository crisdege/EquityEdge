import React, { useState } from "react";
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

import BuyStockDialog from "./BuyStockDialog";

const availableStocks = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "GOOGL", name: "Alphabet Inc." },
  // Add more stocks as needed
];

const StockMarket = () => {
  const [cartItems, setCartItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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
          <ListItem key={stock.ticker}>
            <ListItemText primary={`${stock.name} (${stock.ticker})`} />
            <Button variant="contained" onClick={() => addToCart(stock)}>
              Add to Cart
            </Button>
          </ListItem>
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
