// import React, { useState } from "react";
// import { Typography, TextField, Button, Grid } from "@mui/material";

// function Stocks() {
//   const [companyName, setCompanyName] = useState("");
//   const [stockTicker, setStockTicker] = useState("");
//   const [sharesPurchased, setSharesPurchased] = useState("");
//   const [initialPrice, setInitialPrice] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission, e.g., sending data to backend
//     console.log({
//       companyName,
//       stockTicker,
//       sharesPurchased,
//       initialPrice,
//     });
//     // Reset form fields after submission
//     setCompanyName("");
//     setStockTicker("");
//     setSharesPurchased("");
//     setInitialPrice("");
//   };

//   return (
//     <div>
//       <Typography variant="h6">Add Stocks</Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Company Name"
//               variant="outlined"
//               fullWidth
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Stock Ticker"
//               variant="outlined"
//               fullWidth
//               value={stockTicker}
//               onChange={(e) => setStockTicker(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Volume"
//               variant="outlined"
//               fullWidth
//               type="number"
//               value={sharesPurchased}
//               onChange={(e) => setSharesPurchased(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Initial Price"
//               variant="outlined"
//               fullWidth
//               type="number"
//               value={initialPrice}
//               onChange={(e) => setInitialPrice(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Add Stock
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// }

// export default Stocks;
import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

function Stocks() {
  const [companyName, setCompanyName] = useState("");
  const [stockTicker, setStockTicker] = useState("");
  const [sharesPurchased, setSharesPurchased] = useState("");
  const [initialPrice, setInitialPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          stockTicker,
          sharesPurchased: parseInt(sharesPurchased), // Convert to integer
          initialPrice: parseFloat(initialPrice), // Convert to float
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add stock");
      }
      // Reset form fields after successful submission
      setCompanyName("");
      setStockTicker("");
      setSharesPurchased("");
      setInitialPrice("");
      console.log("Stock added successfully!");
    } catch (error) {
      console.error("Error adding stock:", error);
    }
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
              value={sharesPurchased}
              onChange={(e) => setSharesPurchased(e.target.value)}
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
