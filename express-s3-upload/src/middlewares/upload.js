const multer = require("multer");
const s3Storage = require("../infra/s3Storage");

// Basic file filter — images only example (adjust as needed)
function imageFileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}

const defaultOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
  },
  fileFilter: imageFileFilter,
};

// factory to create multer middleware for single/array/fields
function createUploadMiddleware(opts = {}) {
  const storage = s3Storage(opts); // accepts subfolderResolver
  return multer({ storage, ...Object.assign({}, defaultOptions, opts.multerOptions || {}) });
}

module.exports = { createUploadMiddleware, imageFileFilter };
