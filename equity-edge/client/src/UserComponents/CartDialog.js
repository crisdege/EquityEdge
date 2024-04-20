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

const CartDialog = ({
  open,
  handleClose,
  cartItems,
  removeFromCart,
  userID,
  username,
}) => {
  // Calculate the total price for each item and the grand total
  console.log("cartDialog username", username);
  const calculateTotalPrice = () => {
    let grandTotal = 0;
    const itemsWithTotalPrice = cartItems.map((item) => {
      const totalPrice = item.price * item.quantity;
      grandTotal += totalPrice;
      return { ...item, totalPrice };
    });
    return { itemsWithTotalPrice, grandTotal };
  };

  // const handleBuy = async () => {
  //   try {
  //     // Assuming you have an API endpoint to handle the buy action
  //     const response = await fetch("/api/user/buy-stocks", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cartItems, username), // Send the cart items to the server
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to process purchase");
  //     }

  //     // If purchase is successful, clear the cart
  //     removeFromCart();

  //     // Close the dialog
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error buying stocks:", error);
  //     // Handle error
  //   }
  // };
  const handleBuy = async () => {
    try {
      // Map cartItems to match backend's expectations
      // Format cart items
      const formattedCartItems = cartItems.map(
        ({ companyName, stockTicker, quantity, price }) => ({
          stockTicker,
          sharesPurchased: parseInt(quantity), // Convert quantity to a number if necessary
          initialPrice: parseFloat(price), // Convert price to a number if necessary
        })
      );

      // Add the username to each formatted item
      formattedCartItems.forEach((item) => {
        item.username = username;
      });

      // Assuming you have an API endpoint to handle the buy action
      const response = await fetch("/api/user/buy-stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedCartItems), // Send the formatted cart items to the server
      });

      if (!response.ok) {
        throw new Error("Failed to process purchase");
      }

      // If purchase is successful, clear the cart
      removeFromCart();

      // Close the dialog
      handleClose();
    } catch (error) {
      console.error("Error buying stocks:", error);
      // Handle error
    }
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
  );
};

export default CartDialog;
