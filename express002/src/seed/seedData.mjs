import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.mjs";

export const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "abolfazl@example.com" });
  if (!existingAdmin) {
    const adminData = {
      _id: new mongoose.Types.ObjectId(),
      name: "Abolfazl Adhami",
      email: "abolfazl@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=1",
    };
    await User.create(adminData);
    console.log("✅ Admin user created:", adminData.email);
  } else {
    console.log("⚙️ Admin already exists");
  }
};
