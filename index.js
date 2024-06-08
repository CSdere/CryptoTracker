import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const headers = {
    'Accept': 'application/json',
    'X-API-Token': 'd36a80a9-4516-42b5-be6b-f6e89eec6aa3'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/`, headers);
        const result = response.data;
        res.render("index.ejs",);
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message,});
      }
});

app.post('/', async (req, res) => {
    try {
        console.log(req.body.crypto);
        const type = req.body.crypto;
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${type}`, headers);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {data: result.symbol, price: result.price_24h,});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No activities that match your criteria.",
        });
      }
});

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
});