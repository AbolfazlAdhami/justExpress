import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Abolfazl Adhami",
    email: "abolfazl@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sara Mohammadi",
    email: "sara@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Reza Karimi",
    email: "reza@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];
