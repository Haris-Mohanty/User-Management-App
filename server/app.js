import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./database/db.js";

//****** DOTENV CONFIGURATION *****/
dotenv.config();

//***** DATABASE CONFIG ******/
connectDB();

//********* REST OBJECT *****/
const app = express();

//********* MIDDLEWARE *********/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//******** MIDDLEWARE ROUTES ********/

//******** PORT *******/
const port = process.env.PORT;

//******** LISTEN **********/
app.listen(port, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} mode on port ${port}`
      .bgBrightBlue.white
  );
});
