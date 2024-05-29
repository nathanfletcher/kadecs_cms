const fs = require('fs');
const base64 = require('base-64');

const fileName = '.env';

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading .env file:', err);
    return;
  }

  const lines = data.split('\n');
  const secrets = {};

  lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      secrets[key.trim()] = base64.encode(value.trim());
    }
  });

  const exec = require('child_process').exec;

  Object.entries(secrets).forEach(([key, value]) => {
    const command = `gh secret set ${key} --body="${value}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error setting secret ${key}:`, error);
      } else {
        console.log(`Set secret: ${key} (encoded)`);
      }
    });
  });
});
