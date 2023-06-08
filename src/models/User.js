import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    readonly: true,
  },
  username: {
    type: String,
    readonly: true,
  },
  email: {
    type: String,
    readonly: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
