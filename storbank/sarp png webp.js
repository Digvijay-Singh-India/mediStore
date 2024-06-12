const sharp = require('sharp');

// Input PNG file path
const inputPath = 'input.png';

// Output WebP file path
const outputPath = 'output.webp';

// Perform the conversion
sharp(inputPath)
 .toFormat('webp')
 .toFile(outputPath)
 .then(() => {
  console.log('PNG to WebP conversion complete');
 })
 .catch((err) => {
  console.error('Error converting PNG to WebP:', err);
 });
