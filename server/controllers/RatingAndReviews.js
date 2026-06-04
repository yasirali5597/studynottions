const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/course");
const {mongo , default: mongoose} = require("mongoose");

// creating a reviews
exports.createRating = async (req, res) => {
  try{
    // get user id
  const userId = req.user.id;
  // fetch data from req. body
  const { rating, review, courseId } = req.body;
  // check if user  is enrolled or not
  const courseDetails = await Course.findOne(
    {
    _id: courseId,
    // studentsEnrolled: {$in: [userId]}}
    studentsEnrolled: { $elemMatch: { $eq: userId } },
  });

  if (!courseDetails) {
    return res.status(403).json({
      success: false,
      message:
        "student is not enrolled for this course, so user can not review this course ",
    });
  }
  //check if user already review  the course
  const alreadyReview = await RatingAndReviews.findOne({
    user: userId,
    course: courseId,
  });

  if (alreadyReview) {
    return res.status(403).json({
      success: false,
      message: "student has already reviewed this course ",
    });
  }
  // create a review and rating
  const ratingReview = await RatingAndReviews.create({
    rating,
    review,
    user: userId,
    course: courseId,
  });

  // push the review id into course collection
   const updatedCourseDetails =await Course.findByIdAndUpdate({_id:courseId},
     {
    $push: {
         RatingAndReview: ratingReview._id, 

    },
  }, {new: true});
  console.log(updatedCourseDetails)

  // return response 
    return res.status(200).json({
        success: true,
        message: "Rating and review created successfully ",
        data: ratingReview,
        ratingReview,
    })
  }catch(error) {
    console.log("error in creating review and rating ", error);
    return res.status(500).json({
        success:false,
        message:"error in creating review and rating ",
        message: error.message,
    })
  }
};

// get average rating and all reviews for a course 

exports.getAverageRating = async (req,res) =>{
    try{
        // get user id 
        const courseld = req.body.courseId; 
        // calculate avg rating 
        const result = await RatingAndReviews.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseld)
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: {$avg: "$rating"}, 
                    }
                }
        ]);
        // return respones 
        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,

            })
        }
        // if not rating reviews and rating 
        return res.status(200).json({
            success:true,
            averageRating: 0,
        })

    
    }catch(error){
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"error in fetching average rating ",
        })
    }


}


// get alll rating and reviews
exports.getAllRating = async (req,res) =>{
    try{
         const allRatingAndReviews = await RatingAndReviews.find({}) 
         .sort({rating:"desc"})
            
            .populate("user")                               
                .populate({
                    path:"user" , 
                    select: "courseName" , 
                })
                .populate({
                    path: "course" , 
                    select: "courseName ",
                })
                .exec()
            // )
            
            return res.status(200).json({
                success:true, 
                message: "all reviews and rating fetched successfully " ,
                data: allRatingAndReviews,
            })
     }catch(error){
        return res.status(500).json({   
            success:false , 
            message: "error in fetching all reviews and rating ",
            message : error.message,
        })
     }

}
