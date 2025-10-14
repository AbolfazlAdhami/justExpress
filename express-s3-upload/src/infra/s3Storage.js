// wraps multer-s3 with AWS SDK v3 S3 client
const multerS3 = require("multer-s3");
const path = require("path");
const crypto = require("crypto");
const s3 = require("../config/s3Client");

const { AWS_S3_BUCKET, AWS_S3_BASE_FOLDER = "uploads" } = process.env;

// generate a safe filename with folder structure
function generateKey(originalName, subfolder = "") {
  const ext = path.extname(originalName);
  const base = path
    .basename(originalName, ext)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-_]/g, "");
  const random = crypto.randomBytes(6).toString("hex");
  const timestamp = Date.now();
  const folderPrefix = subfolder ? `${AWS_S3_BASE_FOLDER}/${subfolder}` : `${AWS_S3_BASE_FOLDER}`;
  return `${folderPrefix}/${timestamp}-${random}-${base}${ext}`;
}

const s3Storage = (options = {}) => {
  // options.subfolderResolver: (req,file) => 'avatars' | 'posts/123' etc
  return multerS3({
    s3,
    bucket: AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "private", // or 'public-read' if you want public access (be careful)
    key: function (req, file, cb) {
      try {
        const subfolder = typeof options.subfolderResolver === "function" ? options.subfolderResolver(req, file) : "";
        const finalKey = generateKey(file.originalname, subfolder);
        cb(null, finalKey);
      } catch (err) {
        cb(err);
      }
    },
  });
};

module.exports = s3Storage;
