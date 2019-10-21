# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.5'
gem 'active_model_serializers', '~> 0.10.0'
gem 'acts-as-taggable-on', '~> 6.0'
gem 'aws-sdk', '~> 3'
gem 'aws-sdk-s3'
gem 'bootsnap', '~>1.4.4'
gem 'coffee-rails'
gem 'devise', '>= 4.6.0'
gem 'devise-jwt', '~> 0.5.9'
gem 'easypost'
gem 'faraday'
gem 'font_awesome5_rails'
gem 'friendly_id', '~> 5.1.0'
gem 'groupdate'
gem 'high_voltage'
gem 'jbuilder', '~> 2.5'
gem 'kaminari'
gem 'mini_magick'
gem 'mini_racer'
gem 'multichain', github: 'cafeauchain/multichain-client'
gem 'pager_api'
gem 'pagy'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'rails', '~> 5.2.3'
gem 'react-rails'
gem 'sass-rails', '~> 5.0'
gem 'semantic-ui-sass'
gem 'sendgrid-ruby'
gem 'sentry-raven'
gem 'skylight'
gem 'stripe'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'uglifier', '>= 1.3.0'
gem 'valid_email2'
gem 'webpacker'

group :development do
  gem 'annotate'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'hirb'
  gem 'hub', require: nil
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rails_layout'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
  # TODO: Dont forget to reable this
  # gem 'lol_dba'
  gem 'bullet'
  gem 'flamegraph'
  gem 'memory_profiler'
  gem 'rack-mini-profiler', require: false
  gem 'stackprof'
end

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
end

group :test do
  # gem 'database_cleaner'
  # gem 'launchy'
end
