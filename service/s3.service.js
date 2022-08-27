const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v4;

const {
    AWS_S3_BUCKET_REGION,
    AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_ACCESS_KEY_ID,
    AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_URL
} = require('../constants/config');

const BucketConfig = new S3({
    region: AWS_S3_BUCKET_REGION,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID
});

module.exports = {
    uploadFile: async (file, itemType, itemId) => {
        const Key = _buildFilePath(file.name, itemType, itemId);

        return BucketConfig
            .upload({
                Bucket: AWS_S3_BUCKET_NAME,
                Key,
                ContentType: file.mimetype,
                ACL: "public-read",
                Body: file.data
            })
            .promise();
    },
    updateFile: async (file, fileURL) => {
        const path = fileURL.split(AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .putObject({
                Bucket: AWS_S3_BUCKET_NAME,
                Key: path,
                ContentType: file.mimetype,
                ACL: "public-read",
                Body: file.data
            })
            .promise();
    },

    deleteFile: async (fileURL) => {
        const path = fileURL.split(AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .deleteObject({
                Bucket: AWS_S3_BUCKET_NAME,
                Key: path,
            })
            .promise();
    },

};




function _buildFilePath(fileName = '', itemType, itemId) {
    const ext = fileName.split('.').pop(); // jpg
    // const ext2 = path.extname(fileName); // .jpg

    // return `${itemType}/${itemId}/${Date.now()}${ext2}`;
    return `${itemType}/${itemId}/${uuid()}.${ext}`;
}
