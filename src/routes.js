const express = require("express");
const routes = express.Router();
const UserController = require("./App/controllers/UserController");
const SessionController = require("./App/controllers/SessionController");
const AdFriendController = require("./App/controllers/AdFriendController");
const authMiddleware = require("./App/middlewares/auth");
const MaillController = require("./App/controllers/MaillController");
const corsMiddleware = require("./App/middlewares/cors");

routes.post("/users", UserController.store);
routes.post("/session", corsMiddleware, SessionController.store);

routes.post("/mail", MaillController.store);

routes.get("/teste", (req, res) => res.send("ok"));

//rotas autenticadas
routes.use(authMiddleware);
routes.get("/users", UserController.index);
///rotas register
routes.get("/ads", AdFriendController.index);
routes.get("/ads/:id", AdFriendController.show);
routes.post("/ads", AdFriendController.store);
routes.put("/ads/:id", AdFriendController.update);
routes.delete("/ads/:id", AdFriendController.destroy);

module.exports = routes;
