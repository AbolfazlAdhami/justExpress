import express from "express";
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {});



app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
