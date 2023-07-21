// This is for writing CRUD operations related to the User
// We use router. It has the same functionality as router. It's just a good practice to use it.
import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const jwtSecret = "helloworldhowareyou$"

async function createUser(name, email, location, password) {
  try {
    const newUser = await User.create({ name, email, location, password });
    console.log("User created successfully:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

router.get("/user", (req, res) => {
  res.send("WELCOME USER. YOU'RE THE BEST FOR SIGNING UP FOR OUR PLATFORM!!");
});

router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    // Run validation checks on req.body
    const errors = validationResult(req);

    // Check if there are any validation errors
    if (!errors.isEmpty()) {
      // If there are errors, return the error response
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no validation errors, proceed with creating the user
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    const { name, email, location } = req.body;
    createUser(name, email, location, securePassword);

    return res.status(200).json({ message: "User signed up successfully!" });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      // User with the provided email not found
      console.log("User's email not found. Please register.");
      return res
        .status(400)
        .json({ message: "User not found. Please register." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    console.log(passwordCompare)
    // Check if the provided password matches the user's password in the database
    if (!passwordCompare) {
      // Password does not match
      console.log("Password does not match");
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    // Password matches, create a cookie with the user's ID (you can customize the cookie name and options)
    // res.cookie("userId", user._id, { httpOnly: true });

    const data = {
      user: {
        id: user._id
      }
    }

    // Generating the authorization token
    const authToken = jwt.sign(data, jwtSecret);
    console.log(authToken)

    // Send a success response
    console.log("Logged in successfully.");
    return res.status(200).json({ message: "Logged in successfully.", authToken : authToken});
  } catch (error) {
    // Error occurred while finding the user or comparing the password
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.get("/users/all", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

router.get("/createUser", async (req, res) => {
  await createUser("Prajwal Tomar", "prajwalstomar@gmail.com", "password");
  res.redirect("/");
});

// Get a specific user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
