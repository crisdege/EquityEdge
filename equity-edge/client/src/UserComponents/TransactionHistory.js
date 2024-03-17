import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontWeight: "bold",
  color: "#666",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "buy",
      symbol: "AAPL",
      quantity: 10,
      timestamp: Date.now() - 3600000,
    },
    {
      id: 2,
      type: "sell",
      symbol: "MSFT",
      quantity: 5,
      timestamp: Date.now() - 7200000,
    },
    {
      id: 3,
      type: "deposit",
      amount: 5000,
      timestamp: Date.now() - 10800000,
    },
  ]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  // Function to add a transaction to the list
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // TODO: Sean Function to cancel a pending stock purchase
  const cancelPurchase = (id) => {
    setSelectedTransactionId(id);
    // will also need to send this to the back end to delete from database
    setCancelDialogOpen(true);
  };

  // Function to confirm canceling a transaction
  const confirmCancel = () => {
    // Implement logic to cancel the purchase
    // For example, remove the transaction with the specified id from the list
    const updatedTransactions = transactions.filter(
      (t) => t.id !== selectedTransactionId
    );
    setTransactions(updatedTransactions);
    setCancelDialogOpen(false);
    setSelectedTransactionId(null);
  };

  // Function to cancel the cancelation of the transaction
  const cancelCancel = () => {
    setCancelDialogOpen(false);
    setSelectedTransactionId(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      <List>
        {transactions.map((transaction) => (
          <StyledPaper key={transaction.id}>
            <ListItem>
              <StyledListItemText
                primary={
                  transaction.type === "buy"
                    ? `Bought ${transaction.quantity} shares of ${transaction.symbol}`
                    : transaction.type === "sell"
                      ? `Sold ${transaction.quantity} shares of ${transaction.symbol}`
                      : transaction.type === "deposit"
                        ? `Deposited $${transaction.amount}`
                        : transaction.type === "withdrawal"
                          ? `Withdrew $${transaction.amount}`
                          : ""
                }
                secondary={new Date(transaction.timestamp).toLocaleString()}
              />
              {transaction.type === "buy" && (
                <StyledButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => cancelPurchase(transaction.id)}
                >
                  Cancel
                </StyledButton>
              )}
            </ListItem>
          </StyledPaper>
        ))}
      </List>
      <Dialog open={cancelDialogOpen} onClose={cancelCancel}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this transaction?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelCancel}>No</Button>
          <Button onClick={confirmCancel} color="secondary">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionHistory;
