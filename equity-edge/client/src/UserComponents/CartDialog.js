import React, { useState } from "react";
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
  Snackbar,
} from "@mui/material";

const CartDialog = ({
  open,
  handleClose,
  cartItems,
  removeFromCart,
  username,
}) => {
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const calculateTotalPrice = () => {
    let grandTotal = 0;
    const itemsWithTotalPrice = cartItems.map((item) => {
      const totalPrice = item.price * item.quantity;
      grandTotal += totalPrice;
      return { ...item, totalPrice };
    });
    return { itemsWithTotalPrice, grandTotal };
  };

  const handleBuy = async () => {
    try {
      const formattedCartItems = cartItems.map(
        ({ companyName, stockTicker, quantity, price }) => ({
          username,
          stockTicker,
          sharesPurchased: parseInt(quantity),
          initialPrice: parseFloat(price),
        })
      );

      const response = await fetch("/api/user/buy-stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedCartItems),
      });

      if (!response.ok) {
        let errorMessage = "Failed to process purchase";
        const responseData = await response.json();
        if (
          responseData.error &&
          responseData.error.includes("Insufficient funds")
        ) {
          errorMessage = "Insufficient funds";
        }
        throw new Error(errorMessage);
      }

      // If purchase is successful, clear the cart
      removeFromCart();

      // Close the dialog
      handleClose();

      // Display success message
      showSnackbar("Purchase successful", "success");
    } catch (error) {
      console.error("Error buying stocks:", error);
      // Display error message
      showSnackbar(error.message, "error");
    }
  };

  const { itemsWithTotalPrice, grandTotal } = calculateTotalPrice();

  const showSnackbar = (message, type) => {
    setSnackbarMessage({ message, type });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <List>
            {itemsWithTotalPrice.map((cartItem, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${cartItem.companyName} (${cartItem.stockTicker})`}
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

      {/* Snackbar-like notification */}
      {snackbarMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor:
              snackbarMessage.type === "success" ? "green" : "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          {snackbarMessage.message}
        </div>
      )}
    </>
  );
};

export default CartDialog;
