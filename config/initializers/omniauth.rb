OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Settings[:FACEBOOK_ID], Settings[:FACEBOOK_SECRET]
end

