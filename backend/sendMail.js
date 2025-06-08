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

  // Email to portfolio owner
  const mailOptions = {
    from: email,
    to: "shivamsaxena562006@gmail.com",
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };
  console.log("Mail options:", email);
  // Confirmation email to sender
  const confirmationMailOptions = {
    from: "shivamsaxena562006@gmail.com",
    to: email,
    subject: "Thank you for contacting us!",
    text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you soon.\n\nBest regards,\nShivam Saxena`,
  };

  try {
    const ownerResult = await transporter.sendMail(mailOptions);
    console.log("Owner mail sent:", ownerResult);

    const confirmationResult = await transporter.sendMail(
      confirmationMailOptions
    );
    console.log("Confirmation mail sent:", confirmationResult);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email.", error });
  }
});

module.exports = router;
