#!/bin/bash

# Get Cloud Run service name from environment variable
service_name=${CLOUD_RUN_SERVICE_NAME}

# Get all repository secrets
ghsecrets=$(gh secret list --json name | jq -r '.[].name')

# Loop through each secret
for ghsecret in $ghsecrets; do
  # Decode the secret value
  decoded_value=$(echo -n "${!ghsecret}" | base64 -d)

  # Update environment variable for Cloud Run service (skip non-base64 secrets)
  if [[ ! -z "$decoded_value" ]]; then
    gcloud run services update "$service_name" \
      --update-env-vars "$secret=$decoded_value"
    echo "updated ${ghsecret} env variable"
  fi
done

# Print success message
echo "Successfully updated environment variables for ${service_name} service!"
