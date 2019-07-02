require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const databaseConfig = require("./config/database");
var app = express();
app.use(cors());
class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.database();
    this.express.use(cors());
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
