import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
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

  // Function to add a transaction to the list
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Function to cancel a pending stock purchase
  const cancelPurchase = (id) => {
    // Implement logic to cancel the purchase
    // For example, remove the transaction with the specified id from the list
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
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
    </div>
  );
};

export default TransactionHistory;
