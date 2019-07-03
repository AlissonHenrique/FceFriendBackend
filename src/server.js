require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const databaseConfig = require("./config/database");

var whitelist = ["https://www.fechouganhou.com.br"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

class App {
  constructor() {
    this.express = express();
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
