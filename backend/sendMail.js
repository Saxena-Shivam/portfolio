const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure transporter (example: Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shivamsaxena562006@gmail.com",
      pass: "wjpefrjpladoxfrm", // Use App Password, not your Gmail password
    },
  });

  const mailOptions = {
    from: email,
    to: "shivamsaxena562006@gmail.com",
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email.", error });
  }
});

module.exports = router;
