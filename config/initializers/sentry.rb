Raven.configure do |config|
  config.dsn = 'https://787afef10ad642f4aa88c40622b6108f:1d710066b0a74d1daeb0041a7b161f9c@sentry.io/1406268'
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.environments = ['development', 'production']
end