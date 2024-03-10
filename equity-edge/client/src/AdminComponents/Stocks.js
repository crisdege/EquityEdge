import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

function Stocks() {
  const [companyName, setCompanyName] = useState("");
  const [stockTicker, setStockTicker] = useState("");
  const [volume, setVolume] = useState("");
  const [initialPrice, setInitialPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., sending data to backend
    console.log({
      companyName,
      stockTicker,
      volume,
      initialPrice,
    });
    // Reset form fields after submission
    setCompanyName("");
    setStockTicker("");
    setVolume("");
    setInitialPrice("");
  };

  return (
    <div>
      <Typography variant="h6">Add Stocks</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stock Ticker"
              variant="outlined"
              fullWidth
              value={stockTicker}
              onChange={(e) => setStockTicker(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Volume"
              variant="outlined"
              fullWidth
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Initial Price"
              variant="outlined"
              fullWidth
              type="number"
              value={initialPrice}
              onChange={(e) => setInitialPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Stock
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Stocks;
