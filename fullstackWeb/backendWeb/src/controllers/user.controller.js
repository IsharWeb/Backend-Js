// src/controllers/user.controller.js
import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadFileOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = AsyncHandler(async (req, res) => {
  // console.log("Regester form existing")
  // res.status(200).json({
  //   message: "✅ Register Form OK"
  // });

  // Data on body
  const { username, fullName, bio, email, password } = req.body;
  console.log("Register User Data", bio, username, fullName, email, password);

  // Check empty feild
  if ([username, fullName, bio, email, password].some(
    (data) => data?.trim() === ""
  )) {
    throw new ApiError(100, "All fields is requird")
  }

  // Check esisting user
  const existingUser = await User.findOne(
    {
      $or: [{ username }, { email }]
    }
  )
  console.log("User Existed  Data = ", existingUser);

  if (existingUser) throw new ApiError(400, "User arlady existed")

  // Check img was upload or not
  const avtarLocalPath = req.files?.avatar[0]?.path;
  console.log("Avtar Img url adn all datat files = ", files, avtarLocalPath);
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log("Avatar Img url", coverImageLocalPath);
  // if (coverImageLocalPath.length === "")              
  //  chatgpt pls write code here if cover img is undefind or user nor upload to not show error and add in userstore coverimg emty string


  if (!avtarLocalPath) throw new ApiError(400, "Avatar Img is requird")

  const avatar = await uploadFileOnCloudinary(avtarLocalPath)
  if (!avatar) throw new ApiError(400, "Avatar Img is requird")

  //  Create user object 
  const userStore = await User.create(
    {
      username: username.toLowerCase(),
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      fullName,
      email,
      bio,
      password,
    }
  )
  console.log("User data or UserStore = ", userStore);


  // find user and reove -password -refrashToken
  const findUser = await User.findById(userStore._id).select(
    "-password -refrashToken"
  )
  if (!findUser) throw new ApiError(500, "Server site error try again")

  // response

  const response = await res.status(201).json(
    new ApiResponse(findUser, 200, "User Register succesfully")

    // my err
    // new ApiResponse(userStore, 200, "User Register succesfully" )
    // throw new ApiResponse(findUser, 200, "User Register succesfully" )

  )

  return response

  //   if (!name || !email || !password) {
  //     return res.status(400).json({ message: "All fields are required" });
  //   }

  //   // Check if user already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  //   // Create new user (hash password before saving in production)
  //   const newUser = new User({
  //     name,
  //     email,
  //     password,  // IMPORTANT: hash password before saving in real app
  //   });

  //   await newUser.save();

  //   res.status(201).json({ message: "User registered successfully" });

});

export { registerUser };
