const { exec } = require('child_process');

// Replace 'your command here' with the actual command you want to run
const command = 'pm2 reload index.js';
// const command = 'pm2 reload 0';

exec(command, (error, stdout, stderr) => {
 if (error) {
  console.error(`Error executing the command: ${error}`);
  return;
 }
 console.log(`Output of the command:\n${stdout}`);
 console.error(`Errors from the command:\n${stderr}`);
});
