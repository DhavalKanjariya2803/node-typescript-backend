import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHanlder";
import cors from 'cors'
const app = express();
app.use(express.json());

//  cors allow config 
app.use(cors({
  origin: 'http://localhost:3000'
}));

//  user roote
app.use("/", userRoutes);

//  404 route redirection
app.use(() => {
  throw createHttpError(404, "Route not found");
});

//  error handeler
app.use(errorHandler);

//  database connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
