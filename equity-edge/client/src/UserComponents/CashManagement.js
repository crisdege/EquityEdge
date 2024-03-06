import React, { useState } from "react";
import { Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CashManagement = () => {
  const [cashBalance, setCashBalance] = useState(10000); // Initial cash balance
  const [transactionAmount, setTransactionAmount] = useState(0); // Amount for transaction (deposit or withdrawal)

  // Function to handle cash deposit
  const handleDeposit = () => {
    if (transactionAmount > 0) {
      setCashBalance(cashBalance + transactionAmount);
      setTransactionAmount(0);
    }
  };

  // Function to handle cash withdrawal
  const handleWithdrawal = () => {
    if (transactionAmount > 0 && transactionAmount <= cashBalance) {
      setCashBalance(cashBalance - transactionAmount);
      setTransactionAmount(0);
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        Cash Management
      </Typography>
      <Typography variant="h6" gutterBottom>
        Current Cash Balance: ${cashBalance}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            type="number"
            label="Amount"
            value={transactionAmount}
            onChange={(e) =>
              setTransactionAmount(parseInt(e.target.value) || 0)
            }
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleDeposit} color="primary">
            Deposit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleWithdrawal}
            color="secondary"
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default CashManagement;
