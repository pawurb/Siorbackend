module AuthenticationHelpers
  def sign_in user
    # ugly authentication stubbing...
    ApplicationController.any_instance.stub(:current_user) { user }
  end
end
