Raven.configure do |config|
  config.dsn = 'https://787afef10ad642f4aa88c40622b6108f@sentry.io/1406268'
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.environments = ['development', 'production']
end