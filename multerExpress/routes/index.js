const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// ensure upload directory exists
const UPLOAD_DIR = path.join(__dirname, "..", "public", "images", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const size = 10; // 10MB limit as example
// multer storage using dest (keeps temp filename) OR use diskStorage — keep dest for simplicity
const upload = multer({
  dest: path.join("public", "images", "uploads", "tmp"), // store temporaries in tmp subdir
  limits: { fileSize: size * 1024 * 1024 },
});
// simple sanitizer for filenames
function sanitizeFilename(name) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\._]/g, "");
}
// build a final filename preserving extension
function makeFilename(originalName) {
  const ext = path.extname(originalName) || "";
  const base = path.basename(originalName, ext);
  return `${Date.now()}-${sanitizeFilename(base)}${ext}`;
}

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// SINGLE file upload
router.post("/formsub", upload.single("meme"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No such file!" });

    const fileName = makeFilename(req.file.originalname);
    const destPath = path.join(UPLOAD_DIR, fileName);

    // move file from multer dest for final destination
    await fsPromises.rename(req.file.path, destPath);

    // respond with relative/public path (safe for client)
    return res.json({ message: "File Uploaded", path: `/image/uploads/${fileName}` });

    // respond with URL path for third party User app
    // const baseUrl = process.env.BASEURL; https://mockserver/image/file.jpeg
    // return res.json({ message: "File Uploaded", path: `${baseUrl}/image/uploads/${fileName}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// MULTIPLE (array) upload — limit to 8 files for example
router.post("/formsubarray", upload.array("meme", 8), async (req, res) => {
  try {
    if (!req.file || req.files.length == 0) return res.status(400).json({ error: "No files uploaded" });

    const saved = [];
    for (const f of req.files) {
      const finalName = makeFilename(f.originalname);
      const destPath = path.join(UPLOAD_DIR, finalName);
      await fsPromises.rename(f.path, destPath);

      saved.push({ original: f.originalname, path: `/images/uploads/${finalName}` });
    }

    return res.json({ message: "Files uploaded", files: saved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "One or more files failed to save" });
  }
});

// MULTI-FIELD upload example: avatar (single) + gallery (many)
router.post(
  "/formsubarray",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 8 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) return res.status(400).json({ error: "No files uploaded" });

      const saved = {};

      // handle avatar if present
      if (req.files.avatar && req.files.avatar[0]) {
        const av = req.files.avatar[0];
        const finalName = makeFilename(av.originalname);
        await fsPromises.rename(av.path, path.join(UPLOAD_DIR, finalName));
        saved.avatar = `/images/uploads/${finalName}`;
      }

      // handle gallery if present
      if (Array.isArray(req.files.gallery)) {
        saved.gallery = [];
        for (const g of req.files.gallery) {
          const finalName = makeFilename(g.originalname);
          await fsPromises.rename(g.path, path.join(UPLOAD_DIR, finalName));
          saved.gallery.push(`/images/upload/${finalName}`);
        }
      }

      return res.json({ message: "Files uploaded", saved });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
