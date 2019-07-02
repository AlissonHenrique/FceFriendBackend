require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const databaseConfig = require("./config/database");
const corsOptions = {
  origin: "https://fcefriendfront.herokuapp.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
class App {
  constructor() {
    this.express = express().use(cors());
    this.isDev = process.env.NODE_ENV !== "production";
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(databaseConfig.url, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
    this.express.use(cors(corsOptions));
  }
}
module.exports = new App().express;
