import { createApp } from "./createApp.mjs";
import dotenv from "dotenv";
import { connectDB } from "./config/db.mjs";
import { seedAdmin } from "./seed/seedData.mjs";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = createApp();

connectDB().then(() => seedAdmin());

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
