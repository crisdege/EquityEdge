import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const PortfolioPage = ({ ownedStocks, sellStock, username }) => {
  const [sellQuantity, setSellQuantity] = useState({});
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sellError, setSellError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (event, symbol) => {
    const { value } = event.target;
    setSellQuantity({ ...sellQuantity, [symbol]: parseInt(value) || 0 });
  };

  const handleSell = (ticker) => {
    setSelectedStock(ticker);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmSell = async () => {
    try {
      const response = await fetch("/api/user/sell-stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          stockTicker: selectedStock,
          sharesToSell: sellQuantity[selectedStock] || 0,
        }),
      });

      console.log(response);

      if (!response.ok) {
        // If response is not ok, throw a custom error message
        throw new Error("Error: Unable to sell stocks. ");
      }

      const data = await response.json();
      console.log(data); // Log response for debugging or handling success/error

      // Reset sell quantity and close confirmation dialog
      setSellQuantity({ ...sellQuantity, [selectedStock]: 0 });
      setConfirmationDialogOpen(false);
      setSnackbarOpen(true); // Open the snackbar on successful sell
      setSnackbarMessage(
        `Successfully sold ${sellQuantity[selectedStock] || 0} shares of ${selectedStock}.`
      );
    } catch (error) {
      console.error("Error selling stocks:", error);
      setSellError("Error selling stocks: " + error.message);
      setSnackbarOpen(true); // Open the snackbar on error
      setSnackbarMessage("Error: " + error.message);
    }
  };

  const handleCancelSell = () => {
    setConfirmationDialogOpen(false);
    setSellError(null); // Clear any previous error when canceling
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>
      <List>
        {ownedStocks.map((stock) => (
          <StyledPaper key={stock.ticker} elevation={3}>
            <ListItem>
              <ListItemText
                primary={`${stock.name} (${stock.ticker})`}
                secondary={
                  <>
                    <Typography variant="body1">
                      Shares Owned: {stock.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Total Value: ${(stock.quantity * stock.price).toFixed(2)}
                    </Typography>
                  </>
                }
              />
              <div>
                <TextField
                  type="number"
                  label="Sell Quantity"
                  value={sellQuantity[stock.ticker] || ""}
                  onChange={(event) => handleChange(event, stock.ticker)}
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "8px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSell(stock.ticker)}
                  size="small"
                >
                  Sell
                </Button>
              </div>
            </ListItem>
          </StyledPaper>
        ))}
      </List>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelSell}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Sell"}</DialogTitle>
        <DialogContent>
          {sellError && ( // Display error message if there's an error
            <Typography color="error">{sellError}</Typography>
          )}
          <Typography>
            Are you sure you want to sell {sellQuantity[selectedStock] || 0}{" "}
            shares of {selectedStock}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSell} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancelSell} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default PortfolioPage;
