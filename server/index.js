  const express = require("express");
  // const dotenv = require("dotenv");
  const app = express();
    require("dotenv").config(); 
  const userRoutes = require("./routes/User");
  const profileRoutes = require("./routes/Profile");
  const paymentRoutes = require("./routes/Payment");
  const courseroutes = require("./routes/Course");

  const database = require("./config/database");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const { cloudinaryConnect } = require("./config/cloudinary");
  const fileUplaod = require("express-fileupload");

  // data base connect
  database.connectDb();
  // middlewares
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  console.log("this is mongo db url " ,  process.env.MONGODB_URL)

  // file upload
  app.use(
    fileUplaod({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }),
  );

  cloudinaryConnect();

  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/profile", profileRoutes);
  app.use("/api/v1/payment", paymentRoutes);
  app.use("/api/v1/course", courseroutes);

  app.get("/", (req, res) => {
    res.send("welcome to the server");
  });


  app.listen(process.env.PORT || 3000 , () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
