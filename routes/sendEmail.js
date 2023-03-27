const { emailService, emailUser, emailPassword } = process.env;

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // service: emailService,
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  });

module.exports = {
    transporter
}
