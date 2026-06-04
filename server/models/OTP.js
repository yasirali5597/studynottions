const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3*60*60,
    // expires: 5 * 60,
  },
});

// a function -> to send emails
async function sendVerificationEmail(email, otp) {
  try {
         const htmlContent = emailTemplate(otp);

    console.log("HTML 👉", htmlContent);

    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotation ",
    //   otp,
    // `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 5 minutes.</p>`
    emailTemplate(otp)
    );

    console.log("email sent successfully", mailResponse);
    return mailResponse;
  } catch (error) {
    console.log("error occured while sending the emails", error);
    throw error;
  }
}

// OTPSchema.pre("save", async function (next) {
//   await sendVerificationEmail(this.email, this.otp);
//   next();
// });

OTPSchema.pre("save", async function () {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	// next();
});



const OTP  = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
