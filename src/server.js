require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const databaseConfig = require("./config/database");

class App {
  constructor() {
    this.express = express();
    this.express.use(cors({ origin: "*" }));
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
  }
}
module.exports = new App().express;
