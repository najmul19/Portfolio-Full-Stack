const axios = require('axios');
const FormData = require('form-data');

/**
 * Upload image to ImgBB
 * @param {string} image - Base64 string of the image
 * @returns {Promise<string>} - URL of the uploaded image
 */
const uploadToImgBB = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
            }
        );

        return response.data.data.url;
    } catch (error) {
        if (error.response) {
            console.error('ImgBB Error:', error.response.data);
            throw new Error(`ImgBB Upload Failed: ${error.response.data.error.message}`);
        }
        throw error;
    }
};

module.exports = uploadToImgBB;
