import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function StocksList() {
  // Assuming stocks data is fetched from an API or passed as props
  const stocks = [
    {
      id: 1,
      companyName: "Company A",
      stockTicker: "AAA",
      volume: 1000,
      initialPrice: 50,
    },
    {
      id: 2,
      companyName: "Company B",
      stockTicker: "BBB",
      volume: 2000,
      initialPrice: 70,
    },
    {
      id: 3,
      companyName: "Company C",
      stockTicker: "CCC",
      volume: 1500,
      initialPrice: 60,
    },
    // Add more stock data as needed
  ];

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
      field: "volume",
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
