import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Autocomplete,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
}));

const CashManagement = () => {
  const [cashBalance, setCashBalance] = useState(10000); // Initial cash balance
  const [transactionAmount, setTransactionAmount] = useState(0); // Amount for transaction (deposit or withdrawal)
  const [transferFrom, setTransferFrom] = useState(null); // Transfer from account
  const [transferTo, setTransferTo] = useState(null); // Transfer to account

  // Function to handle transferring funds
  const handleTransfer = () => {
    if (transactionAmount > 0 && transferFrom && transferTo) {
      // Implement transfer logic
      console.log("Transfer initiated");
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
      <Box my={2}>
        {" "}
        {/* Add space above and below Transfer Funds */}
        <Divider />
      </Box>
      <Typography variant="h5" gutterBottom>
        Transfer Funds
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Transfer From:
          </Typography>
          <Autocomplete
            fullWidth
            value={transferFrom}
            onChange={(event, newValue) => {
              setTransferFrom(newValue);
            }}
            options={["Checking", "Cash Balance"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select an account to move money from"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Transfer To:
          </Typography>

          <Autocomplete
            fullWidth
            value={transferTo}
            onChange={(event, newValue) => {
              setTransferTo(newValue);
            }}
            options={["Checking", "Cash Balance"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select an account to move money to"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Transfer Amount: $
          </Typography>

          <TextField
            fullWidth
            type="number"
            value={transactionAmount}
            onChange={(e) =>
              setTransactionAmount(parseInt(e.target.value) || 0)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button
            size="small"
            variant="outlined"
            onClick={handleTransfer}
            color="primary"
          >
            Complete Transfer
          </Button>
          <Button size="small" variant="outlined" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default CashManagement;
