import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import signupModel from "./App/Model/signupModel.js";
import cors from "cors";
import rountingPath from "./App/routes/signupRoutes.js";

dotenv.config();
let app = express();
app.use(cors());
app.use(express.json());

app.use("/web", rountingPath)


mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database Successfully Connected");
        app.listen(process.env.PORT || 8000, () => {
            console.log("Your Server is running");
        })
    })
    .catch((err) => {
        console.log("❌ Database connection error:", err.message)
    })