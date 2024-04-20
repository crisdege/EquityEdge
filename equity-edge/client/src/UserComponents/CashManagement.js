import React, { useState, useEffect } from "react";
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

const CashManagement = ({ username }) => {
  const [cashBalance, setCashBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState(); // Amount for transaction (deposit or withdrawal)
  const [transferFrom, setTransferFrom] = useState(null); // Transfer from account
  const [transferTo, setTransferTo] = useState(null); // Transfer to account
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Fetch the cash balance from the database when the component mounts
    const getCashBalance = async () => {
      try {
        const response = await fetch(`/api/user/get-cash?username=${username}`);

        if (!response.ok) {
          throw new Error("Failed to fetch cash balance");
        }

        const data = await response.json();
        setCashBalance(data.cashBalance);
      } catch (error) {
        console.error("Error fetching cash balance:", error);
        // Handle error
      }
    };

    getCashBalance();
  }, [selectedTab, username, transferFrom, transferTo]);

  const handleTransfer = async () => {
    if (transactionAmount > 0 && transferFrom && transferTo) {
      try {
        if (transferFrom === "Checking" && transferTo === "Cash Balance") {
          const response = await fetch("/api/user/deposit-cash", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              amount: transactionAmount,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to deposit cash");
          }
        } else if (
          transferFrom === "Cash Balance" &&
          transferTo === "Checking"
        ) {
          const response = await fetch("/api/user/withdraw-cash", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              amount: transactionAmount,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to withdraw cash");
          }
        }

        // Update UI or any other necessary actions after successful transfer
        setTransactionAmount(0);
        setTransferFrom(null);
        setTransferTo(null);
        console.log("Transfer initiated");
      } catch (error) {
        console.error("Transfer error:", error);
        // Handle error
      }
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Current Cash Balance: $
        {cashBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
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
