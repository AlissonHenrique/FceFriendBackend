const Mail = require("../services/Mail");

class MailController {
  async store(req, res) {
    const { name, email, agencia, conta } = req.body;

    await Mail.sendMail({
      from: "FCE <no-reply@eadvoltaire.com.br>'",
      to: "alisson@fce.edu.br",
      subject: "Promoção fechou Ganhou",
      html: `Nome: ${name} <br/> Email: ${email} <br/> Agência: ${agencia} <br/> Conta: ${conta}`
    });

    return res.send();
  }
}

module.exports = new MailController();
