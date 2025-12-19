const nodemailer = require("nodemailer");
const sendOtptoEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user_email,
        pass: process.env.user_pass,
      },
    });
    const mailOptions = {
      from: `"CityCare" <${process.env.user_email}>`,
      to,
      subject: "Your CityCare Verification Code",
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>CityCare OTP Verification</h2>
          <p>Your one-time password is:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background: #f0f0f0; padding: 10px; border-radius: 5px;">${otp}</p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error in sending an email", err);
  }
};
module.exports = sendOtptoEmail;
