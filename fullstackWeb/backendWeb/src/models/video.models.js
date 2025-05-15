import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    duration: {
      type: String, // Format like "10:32"
      default: "0:00",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }
    ],
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      }
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    isMonetized: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "Education",
        "Music",
        "Gaming",
        "Sports",
        "News",
        "Entertainment",
        "Movies",
        "Technology",
        "Comedy",
        "Vlogs",
        "Lifestyle",
        "How-to & Style",
        "Health & Fitness",
        "Science & Tech",
        "Kids",
        "Other"
      ],
      
      default: "Other",
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    }
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(aggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
