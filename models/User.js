import mongoose from "mongoose";

// Create a schema for the User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  password: String,
});

// Create a model. The name of the collection becomes, models // plural of model. for ex, employee becomes employees.
// The model is used to perform the CRUD operations
const User = mongoose.model("User", userSchema);

// Exporting the model
export default User;
