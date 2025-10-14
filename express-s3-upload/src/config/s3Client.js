const { S3Client } = require("@aws-sdk/client-s3");
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const s3Config = {
  region: AWS_REGION,
};

// If running on env with credentials already (ECS, EC2, Lambda, or profile), omit credentials here
if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
}

const s3 = new S3Client(s3Config);
module.exports = s3;
