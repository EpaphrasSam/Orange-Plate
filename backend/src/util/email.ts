import nodemailer from "nodemailer";
import CustomError from "./error";

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  content: string
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: content,
  };

  try {
    // console.log(mailOptions.html);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err: any) {
    console.error(err);
    throw new CustomError(err.message, 500);
  }
}
