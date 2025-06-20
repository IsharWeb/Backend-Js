// src/controllers/user.controller.js
import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadFileOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccReffTonkens = async (userId) => {
  _

  try {
    const user = await User.findById(userId)

    const accessToken = user.generateAccToken()
    const refrashToken = user.generateRefToken()

    user.refrashToken = refrashToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refrashToken }

  } catch (error) {

    throw new ApiError(501, "generateAccReffTonkens error in user login controller")

  }

}

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
  // console.log("User Existed  Data = ", existingUser);

  if (existingUser) throw new ApiError(400, "User arlady existed")

  // Check img was upload or not
  const avtarLocalPath = req.files?.avatar[0]?.path;
  console.log("Avtar Img url adn all datat files = ", avtarLocalPath);

  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  console.log("Avatar Img url", coverImageLocalPath);

  let coverImage = { url: "" }; // default empty

  // Only upload if file was provided
  if (coverImageLocalPath) {
    coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
    if (!coverImage) {
      console.warn("Cover image upload failed, saving as empty string");
      coverImage = { url: "" };
    }
  }



  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log("Avatar Img url", coverImageLocalPath);
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


});


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





// Login func

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for empty fields
  if (!email) {
    throw new ApiError(400, "Email are required");
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //  Validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // generate acc ref tokens

  const { accessToken, refrashToken } = await generateAccReffTonkens(user._id)

  // logedin user

  const logedInUser = await user.findById(user._id).select("-password -refrashToken")

  // secuer options

  const options = {
    httponly: true,
    secure: true,
  }

  // response

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refrashToken", refrashToken, options)
    .json(
      new ApiResponse(
        {
          user: logedInUser, accessToken, refrashToken,
        },
        200,
        "user Loged In successfully"
      )
    )

  // errors
  // //  Remove sensitive data before responding
  // const userInfo = {
  //   _id: user._id,
  //   username: user.username,
  //   fullName: user.fullName,
  //   email: user.email,
  //   avatar: user.avatar,
  //   coverImage: user.coverImage,
  //   bio: user.bio
  // };

  // // 5. Optionally login via session (if using session)
  // req.session.user = userInfo;

  // // 6. Response
  // return res.status(200).json(new ApiResponse(userInfo, 200, "Login successful"));


});



// logoout fun

const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refrashToken: 1 // this removes the field from document
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refrashToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refrashToken || req.body.refrashToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request")
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
    }

    if (incomingRefreshToken !== user?.refrashToken) {
      throw new ApiError(401, "Refresh token is expired or used")

    }
      
    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refrashToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refrashToken: newRefreshToken },
          "Access token refreshed"
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

export { registerUser, logoutUser, loginUser };