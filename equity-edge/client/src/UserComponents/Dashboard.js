import React, { useEffect, useState } from "react";
import { Typography, Paper, Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Portfolio from "./Portfolio";
import StockMarket from "./StockMarket";
import CashManagement from "./CashManagement";
import TransactionHistory from "./TransactionHistory";

const Dashboard = ({ userID, userFullName, username, cashBalance }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnedStocks = async () => {
      try {
        const response = await fetch(`/api/user/${userID}/stocks`);
        if (!response.ok) {
          throw new Error("Failed to fetch owned stocks");
        }
        const data = await response.json();

        const stockIds = data.userStocks.map((purchase) => purchase.stock);

        // Fetch stock details using the extracted stock IDs
        const stockDetailsResponse = await fetch(
          `/api/stocks/${stockIds.join(",")}`
        );
        if (!stockDetailsResponse.ok) {
          throw new Error("Failed to fetch stock details");
        }
        const stockDetails = await stockDetailsResponse.json();

        // Format the fetched stock details to match the desired format
        const formattedStocks = data.userStocks.reduce(
          (accumulator, purchase) => {
            const stockDetail = stockDetails.find(
              (detail) => detail._id === purchase.stock
            );
            const existingStock = accumulator.find(
              (stock) => stock.ticker === stockDetail.stockTicker
            );
            if (existingStock) {
              existingStock.quantity += purchase.sharesPurchased;
            } else {
              accumulator.push({
                ticker: stockDetail.stockTicker,
                name: stockDetail.companyName,
                price: stockDetail.initialPrice,
                quantity: purchase.sharesPurchased,
              });
            }
            return accumulator;
          },
          []
        );

        // Update portfolio state with the formatted stocks
        setPortfolio(formattedStocks);
      } catch (error) {
        console.error("Error fetching owned stocks:", error);
      }
    };

    fetchOwnedStocks();
  }, [userID, selectedTab]);

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
          {selectedTab === 0 && (
            <Portfolio ownedStocks={portfolio} username={username} />
          )}
          {selectedTab === 1 && (
            <StockMarket
              ownedStocks={portfolio}
              userID={userID}
              username={String(username)}
            />
          )}{" "}
          {/* Render StockMarket component when "Trade Stocks" tab is selected */}
          {selectedTab === 2 && (
            <CashManagement cashBalance={cashBalance} username={username} />
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
