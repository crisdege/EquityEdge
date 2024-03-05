import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

const Portfolio = ({ ownedStocks, sellStock }) => {
  const [sellQuantity, setSellQuantity] = useState({});

  const handleChange = (event, symbol) => {
    const { value } = event.target;
    setSellQuantity({ ...sellQuantity, [symbol]: parseInt(value) || 0 });
  };

  const handleSell = (symbol) => {
    sellStock(symbol, sellQuantity[symbol] || 0);
    setSellQuantity({ ...sellQuantity, [symbol]: 0 });
  };
  console.log(ownedStocks);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>
      <List>
        {ownedStocks.map((stock) => (
          <ListItem key={stock.ticker}>
            <ListItemText
              primary={`${stock.name}, ${stock.ticker} - ${stock.quantity} shares`}
            />
            <TextField
              type="number"
              label="Sell Quantity"
              value={sellQuantity[stock.ticker] || ""}
              onChange={(event) => handleChange(event, stock.ticker)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSell(stock.symbol)}
            >
              Sell
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Portfolio;
