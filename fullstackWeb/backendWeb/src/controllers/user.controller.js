// src/controllers/user.controller.js
import AsyncHandler from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js"
const registerUser = AsyncHandler(async (req, res) => {
  // console.log("Regester form existing")
  // res.status(200).json({
  //   message: "✅ Register Form OK"
  // });

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user (hash password before saving in production)
  const newUser = new User({
    name,
    email,
    password,  // IMPORTANT: hash password before saving in real app
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });

});

export { registerUser };
