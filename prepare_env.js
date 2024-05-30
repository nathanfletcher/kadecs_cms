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
    console.log(`${key}: $(echo-n "secrets.${key}"|base64-d)`)
  });
});
