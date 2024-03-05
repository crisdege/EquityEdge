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
} from "@mui/material";

const BuyStockDialog = ({
  open,
  handleClose,
  cartItems,
  removeFromCart,
  clearCart,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <List>
          {cartItems.map((cartItem, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${cartItem.name} (${cartItem.ticker})`} />
              <Button color="secondary" onClick={() => removeFromCart(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={clearCart} color="secondary">
          Clear Cart
        </Button>
        <Button onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyStockDialog;
