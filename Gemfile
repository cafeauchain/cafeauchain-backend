source 'https://rubygems.org'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.5'
gem 'rails', '~> 5.2'
gem 'bootsnap'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails'
gem 'jbuilder', '~> 2.5'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "bootstrap", ">= 4.1.2"
gem 'pg', '~> 0.18'
gem 'devise'
gem 'high_voltage'
gem 'font_awesome5_rails'
gem 'friendly_id', '~> 5.1.0'
gem 'multichain', github: 'cafeauchain/multichain-client'
gem 'faraday'
gem 'webpacker'
gem 'react-rails'
gem 'semantic-ui-sass'
gem 'mini_magick'
gem 'mini_racer'

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'better_errors'
  gem 'hub', :require=>nil
  gem 'rails_layout'
  gem 'spring-commands-rspec'
  gem 'annotate'
  gem "binding_of_caller"
end

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
end

group :test do
  gem 'database_cleaner'
  gem 'launchy'
end
