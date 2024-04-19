import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function StocksList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch("/api/stocks");
      if (!response.ok) {
        throw new Error("Failed to fetch stocks");
      }
      const data = await response.json();
      const stocksWithId = data.map((stock) => ({ ...stock, id: stock._id }));
      setStocks(stocksWithId);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "stockTicker",
      headerName: "Stock Ticker",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "sharesPurchased",
      headerName: "Volume",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "initialPrice",
      headerName: "Initial Price",
      width: 150,
      headerClassName: "custom-header",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={stocks}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
      <style>
        {`
          .custom-header {
            background-color: lightgray;
          }
        `}
      </style>
    </div>
  );
}

export default StocksList;
