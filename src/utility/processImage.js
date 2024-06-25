const sharp = require('sharp');

async function processImage({
 inputPath,
 outputPath,
 width,
 height,
 quality = 90,
}) {
 try {
  await sharp(inputPath)
   //  .resize(width, height)
   .webp({ quality: quality })
   .toFile(outputPath);
  //console.log('Image processed successfully!');
 } catch (err) {
  console.error('Error processing image:', err);
  throw err;
 }
}

// Example usage:
const inputImagePath = 'input.jpg';
const outputImagePath = 'output.webp';
const targetWidth = 800;
const targetHeight = 600;
const compressionQuality = 80; // Adjust as needed (0-100)

// processImage(
//  inputImagePath,
//  outputImagePath,
//  targetWidth,
//  targetHeight,
//  compressionQuality
// );

// processImage({
//  inputPath: 'assets/img/page/Designer (5).png',
//  outputPath: 'assets/img/page/Designer5.webp',
//  quality: 50,
//  // targetWidth,
//  // targetHeight,
//  // compressionQuality
// });
module.exports = processImage;
