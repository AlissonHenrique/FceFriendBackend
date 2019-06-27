const User = require("../models/User");
class UserController {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Esse email já existe" });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }

  async index(req, res) {
    const us = await User.find();
    return res.json(us);
  }
}

module.exports = new UserController();
