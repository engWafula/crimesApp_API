const cloudinary = require('cloudinary');

const generateUniqueFilename = () => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `image_${timestamp}_${randomString}`;
  };

const upload = async (image) => {
    const uniqueFilename = generateUniqueFilename();

  const res = await cloudinary.v2.uploader.upload(image, {
    public_id: uniqueFilename,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
    folder: 'crimes/',
  });
  return res.secure_url;
};

const remove = async (publicId) => {
  const res = await cloudinary.v2.uploader.destroy(publicId, {
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
  });
  return res.result === 'ok';
};

module.exports = { upload, remove };
