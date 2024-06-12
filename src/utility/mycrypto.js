const crypto = require('crypto');
const Config = require('../Config');
const key = crypto
 .createHash('sha256')
 .update(Config.get('cryptoKey'))
 .digest()
 .slice(0, 32);

function encrypt(text) {
 try {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  //cipher.end();
  return (
   iv.toString('base64').replace(/=/g, '') +
   '.' +
   encrypted.toString('base64').replace(/=/g, '')
  );
  return iv.toString('hex') + ':' + encrypted.toString('hex');
 } catch (error) {
  return false;
 }
}

// Decryption function
function decrypt(text) {
 try {
  const textParts = text.split('.');
  const iv = Buffer.from(textParts[0], 'base64');
  const encryptedText = Buffer.from(textParts[1], 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  //decipher.end(); // Close the decipher instance

  return decrypted.toString();
 } catch (error) {
  return false;
 }
}

function hashPassword(password) {
 const key = crypto.createHash('sha256').update(password).digest('hex');
 return key;
}

module.exports = { encrypt: encrypt, decrypt: decrypt, hashPassword };

/**

	<?php 
	
	function decryptString2($encoded)
{
 $method = 'AES-256-CBC';
 $password = 'jhgjhjgghjghjhghihjjyjyjjhgjgjgjjjhjkhmhkhk';
 $key = substr(hash('sha256', $password, true), 0, 32);

	$decoded=explode('.',$encoded);
 $iv =base64_decode($decoded[0]) ; 
 $encrypted =base64_decode($decoded[1]);
 $decrypted = openssl_decrypt($encrypted, $method, $key, OPENSSL_RAW_DATA, $iv);
 return $decrypted;
}
	echo '<br/>';
//echo decryptString2('aNsHYI8P4Vkgkbh4F0zTIA.ZZ5IS/C47sy+K0rV5848MegGRacVFjel/5K0fiKElsUqi3nUZskORZQhAZ3Gkowb');
echo decryptString2(' giTTiF3v0u9965n1jWQ0Uw.0LmPgtwmeQKS/oqk6esmGahtGSP0PbNCcqekHH/TTV04tdTcaYGFgIVVDlgx74Ti');
	
	
	?>
 */

// const crypto = require('crypto');
// const Config = require('../Config');
// console.log(Config.get('cryptoKey'));
// // Encryption function
// function encrypt(text) {
//  const iv = crypto.randomBytes(16); // Initialization vector
//  const cipher = crypto.createCipheriv(
//   'aes-256-cbc',
//   Buffer.from(Config.get('cryptoKey')),
//   iv
//  );
//  let encrypted = cipher.update(text);
//  encrypted = Buffer.concat([encrypted, cipher.final()]);
//  return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// // Decryption function
// function decrypt(text) {
//  const textParts = text.split(':');
//  const iv = Buffer.from(textParts.shift(), 'hex');
//  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
//  const decipher = crypto.createDecipheriv(
//   'aes-256-cbc',
//   Buffer.from(Config.get('cryptoKey')),
//   iv
//  );
//  let decrypted = decipher.update(encryptedText);
//  decrypted = Buffer.concat([decrypted, decipher.final()]);
//  return decrypted.toString();
// }

// // Usage
// const secretKey = 'YourSecretKey';
// const plaintext = 'Hello, World!';

// const encryptedText = encrypt(plaintext);
// console.log('Encrypted:', encryptedText);

// const decryptedText = decrypt(encryptedText);
// console.log('Decrypted:', decryptedText);
// module.exports = { encrypt: encrypt, decrypt: decrypt };
