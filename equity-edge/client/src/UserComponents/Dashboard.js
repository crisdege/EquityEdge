import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";
import StockMarket from "./StockMarket"; // Import StockMarket component
import Portfolio from "./Portfolio";
import CashManagement from "./CashManagement";
import TransactionHistory from "./TransactionHistory";

const Dashboard = ({ userId, userFullName }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [cashBalance, setCashBalance] = useState(10000); // Initial cash balance
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const [ownedStocks, setOwnedStocks] = useState({}); // Initialize ownedStocks as an empty object
  const fakeStocks = [
    { ticker: "AAPL", name: "Apple Inc.", price: 150, quantity: 10 },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      price: 200,
      quantity: 50,
    },
    { ticker: "GOOGL", name: "Alphabet Inc.", price: 250, quantity: 15 },
  ];
  const sellStock = (symbol) => {
    // Implement logic to sell stocks
    // Update the ownedStocks state accordingly
    // For example:
    const updatedOwnedStocks = { ...ownedStocks };
    // Implement logic to decrement the number of shares the user owns for the specified stock symbol
    updatedOwnedStocks[symbol] -= 1;
    setOwnedStocks(updatedOwnedStocks);
  };

  useEffect(() => {
    // Simulated data for stocks

    setOwnedStocks(fakeStocks);

    // Simulated data for transaction history
    const fakeTransactions = [
      { id: 1, type: "BUY", symbol: "AAPL", quantity: 5, price: 150 },
      { id: 2, type: "SELL", symbol: "GOOGL", quantity: 2, price: 2000 },
      { id: 3, type: "BUY", symbol: "MSFT", quantity: 3, price: 180 },
    ];

    // Set fake data to state
    setPortfolio(fakeStocks);
    setTransactionHistory(fakeTransactions);
  }, [userId]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear user session, etc.)
    // After logout, navigate to the authentication page
    navigate("/");
  };

  return (
    <div>
      <Paper elevation={3} style={{ marginBottom: "16px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Welcome {userFullName}</Typography>
          <Tabs value={selectedTab} onChange={handleChangeTab} centered>
            <Tab label="Portfolio" />
            <Tab label="Buy Stocks" />
            <Tab label="Cash Balance" />
            <Tab label="Transaction History" />
          </Tabs>
        </Box>
        <div style={{ padding: "16px" }}>
          {selectedTab === 0 && <Portfolio ownedStocks={fakeStocks} />}
          {selectedTab === 1 && (
            <StockMarket ownedStocks={ownedStocks} sellStock={sellStock} />
          )}{" "}
          {/* Render StockMarket component when "Trade Stocks" tab is selected */}
          {selectedTab === 2 && (
            <CashManagement />
            // <div>
            //   <Typography variant="h6" gutterBottom>
            //     Cash Balance
            //   </Typography>
            //   <Typography>${cashBalance}</Typography>
            // </div>
          )}
          {selectedTab === 3 && (
            <TransactionHistory />
            // <div>
            //   <Typography variant="h6" gutterBottom>
            //     Transaction History
            //   </Typography>
            //   <List>
            //     {transactionHistory.map((transaction) => (
            //       <ListItem key={transaction.id}>
            //         <ListItemText
            //           primary={`${transaction.type === "BUY" ? "Bought" : "Sold"} ${transaction.quantity} shares of ${transaction.symbol} for $${transaction.price} each`}
            //         />
            //       </ListItem>
            //     ))}
            //   </List>
            // </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
