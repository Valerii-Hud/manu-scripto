import mongoose from 'mongoose';
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
    // fullName: {
    //   type: String,
    //   trim: true,
    //   minLength: 4,
    //   maxLength: 128,
    // },
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
    },
    points: {
      type: Number,
      default: 0,
    },
    // phoneNumber: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    // },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
      },
    ],
    dislikedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
      },
    ],
    profileImage: {
      type: String,
      trim: true,
      default: '',
    },
    coverImage: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    userType: {
      type: String,
      enum: ['default', 'administrator', 'support'],
      default: 'default',
    },
    tags: [
      {
        type: String,
        default: '',
      },
    ],
    // TODO: Make flags in one obj
    isHidden: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isMuted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    hasNitro: {
      type: Boolean,
      default: false,
    },
    hasNitroPlus: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
