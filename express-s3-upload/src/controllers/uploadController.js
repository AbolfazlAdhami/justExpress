// controllers are thin wrappers that handle request/response
async function uploadSingle(req, res) {
  // multer-s3 places file metadata on req.file
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // req.file.key contains the object key; location may be present depending on multers3 config
  // To build a public URL (if objects are public), you can construct it or return the key to the client.
  return res.json({
    message: "single upload success",
    file: {
      key: req.file.key,
      size: req.file.size,
      mimetype: req.file.mimetype,
      // For S3 v3 + multer-s3 you may receive `location` or `ETag` depending on package/version
      location: req.file.location, // may be undefined if ACL is private
    },
  });
}

async function uploadMultiple(req, res) {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: "No files uploaded" });
  const files = req.files.map((f) => ({
    key: f.key,
    size: f.size,
    mimetype: f.mimetype,
    location: f.location,
  }));
  return res.json({ message: "multiple upload success", files });
}

async function uploadFields(req, res) {
  // req.files will be an object keyed by fieldname
  const saved = {};
  if (req.files) {
    for (const fieldName of Object.keys(req.files)) {
      saved[fieldName] = req.files[fieldName].map((f) => ({
        key: f.key,
        size: f.size,
        mimetype: f.mimetype,
        location: f.location,
      }));
    }
  }
  return res.json({ message: "fields upload success", saved });
}

module.exports = { uploadSingle, uploadMultiple, uploadFields };
