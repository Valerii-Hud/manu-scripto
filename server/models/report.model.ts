import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    defaultMessage: {
      type: String,
      enum: [
        "spam",
        "fakeAccount",
        "impersonation",
        "harassmentOrBullying",
        "hateSpeech",
        "scamOrFraud",
        "threatsOrViolence",
        "childExploitation",
        "other",
      ],
      required: true,
    },
    customMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
