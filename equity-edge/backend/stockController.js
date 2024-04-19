const { Stock } = require('./eedb.js');

async function addStock(req, res) {
   try {
       console.log("Request Body:", req.body);
       const newStock = new Stock(req.body);
       const savedStock = await newStock.save();

       res.status(201).json(savedStock);
   } catch (error) {
       console.error("Error adding stock:", error);
       res.status(500).json({ error: "Internal server error" });
   }
}

async function getAllStocks(req, res) {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        console.error("Error fetching stocks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getStockByTicker(req, res) {
    try {
        const stockTicker = req.params.stockTicker;
        const stock = await Stock.findOne({ stockTicker: stockTicker });
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        res.json(stock);
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { addStock, getAllStocks, getStockByTicker };
