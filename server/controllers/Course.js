const Course = require("../models/course");
// const Category = require("../models/Category");
const User = require("../models/UserSchema");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUpload");

// crate Course handler function
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn,
       price, tag , category , status , instructor} =
      req.body;
    // get thumbnail
    const thumbnail = req.files.thumbnailImage;
    // validations
    // if (
    //   !courseName ||
    //   !courseDescription ||
    //   !whatYouWillLearn ||
    //   !price ||
    //   !tag ||
    //   !category ||
    //   !status ||
    //   !instructor
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required ",
    //   });
    // }
    // check for instructure
    const userid = req.user.id;
    const instructorDetails = await User.findById(userid);
    console.log("instructor details ", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found ",
      });
    }

    // check given tag is valid or not
    const CategoryDetails = await Category.findById(category);
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found ",
      });
    }
    // upload image to  cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );
    if (!thumbnailImage) {
  return res.status(500).json({
    success: false,
    message: "Thumbnail upload failed",
  });
}

    //  create an entry new entery

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
       category, // added
  status,   // added
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          curse: newCourse._id,
        },
      },
      { new: true },
    );

    // update the tag ka schema
    // todo : HW

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully ",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "failed to create course ",
      error: error.message,
    });
  }
};

// getAllCourse handler functions

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsenrolled: true,
      },
    )
      .populate("instructor")
      .exec();

    return res.status(200).josn({
      success: true,
      message: " data for all course fetch successfully ",
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot fetch course data ",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { course_Id } = req.body;
    let courseDetails = await Course.find(
      { _id: course_Id }
        .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
          })
              .populate("category")
              // .populate("ratingAndreviews")
              .populate({
                path: "courseContent",
                populate: {
                  path: "subSection",
                },
              })
              .exec(),
          );

    // validations
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the Course with ${course_Id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully ",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " internal server error ",
      message: error.message
    });
  }
};
