import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
console.log(hashedToken,"========hashed============",email, emailType, userId);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.nodeMailer_user,
        pass: process.env.nodeMailer_Password,
      },
    });

    const mailOptions = {
      from: "nil@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<h1>Hi ${email}</h1>
        <p>Please click 
        <a href="${
          process.env.domain
        }/verifyemail?token=${hashedToken}">here</a> to
        ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
        </p>`,
    };

    const mailResponse=await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
