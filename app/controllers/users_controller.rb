class UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    current_user.update params["user"]

    respond_to do |format|
      format.js { render text: 'User statistics updated' }
      format.html{ redirect_to root_path }
    end
  end
end
