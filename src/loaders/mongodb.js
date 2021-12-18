const mongoose = require("mongoose");

module.exports = () => {
  const mongoURI = process.env.MONGODB_URI;

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occured while connecting to mongo", err);
  });
};
