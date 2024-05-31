const fs = require('fs');
const base64 = require('base-64');
const { env } = require('process');

const fileName = '.env';

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading .env file:', err);
    return;
  }

  const lines = data.split('\n');
  const secrets = {};
  let output=""

  lines.forEach(line => {
    if (line.includes("PORT")) {
        
    } else {
        output+=`"${line}",`
    }
    
    /* const [key, value] = line.split('=');
    if (key && value) {
       secrets[key.trim()] = value;//base64.encode(value.trim());
    } */
  });

  const exec = require('child_process').exec;
  const service_name="flutter-endpoints"

  /* Object.entries(secrets).forEach(([key, value]) => {
    const command = `gcloud run services update "${service_name}" --update-env-vars "${key}=${value}" --region "us-central1"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error setting secret ${key}:`, error);
      } else {
        console.log(`Set secret: ${key} (encoded)`);
      }
    });
  }); */
  
  const command = `gcloud run services update ${service_name} --update-env-varsd ${output} --region "europe-west1"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error setting env variables`, error);
    } else {
      console.log(`Set secret: ${lines} (encoded)`);
    }
  });
});
