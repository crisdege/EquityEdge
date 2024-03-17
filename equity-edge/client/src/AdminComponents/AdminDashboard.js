import React from "react";
import { AppBar, Tabs, Tab, Typography, Paper, Box } from "@mui/material";
import Stocks from "./Stocks";
import Schedule from "./Schedule";
import StocksList from "./StocksList"; // Import StocksList component

function AdminDashboard({ userId, userFullName }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
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
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Stocks List" />
            <Tab label="Add Stocks" />
            <Tab label="Trading Schedule" />
          </Tabs>
        </Box>
        <div style={{ padding: "16px" }}>
          {tab === 0 && <StocksList />}
          {tab === 1 && <Stocks />}
          {tab === 2 && <Schedule />}
        </div>
      </Paper>
    </div>
  );
}

export default AdminDashboard;
