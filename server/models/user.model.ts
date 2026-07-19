import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 16,
    },
    fullName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 128,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 8,
      maxLength: 256,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    profileImage: {
      type: String,
      trim: true,
      default: "",
    },
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
    userType: {
      type: String,
      enum: [
        "default",
        "administrator",
        "moderator",
        "support",
        "secretAdministrator",
      ],
      default: "default",
    },
  },

  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
