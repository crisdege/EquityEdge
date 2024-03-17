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
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const PortfolioPage = ({ ownedStocks, sellStock }) => {
  const [sellQuantity, setSellQuantity] = useState({});
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleChange = (event, symbol) => {
    const { value } = event.target;
    setSellQuantity({ ...sellQuantity, [symbol]: parseInt(value) || 0 });
  };

  // TODO: Sean function to sell stock will go here
  const handleSell = (ticker) => {
    setSelectedStock(ticker);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmSell = () => {
    sellStock(selectedStock, sellQuantity[selectedStock] || 0);
    setSellQuantity({ ...sellQuantity, [selectedStock]: 0 });
    setConfirmationDialogOpen(false);
  };

  const handleCancelSell = () => {
    setConfirmationDialogOpen(false);
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
    </div>
  );
};

export default PortfolioPage;
