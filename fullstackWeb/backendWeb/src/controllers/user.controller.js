// src/controllers/user.controller.js
import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadFileOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { jwt } from "jsonwebtoken"
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";

const generateAccReffTonkens = async (userId) => {

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

  const avatarLocalPath = Array.isArray(req.files?.avatar) ? req.files.avatar[0]?.path : "";
  const coverImageLocalPath = Array.isArray(req.files?.coverImage) ? req.files.coverImage[0]?.path : "";

  // Avatar is required
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }
  // Upload avatar
  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(400, "Failed to upload avatar image");
  }

  // Upload cover image (optional)
  let coverImage = { url: "" };
  if (coverImageLocalPath) {
    coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
    if (!coverImage?.url) {
      console.warn("⚠️ Cover image upload failed. Saving as empty string.");
      coverImage.url = "";
    }
  }

  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log("Avatar Img url", coverImageLocalPath);
  // if (coverImageLocalPath.length === "")              
  //  chatgpt pls write code here if cover img is undefind or user nor upload to not show error and add in userstore coverimg emty string


  //  Create user object 
  const userStore = await User.create(
    {
      username: username.toLowerCase(),
      avatar: avatar.url,
      coverImage: coverImage.url,
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
    new ApiResponse(findUser, 200, "User registered successfully")
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

  const logedInUser = await User.findById(user._id).select("-password -refrashToken");


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

// endpoing AccandRrefTokens
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

// change password
const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    // Input validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required." });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the old password matches
    const isMatch = await user.isPasswordCorrect(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect." });
    }

    // Set new password
    user.password = newPassword; // will be hashed in pre-save hook
    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};


// update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      email,
      username,
      fullName,
      channelName,
      bio,
      avatar,
      coverImage,
      socialLinks
    } = req.body;

    const user = await User.findById(userId);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if email is changing and already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use." });
      }
      user.email = email;
    }

    // Check if username is changing and already taken
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already taken." });
      }
      user.username = username;
    }

    // Update other fields
    if (fullName) user.fullName = fullName;
    if (channelName) user.channelName = channelName;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (coverImage) user.coverImage = coverImage;

    if (socialLinks) {
      user.socialLinks = {
        ...user.socialLinks,
        ...socialLinks, // partial update (e.g., only facebook)
      };
    }

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// user Channel Profile
// const getUserChannelProfile = async (req, res) => {
//   try {
//     const { username } = req.params;

//     if (!username) {
//       return res.status(400).json({ message: "Username is required." });
//     }

//     const user = await User.findOne({ username, isDeleted: false })
//       .select(
//         "username fullName channelName bio avatar coverImage socialLinks subscribers createdAt"
//       )
//       .populate("subscribers", "_id username");

//     if (!user) {
//       return res.status(404).json({ message: "Channel not found." });
//     }

//     const channelProfile = {
//       username: user.username,
//       fullName: user.fullName,
//       channelName: user.channelName || user.username,
//       bio: user.bio || "",
//       avatar: user.avatar || "",
//       coverImage: user.coverImage || "",
//       socialLinks: user.socialLinks || {},
//       subscriberCount: user.subscribers.length,
//       joinedAt: user.createdAt,
//     };

//     return res.status(200).json({
//       message: "Channel profile fetched successfully.",
//       profile: channelProfile,
//     });
//   } catch (error) {
//     console.error("Error fetching channel profile:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

 const getUserChannelProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const viewerId = req.user?._id; // Optional: logged-in viewer

    const pipeline = [
      {
        $match: {
          username: username,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "subscribers",
          localField: "_id",
          foreignField: "channel",
          as: "subscriberDocs",
        },
      },
      {
        $addFields: {
          subscriberCount: { $size: "$subscriberDocs" },
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "owner",
          as: "videos",
        },
      },
      {
        $addFields: {
          videoCount: { $size: "$videos" },
          isSubscribed: viewerId
            ? {
                $in: [new mongoose.Types.ObjectId(viewerId), "$subscribers"],
              }
            : false,
        },
      },
      {
        $project: {
          username: 1,
          fullName: 1,
          channelName: 1,
          bio: 1,
          avatar: 1,
          coverImage: 1,
          socialLinks: 1,
          createdAt: 1,
          subscriberCount: 1,
          videoCount: 1,
          isSubscribed: 1,
        },
      },
    ];

    const result = await User.aggregate(pipeline);

    if (!result.length) {
      return res.status(404).json({ message: "Channel not found" });
    }

    return res.status(200).json({
      message: "Channel profile loaded",
      profile: result[0],
    });
  } catch (err) {
    console.error("Channel profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export { registerUser, logoutUser, loginUser, refreshAccessToken, changePassword, updateProfile, getUserChannelProfile, };
