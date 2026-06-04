const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const Category = require("../models/Category");
const User = require("../models/UserSchema");
const mailSender = require("../utils/mailSender")
// const { CourseEnrollmentEmail } = require("../mail/templates/courseEntrollmentEmail");
const {default: mongoose} = require("mongoose");

// capture payment and  initiate the Rozarpay order
exports.capturePayment = async (req, res) => {
  // get courseId and Userid
  const { course_Id } = req.body;
  const userId = req.user.id;
  // validation
  // valid course Id
  if (!course_Id) {
    return res.status(400).json({
      success: false,
      message: "courseId is required ",
    });
  }

  // valid courseDetails
  let course;
  try {
    course = await Course.findById(course_Id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "could not find the course with this Id",
      });
    }
    // user already pay for the same course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "user already enrolled for this course ",
      });
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }

  // order create
  const amount = course.price;
  const currency = "INR";

  //  this is include by me 
  const receipt = `receipt_${course_Id}_${userId}_${Date.now()}`;

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: Math.random(Date.now().toString()),
    notes: {
        courseId: course_Id, 
        userId, 
    }
  };

  try{
    // init the payment
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse)
     // return response 

     return res.status(200).json({
        success:true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
     })
     
  }catch(error){
    console.log("error in creating order ", error);
    return res.status(500).json({
        success:false,
        message:"error in creating order ",
    })
  }
 

}; 

// find out checksum 



// verify signature and payment and enroll the student in the course
exports.verifySignature = async(req,res)=>{
    const webHookSecret = "12345678"

    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webHookSecret);
    // const disest = shasum.update(JSON.stringify(req.body)).digest("hex");
    const digest = shasum.digest("hex " ) ;

    if(signature === digest ){
        console.log("payment is Authorized,  by rozarpay ");
        // enroll the student in the course 
        const {courseId , userId} = req.body.payload.payment.entity.notes;
    

    try{
            // full fill the enrollment details
            // const enrolledCourse = await Course.findById(courseId);
            // enrolledCourse.studentsEnrolled.push(userId);
            // await enrolledCourse.save();    
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id : courseId },
                {$push: {studentsEnrolled: userId }},
                {new: true },
            );
            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message: "Course not found with this Id ",
                })
            }
            console.log(enrolledCourse);

            // send email to the user for enrollment

            // const userDetails = await User.findById(userId);
            // await CourseEnrollmentEmail(userDetails.email, enrolledCourse.courseName);
            // return res.status(200).json({
            //     success:true,
            //     message: "payment verified and course enrolled successfully ",
            // })

            // send email to the user for enrollment
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations on enrolling in the course!",
                `Congratulations You have successfully enrolled in the course: ${enrolledCourse.courseName}. Happy learning!`
            );
            console.log("Email sent successfully:", emailResponse);
            return res.status(200).json({
                success: true,
                message: "Payment verified and course enrolled successfully. Email sent to the user.",
            })
            
    }catch(error){
        console.log(error); 
        return res.status(500).json({
            success:false , 
            message: "internal server error ", 
        })
    }
}

    else {
        return res.status(400).json({
            success:false , 
            message: "invalid payment",
        });
    }





}

