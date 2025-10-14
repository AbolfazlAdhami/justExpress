# Express file uploads → multer-s3 (AWS SDK v3)

This repository is a minimal **Express** app that uploads files directly to **AWS S3** using **multer + multer-s3 (v3)** and **AWS SDK v3**. It follows a small **clean-architecture** layout (controllers / routes / middlewares / infra / config) and demonstrates single, array and fields uploads with a configurable S3 "folder" structure.

---

## Features

* Stream multipart uploads directly to S3 (no temporary disk storage)
* Clean folder structure for S3 objects (e.g. `uploads/avatars/`, `uploads/posts/<postId>/`)
* Single / multiple / fields upload examples
* Basic file-type filtering and size limits
* Thin controllers and reusable middleware factory

---

## Prerequisites

* Node.js 18+ (or 16+)
* An AWS account and an S3 bucket
* AWS credentials with at least `s3:PutObject` and `s3:GetObject` permissions for the target bucket

---

## Environment (example `.env`)

```env
PORT=3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
AWS_S3_BUCKET=my-bucket-name
AWS_S3_BASE_FOLDER=uploads
```

> For production, prefer IAM roles (EC2/ECS/Lambda) or a credentials provider instead of embedding keys.

---

## Install

```bash
npm install
```

Packages used (high level):

* express
* multer
* multer-s3 (v3 compatible with AWS SDK v3)
* @aws-sdk/client-s3
* dotenv
* helmet, morgan (basic middleware)
* express-async-errors

---

## Start

```bash
node server.js
# or
npm start
```

App will listen on `http://localhost:3000` by default.

---

## Project structure

```
my-app/
├─ src/
│  ├─ config/
│  │  └─ s3Client.js
│  ├─ infra/
│  │  └─ s3Storage.js
│  ├─ middlewares/
│  │  └─ upload.js
│  ├─ controllers/
│  │  └─ uploadController.js
│  ├─ routes/
│  │  └─ uploadRoutes.js
│  ├─ app.js
├─ .env
├─ package.json
└─ server.js
```

---

## Key files (code)

Below are the important files exactly as used by the app. Copy them into the corresponding paths in `src/`.

### `src/config/s3Client.js`

```js
// src/config/s3Client.js
const { S3Client } = require('@aws-sdk/client-s3');
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const s3Config = { region: AWS_REGION };
if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
}

const s3 = new S3Client(s3Config);
module.exports = s3;
```

---

### `src/infra/s3Storage.js`

```js
// src/infra/s3Storage.js
const multerS3 = require('multer-s3');
const path = require('path');
const crypto = require('crypto');
const s3 = require('../config/s3Client');

const { AWS_S3_BUCKET, AWS_S3_BASE_FOLDER = 'uploads' } = process.env;

function generateKey(originalName, subfolder = '') {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-_]/g, '');
  const random = crypto.randomBytes(6).toString('hex');
  const timestamp = Date.now();
  const prefix = subfolder ? `${AWS_S3_BASE_FOLDER}/${subfolder}` : `${AWS_S3_BASE_FOLDER}`;
  return `${prefix}/${timestamp}-${random}-${base}${ext}`;
}

const s3Storage = (options = {}) => {
  return multerS3({
    s3,
    bucket: AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'private',
    key: function (req, file, cb) {
      try {
        const subfolder = typeof options.subfolderResolver === 'function' ? options.subfolderResolver(req, file) : '';
        const finalKey = generateKey(file.originalname, subfolder);
        cb(null, finalKey);
      } catch (err) {
        cb(err);
      }
    }
  });
};

module.exports = s3Storage;
```

---

### `src/middlewares/upload.js`

```js
// src/middlewares/upload.js
const multer = require('multer');
const s3Storage = require('../infra/s3Storage');

function imageFileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

const defaultOptions = {
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFileFilter,
};

function createUploadMiddleware(opts = {}) {
  const storage = s3Storage(opts);
  return multer({ storage, ...Object.assign({}, defaultOptions, opts.multerOptions || {}) });
}

module.exports = { createUploadMiddleware, imageFileFilter };
```

---

### `src/controllers/uploadController.js`

```js
// src/controllers/uploadController.js
async function uploadSingle(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  return res.json({
    message: 'single upload success',
    file: { key: req.file.key, size: req.file.size, mimetype: req.file.mimetype, location: req.file.location }
  });
}

async function uploadMultiple(req, res) {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
  const files = req.files.map(f => ({ key: f.key, size: f.size, mimetype: f.mimetype, location: f.location }));
  return res.json({ message: 'multiple upload success', files });
}

async function uploadFields(req, res) {
  const saved = {};
  if (req.files) {
    for (const fieldName of Object.keys(req.files)) {
      saved[fieldName] = req.files[fieldName].map(f => ({ key: f.key, size: f.size, mimetype: f.mimetype, location: f.location }));
    }
  }
  return res.json({ message: 'fields upload success', saved });
}

module.exports = { uploadSingle, uploadMultiple, uploadFields };
```

---

### `src/routes/uploadRoutes.js`

```js
// src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { createUploadMiddleware } = require('../middlewares/upload');
const { uploadSingle, uploadMultiple, uploadFields } = require('../controllers/uploadController');

const uploadForAvatar = createUploadMiddleware({ subfolderResolver: () => 'avatars', multerOptions: { limits: { fileSize: 5 * 1024 * 1024 } } });
const uploadForPosts = createUploadMiddleware({ subfolderResolver: (req) => req.body.postId ? `posts/${req.body.postId}` : 'posts' });

router.post('/avatar', uploadForAvatar.single('avatar'), uploadSingle);
router.post('/photos', uploadForPosts.array('photos', 8), uploadMultiple);
router.post('/mixed', createUploadMiddleware({ subfolderResolver: () => 'mixed' }).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 6 }
]), uploadFields);

module.exports = router;
```

---

### `src/app.js`

```js
// src/app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('express-async-errors');

const uploadRoutes = require('./routes/uploadRoutes');
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
```

---

### `server.js`

```js
// server.js
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

---

## cURL examples

Single:

```bash
curl -X POST -F "avatar=@./me.jpg" http://localhost:3000/uploads/avatar
```

Multiple:

```bash
curl -X POST -F "postId=123" -F "photos=@./p1.jpg" -F "photos=@./p2.jpg" http://localhost:3000/uploads/photos
```

Fields:

```bash
curl -X POST -F "avatar=@./a.jpg" -F "gallery=@./g1.jpg" -F "gallery=@./g2.jpg" http://localhost:3000/uploads/mixed
```

---

## IAM policy example (minimal)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3PutGet",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket-name",
        "arn:aws:s3:::my-bucket-name/*"
      ]
    }
  ]
}
```

---

## Notes & next steps

* If you want presigned upload URLs (client uploads directly to S3), I can add an endpoint that generates presigned PUT/MultiPart URLs using `@aws-sdk/s3-request-presigner` or `@aws-sdk/lib-storage`.
* If you prefer TypeScript, I can convert the project and add types/tests.
* For large-file resilience consider multipart upload with `@aws-sdk/lib-storage`.

---

## License

MIT
