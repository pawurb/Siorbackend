class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update]
  http_basic_authenticate_with name: ENV['ADMIN_LOGIN'], password: ENV["ADMIN_PASSWORD"], only: [:index]


  def update
    current_user.update params["user"]

    respond_to do |format|
      format.js { render text: 'User statistics updated' }
      format.html { redirect_to root_path }
    end
  end

  def index
    render json: User.all
  end
end
