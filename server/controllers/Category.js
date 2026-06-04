const Category = require("../models/Category");

// create category ka handler functions
exports.createCategory = async (req, res) => {
  try {
    // fetch Data
    const { name, description } = req.body;
    if(!name || !description) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }
    // create entry in db
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category created successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all  categories handler function
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { name: true, description });

    return res.status(200).json({
      success: true,
      message: "all categories returned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
exports.categoryPageDetails = async (req, res) => {
  try {
    // GET  courses gategory id
    const { category_Id } = req.body;

    // get course for specified category id
    const SelectedcategoryDetails = await Category.findById(category_Id)
      .populate("courses")
      .exec();
    // validations
    if (!SelectedcategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category or courses  not found",
      });
    }
    //get courses for deffrent category id
    const diffrentCategory = await Category.find({
      _id: { $ne: category_Id },
    })
      .populate("courses")
      .exec();

    

    // get top 10  selling courses for the category   this is a home works 
    
    return res.status(200).json({
      success: true,
      message: "category details fetched successfully ",
      data: {
        SelectedcategoryDetails,
        diffrentCategory,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
