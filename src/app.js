require("dotenv").config();
require("./loaders")();
require("./models");

const express = require("express");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Product API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
