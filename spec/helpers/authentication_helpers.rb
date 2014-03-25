module AuthenticationHelpers
  def sign_in user
    # ugly authentication stubbing...
    ApplicationController.any_instance.stub(:current_user) { user }
  end

  def http_basic_admin_login
    user = ENV['ADMIN_LOGIN']
    password = ENV['ADMIN_PASSWORD']
    request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials(user,password)
  end
end
