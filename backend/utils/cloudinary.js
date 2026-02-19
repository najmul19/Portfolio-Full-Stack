const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file (image or PDF) to Cloudinary from a base64 data URI
 * @param {string} dataUri  - e.g. "data:application/pdf;base64,JVBERi..."
 * @param {object} options  - extra Cloudinary upload options
 * @returns {Promise<string>} - secure URL of the uploaded file
 */
const uploadToCloudinary = async (dataUri, options = {}) => {
    const result = await cloudinary.uploader.upload(dataUri, {
        resource_type: 'auto',   // handles both images and PDFs
        folder: 'portfolio/certificates',
        ...options,
    });
    return result.secure_url;
};

module.exports = uploadToCloudinary;
