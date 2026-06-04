const User = require("../models/UserSchema");
// const mailSender = require("../utils/mailSender");
const { mailSender } = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    // 1. get email
    const email = req.body.email;

    // 2. check user
    const user = await User.findOne({ email  : email  });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. generate token
    // const token = crypto.randomUUID(20).toString("hex");
    const token = crypto.randomBytes(20).toString("hex");

    // 4. update user
    const updateDetails = await User.findOneAndUpdate(
      { email : email  },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 min
      },
      { new: true }
    );

    // 5. create URL
    const url = `http://localhost:3000/update-password/${token}`;

    // 6. send mail
    await mailSender(
      email,
      "Password Reset Link",
      `Click here to reset password: ${url}.  Please click this url to reset your password.`
    );

    // 7. return response
    return res.status(200).json({
      success: true,
      message: "Reset link sent to your  email",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",

    });
  }
};

exports.resetPassword = async (req,res)=>{
  try{
      //fetch data 
    // validation 
    // get userdetails from db using token 
    // if no entry - invalid token 
    // token time check 
    // hash pwd 
    // password update 
    // return response 
    const {password , confirmpassword, token } = req.body;

    if(password !== confirmpassword ) {
        return res.json({
            succes: false , 
            message: "token is invalide"
        })
    }
    // get userdetails from db using token 
    const userDetails = await User.findOne({token:token})
    // if no entry - invalid token 
    if(!userDetails) {
        return res.json ({
            success: false , 
            message: 'token is invalid'
        })
    }

    //  token time check 
    if(userDetails.resetPasswordExpires< Date.now() )  {
        return res.json({
            success:false, 
            message:"token is expires  , please regenerate your token "
        });
    }
    // if(!(userDetails.resetPasswordExpires > Date.now())) {
		// 	return res.status(403).json({
		// 		success: false,
		// 		message: `Token is Expired, Please Regenerate Your Token`,
		// 	});
		// }

    const hashedPassword = await bcrypt.hash(password , 10);

    // password update 
    await User.findOneAndUpdate(
        {token: token },
        {password: hashedPassword},
        {new: true}
    )

    /// return response 
    return res.status(200).json({
        success:true,
        message: 'password reset successfully'
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message: 'something went wronge while sending reset pew mail'
    })
  }




}





// // reset passwords  token
// exports.resetPasswordToken = async (req, res) => {
//   try {
//     // get email from req. body
//     // check user for this email , email validation
//     // generate token
//     // update user by adding token and expirations time
//     // create mail
//     // send mail containing the url
//     // return response
//     const email = req.body.email;
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.json({ success: false });
//     }
//     // const token = crypto.randomUUIOD();
//     const token = crypto.randomUUID(); // not randomUUIOD ❌
//     // update user by adding token and expirations
//     const updateDetail = await User.findOneAndUpdate(
//       { email: email },
//       {
//         token: token,
//         // resetPasswordToken: token
//         // resetPasswordToken: Date.now() + 5 * 60 * 1000,
//         resetPasswordExpires: Date.now() + 5 * 60 * 1000,
//       },
//       { new: true },
//     );
//     const url = `http://localhost:3000/update-password/${token}`;
//     await mailSender(
//       email,
//       "password Reset Link",
//       `password reset  Link : ${url}`,
//     );

//     // return response
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "something went wrong while reset pwd ",
//     });
//   }
// };
// import crypto from "crypto";
