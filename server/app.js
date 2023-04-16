import express from "express";
import "dotenv/config";
import postRoute from "./routes/postRoutes.js";
import authRoute from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

// initialize express
const app = express();

// global middlewares
app.use(cors());
app.use(express.json());

// middlewares
app.use("/post", postRoute);
app.use("/auth", authRoute);

// connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));

// api schema validation için Joi, file upload için multer kullanmak daha iyi. multer-s3 paketiyle de aws storage için kullanma bilirsin
