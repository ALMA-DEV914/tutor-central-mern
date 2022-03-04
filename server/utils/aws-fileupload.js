const dotenv = require("dotenv");
const aws = require("aws-sdk");

dotenv.config();

const region = "us-east-2";
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//get s3 connection object to work with
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    
});

//create secure url that the client can use to post images to the s3 bucket
module.exports = {
    generateUploadURL: async function () {
      const signedUrlExpireSeconds = 60 * 10;
  const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
        };
        //upload image to s3 bucket and return the URL
        const uploadURL = await s3.getSignedUrlPromise("putObject", params);
        return uploadURL;
    },
};
