const Profile = require("../models/Profile");
const User = require("../models/UserSchema");



exports.updateProfile = async (req, res) => {
  try {
    // get data (❌ removed userDetails)
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body || {};

    const id = req.user.id;

    // validation
    // if (!contactNumber || !gender) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }
if (!contactNumber) {
  return res.status(400).json({ message: "Contact number is required" });
}

if (!gender) {
  return res.status(400).json({ message: "Gender is required" });
}

    // ✅ fetch userDetails from DB
    const userDetails = await User.findById(id);

    // if (!userDetails || !userDetails.additionalDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Profile not found",
    //   });
    // }

    const profilesId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profilesId);

    // update
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// explore how can be schedule this deletetion opearations
// delete account
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.body;

    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found ",
      });
    }
    // profile delete
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    // todo hw unenroll user  from all enroll course
    // Account deletes
    await User.findByIdAndDelete({ _id: id });

    // return response
    return res.status(200).json({
      success: true,
      message: "user deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cannot be deleted successfully ",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
        console.log(userDetails);


    return res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      data:userDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Data fetched successfully",
      message: error.message,
    });
  }
};
