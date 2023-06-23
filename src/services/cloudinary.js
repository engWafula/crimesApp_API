const cloudinary = require('cloudinary');


exports.Cloudinary = {
    upload: async (image) => {
        // return new Promise((resolve, reject) => {
        const res = await cloudinary.v2.uploader.upload(image, {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_NAME,
            folder: 'spare-parts/',
        });
        return res.secure_url;
    },
    delete: async (publicId) => {
        const res = await cloudinary.v2.uploader.destroy(publicId, {
            //@ts-ignore
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          cloud_name: process.env.CLOUDINARY_NAME,
        });
        return res.result === 'ok';
      },
};
