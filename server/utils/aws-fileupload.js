const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  signatureVersion: "v4",
});

const getS3UploadLink = async (filename) => {
  if (!filename) {
    filename = "test.jpg";
  }
  const signedUrlExpireSeconds = 60;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Expires: signedUrlExpireSeconds,
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  console.log(url);
  return url;
};

module.exports = {
  getS3UploadLink,
};
