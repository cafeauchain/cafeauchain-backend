require 'aws-sdk'

Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(Rails.application.credentials[Rails.env.to_sym][:access_key_id], Rails.application.credentials[Rails.env.to_sym][:secret_access_key])
})