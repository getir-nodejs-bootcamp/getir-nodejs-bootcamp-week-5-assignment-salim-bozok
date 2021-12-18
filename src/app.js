require("dotenv").config();
const path = require("path");
require("./loaders")();
require("./models");

const express = require("express");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
