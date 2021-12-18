const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendResetPasswordEmail = async (email, name, token) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    html: `
        <h1>Hello ${name}</h1>
        <p>
            You recently requested to reset your password for your account.
            Please click the button below to reset it.
        </p>
        <a href="${process.env.FRONTEND_URL}/password-reset.html?token=${token.token}">
            Reset password
        </a>
        `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendResetPasswordEmail,
};
