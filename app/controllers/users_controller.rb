class UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    if current_user.update_statistics params["score"]
      render text: 'User statistics updated'
    else
      render text: 'Error error'
    end
  end
end
