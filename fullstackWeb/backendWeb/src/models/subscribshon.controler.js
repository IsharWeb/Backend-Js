import mongoose, { Schema } from "mongoose";

const subscribersSchema = new Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the user who is subscribing
      required: true
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the user being subscribed to (channel owner)
      required: true
    },
    subscribedAt: {
      type: Date,
      default: Date.now
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Optional: to prevent duplicate subscriptions
subscribersSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

export const Subscribers = mongoose.model("Subscribers", subscribersSchema);
