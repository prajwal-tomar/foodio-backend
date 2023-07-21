// This is to write all the routes related to food items and categories
import express from "express";
const router = express.Router();
import { FoodItem, FoodItemCategory } from "../models/Food.js";

async function createFoodItem(CategoryName, name, img, options, description) {
  try {
    const newFoodItem = await FoodItem.create({
      CategoryName,
      name,
      img,
      options,
      description,
    });
    console.log("Food Item created successfully:", newFoodItem);
  } catch (error) {
    console.error("Error creating food item:", error);
  }
}

// Right now hardcoded the data. The next approach would be the send the data via a form maybe?
router.get("/createFood", async (req, res) => {
  const dummyFoodItem = {
    // _id: new mongoose.Types.ObjectId(),
    CategoryName: "FitFood",
    name: "Proats (Protein Oats)",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    options: [{ half: "130", full: "220" }],
    description:
      "Protein oats made specially for gym goers. It has 45gms of protein.",
  };

  try {
    await createFoodItem(
      // dummyFoodItem._id,
      dummyFoodItem.CategoryName,
      dummyFoodItem.name,
      dummyFoodItem.img,
      dummyFoodItem.options,
      dummyFoodItem.description
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({ message: "Error creating food item" });
  }
});

router.get("/fooditems/all", async (req, res) => {
  try {
    const allFoodItems = await FoodItem.find();
    const allFoodCategories = await FoodItemCategory.find();
    console.log(allFoodCategories);
    console.log(allFoodItems);
    return res.status(200).json({
      allFoodItems: allFoodItems,
      allFoodCategories: allFoodCategories,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
});

export default router;
