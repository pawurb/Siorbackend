# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Siorbackend::Application.initialize!

Siorbackend::Application.configure do
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true

  ActionMailer::Base.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => "siorb.dobreziele.pl",
    :enable_starttls_auto => true,
    :authentication       => :plain,
    :user_name            => ENV['SMTP_USERNAME'],
    :password             => ENV['SMTP_PASSWORD'],
    :openssl_verify_mode  => 'none'

  }
end
