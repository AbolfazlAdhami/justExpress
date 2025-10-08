import { createApp } from "./createApp.mjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = createApp();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
