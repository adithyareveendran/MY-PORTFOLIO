const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Contact form route
app.post("/send", upload.none(), async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adithyareveendran@gmail.com",   // your Gmail
      pass: "YOUR_APP_PASSWORD"              // Gmail App Password
    }
  });

  let mailOptions = {
    from: email,
    to: "adithyareveendran@gmail.com",
    subject: subject || "New Contact Form Message",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "❌ Something went wrong. Try again!" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
