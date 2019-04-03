require 'aws-sdk'

Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(Rails.application.credentials.access_key_id, Rails.application.credentials.secret_access_key)
})