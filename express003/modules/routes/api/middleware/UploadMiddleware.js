const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
// TODO: INSTALL multer

const size = 10; // 10MB limit as example
// multer storage using dest (keeps temp filename) OR use diskStorage — keep dest for simplicity

const ImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDay();

    let dir = `./public/upload/images/${year}/${month}/${day}`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") cb(null, true);
  else cb(null, false);
};

const uploadImage = multer({
  storage: ImageStorage,
  limits: 1024 * 1024 * 100,
  fileFilter: imageFilter,
});

module.exports = { uploadImage };
