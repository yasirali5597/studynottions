const mongoose = require("mongoose");

require("dotenv").config();


exports.connectDb = () => {
    // mongoose.connect(process.env.MONGODB_URL, {
      
        console.log("ENV 👉", process.env.MONGODB_URL)

     mongoose.connect(process.env.MONGODB_URL)
    .then( () => console.log("DB connection successfully"))
    .catch( (error) => {
        console.log("BD connection given the error : ", error); 
        console.log(error);
        process.exit(1);
    })
    // )}
}

