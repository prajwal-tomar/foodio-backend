import mongoose from "mongoose";

const databaseName = "foodio"; // Replace with your actual database name
const connectionString = `mongodb://127.0.0.1:27017/${databaseName}`;

// Connect to mongoDB
const connectToMongo = () => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("An error was encountered: " + err);
    });
};

export default connectToMongo;
