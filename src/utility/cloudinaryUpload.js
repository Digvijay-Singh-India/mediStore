const cloudinary = require('cloudinary').v2;

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.API_KEY,
 api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath, folder = '') => {
 try {
  const result = await cloudinary.uploader.upload(filePath, {
   folder: 'mediStore/' + folder,
  });
  // console.log(result, 'r');
  if (result?.secure_url) {
  }
  return result.secure_url;
 } catch (error) {
  // console.log(error.message);
  return false;
 }
};
const cloudinaryUpload = uploadFile;
module.exports = cloudinaryUpload;
