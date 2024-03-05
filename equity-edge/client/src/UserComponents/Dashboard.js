// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Paper,
//   Tabs,
//   Tab,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import logo from "../Images/Logo.png";

// const Dashboard = ({ userId, userFullName }) => {
//   const [portfolio, setPortfolio] = useState([]);
//   const [cashBalance, setCashBalance] = useState(10000); // Initial cash balance
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const [selectedTab, setSelectedTab] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulated data for stocks
//     const fakeStocks = [
//       { symbol: "AAPL", quantity: 10 },
//       { symbol: "GOOGL", quantity: 5 },
//       { symbol: "MSFT", quantity: 8 },
//     ];

//     // Simulated data for transaction history
//     const fakeTransactions = [
//       { id: 1, type: "BUY", symbol: "AAPL", quantity: 5, price: 150 },
//       { id: 2, type: "SELL", symbol: "GOOGL", quantity: 2, price: 2000 },
//       { id: 3, type: "BUY", symbol: "MSFT", quantity: 3, price: 180 },
//     ];

//     // Set fake data to state
//     setPortfolio(fakeStocks);
//     setTransactionHistory(fakeTransactions);
//   }, [userId]);

//   const handleChangeTab = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleLogout = () => {
//     // Implement logout logic here (e.g., clear user session, etc.)
//     // After logout, navigate to the authentication page
//     navigate("/");
//   };

//   console.log(selectedTab);
//   return (
//     <div>
//       <Paper elevation={3} style={{ marginBottom: "16px" }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <Typography variant="h4">Welcome {userFullName}</Typography>
//           <Tabs value={selectedTab} onChange={handleChangeTab} centered>
//             <Tab label="Portfolio" />
//             <Tab label="Trade Stocks" />
//             <Tab label="Cash Balance" />
//             <Tab label="Transaction History" />
//           </Tabs>
//         </Box>
//         <div style={{ padding: "16px" }}>
//           {selectedTab === 0 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Portfolio
//               </Typography>
//               <List>
//                 {portfolio.map((stock) => (
//                   <ListItem key={stock.symbol}>
//                     <ListItemText
//                       primary={`${stock.symbol} - ${stock.quantity} shares`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//           )}
//           {selectedTab === 1 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Cash Balance
//               </Typography>
//               <Typography>${cashBalance}</Typography>
//             </div>
//           )}
//           {selectedTab === 2 && (
//             <div>
//               <Typography variant="h6" gutterBottom>
//                 Transaction History
//               </Typography>
//               <List>
//                 {transactionHistory.map((transaction) => (
//                   <ListItem key={transaction.id}>
//                     <ListItemText
//                       primary={`${transaction.type === "BUY" ? "Bought" : "Sold"} ${transaction.quantity} shares of ${transaction.symbol} for $${transaction.price} each`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//           )}
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default Dashboard;
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

const Dashboard = ({ userId, userFullName }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [cashBalance, setCashBalance] = useState(10000); // Initial cash balance
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated data for stocks
    const fakeStocks = [
      { symbol: "AAPL", quantity: 10 },
      { symbol: "GOOGL", quantity: 5 },
      { symbol: "MSFT", quantity: 8 },
    ];

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
            <Tab label="Trade Stocks" />
            <Tab label="Cash Balance" />
            <Tab label="Transaction History" />
          </Tabs>
        </Box>
        <div style={{ padding: "16px" }}>
          {selectedTab === 0 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Portfolio
              </Typography>
              <List>
                {portfolio.map((stock) => (
                  <ListItem key={stock.symbol}>
                    <ListItemText
                      primary={`${stock.symbol} - ${stock.quantity} shares`}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
          {selectedTab === 1 && <StockMarket />}{" "}
          {/* Render StockMarket component when "Trade Stocks" tab is selected */}
          {selectedTab === 2 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Cash Balance
              </Typography>
              <Typography>${cashBalance}</Typography>
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <Typography variant="h6" gutterBottom>
                Transaction History
              </Typography>
              <List>
                {transactionHistory.map((transaction) => (
                  <ListItem key={transaction.id}>
                    <ListItemText
                      primary={`${transaction.type === "BUY" ? "Bought" : "Sold"} ${transaction.quantity} shares of ${transaction.symbol} for $${transaction.price} each`}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
