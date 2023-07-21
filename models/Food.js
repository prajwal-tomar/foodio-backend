import mongoose from "mongoose";

// Create Schema for foodItems
const foodItemSchema = new mongoose.Schema({
  //   _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  CategoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: [
    {
      half: { type: String, required: true },
      full: { type: String, required: true },
    },
  ],
  description: { type: String, required: true },
});

const foodCategorySchema = new mongoose.Schema({
  CategoryName: String,
});

// Create a model. The name of the collection becomes, models // plural of model. for ex, employee becomes employees
const FoodItem = mongoose.model("food-item", foodItemSchema);
const FoodItemCategory = mongoose.model("food_category", foodCategorySchema);

export {FoodItem, FoodItemCategory};
