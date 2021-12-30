const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (fileContent, fileId) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: config.BUCKET_NAME,
    Key: `${fileId}.png`, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'image/png',
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = { uploadFile };