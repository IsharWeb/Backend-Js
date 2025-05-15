import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    channelName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    watchHistory: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
        watchedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" }
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
