import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const CartDialog = ({ open, handleClose, cartItems, removeFromCart }) => {
  // Calculate the total price for each item and the grand total
  console.log(cartItems);
  const calculateTotalPrice = () => {
    let grandTotal = 0;
    const itemsWithTotalPrice = cartItems.map((item) => {
      const totalPrice = item.price * item.quantity;
      grandTotal += totalPrice;
      return { ...item, totalPrice };
    });
    return { itemsWithTotalPrice, grandTotal };
  };

  const handleBuy = () => {
    // TODO: Sean this is where the code to add the stocks to the database will go
  };

  const { itemsWithTotalPrice, grandTotal } = calculateTotalPrice();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <List>
          {itemsWithTotalPrice.map((cartItem, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${cartItem.name} (${cartItem.ticker})`}
                secondary={
                  <>
                    <Typography variant="body2">
                      Quantity: {cartItem.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Price per share: ${cartItem.price}
                    </Typography>
                    <Typography variant="body2">
                      Total: ${cartItem.totalPrice.toFixed(2)}
                    </Typography>
                  </>
                }
              />
              <Button
                color="secondary"
                onClick={() => removeFromCart(index)}
                variant="outlined"
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">
          Grand Total: ${grandTotal.toFixed(2)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleBuy}>Buy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
