import mongoose from "mongoose";

const verifiedUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const VerifiedUser = mongoose.model("VerifiedUser", verifiedUserSchema);
export default VerifiedUser;
