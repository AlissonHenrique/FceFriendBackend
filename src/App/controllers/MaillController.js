const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
class MailController {
  async store(req, res) {
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alisson@fce.edu.br",
        pass: "alisson01"
      }
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <comercial.pos@fce.edu.br>', // sender address
      to: "alisson@fce.edu.br", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    MailController().catch(console.error);
    return res.json({ ok });
  }
}

module.exports = new MailController();
