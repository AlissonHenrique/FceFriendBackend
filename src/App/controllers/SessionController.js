const User = require("../models/User");

class Sessioncontroller {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não foi encontrado" });
    }
    if (!(await user.compareHash(password))) {
      return res.status(404).json({ error: "Senha inviálida" });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

module.exports = new Sessioncontroller();
