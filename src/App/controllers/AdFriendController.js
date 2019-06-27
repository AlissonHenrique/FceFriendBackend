const Ad = require("../models/AdFriend");
const Mail = require("../services/Mail");
const cpfvalue = require("@fnando/cpf/dist/node");

class AdFriendController {
  async index(req, res) {
    const filters = {};
    if (req.query.id) {
      filters.user_id = req.query.id;
    } else {
      console.log("nao existe");
    }

    const ad = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      sort: "-created_at"
    });

    return res.json(ad);
  }
  async show(req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }
  async store(req, res) {
    const { cpf } = req.body;
    if (cpfvalue.isValid(cpf) !== true) {
      //   return res.status(200).json({ success: "é valido" });
      // } else {
      return res.status(400).json({ error: "Este CPF não é válido" });
    }

    if (await Ad.findOne({ cpf })) {
      return res.status(400).json({ error: "Esse CPF já foi cadastrado" });
    }

    const ad = await Ad.create({
      ...req.body,
      user_id: req.userId
    });

    return res.json(ad);
  }

  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(ad);
  }
  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);
    return res.send(Ad);
  }
}

module.exports = new AdFriendController();
