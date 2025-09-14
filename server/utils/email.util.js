import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_FROM_EMAIL, // your Gmail address
      pass: process.env.SMTP_PASSWORD, // App password (not your Gmail password)
    },
  });

  const mailOptions = {
    from: `"LMS App" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: subject,
    html: message,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
