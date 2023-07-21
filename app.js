import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongo from "./database/db.js";
import userRoutes from "./routes/UserRoutes.js";
import foodRoutes from "./routes/FoodRoutes.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Connect to MongoDB
connectToMongo();

app.get("/", (req, res) => {
  res.send("WELCOME TO FOODIO. THE BEST FOOD ORDERING APP IN THE UNIVERSE!!");
});

// Use the Routes
app.use("/", foodRoutes);
app.use("/", userRoutes);

app.listen(4000, () => {
  console.log("Server has started baby");
});
