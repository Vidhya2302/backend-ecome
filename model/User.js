import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true, // Use Firebase UID as the unique identifier
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    role: {
      type: String,
      enum: ["user","seller","admin"], // Can have admin roles if needed
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
