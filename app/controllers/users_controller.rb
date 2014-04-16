class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update]
  http_basic_authenticate_with name: ENV['ADMIN_LOGIN'], password: ENV["ADMIN_PASSWORD"], only: [:index, :destroy]

  skip_before_action :verify_authenticity_token, only: [:update]

  def update
    current_user.update params["user"]

    respond_to do |format|
      format.js { render text: 'User statistics updated' }
      format.html { redirect_to root_path }
    end
  end

  def destroy
    User.find_by(id: params[:id]).delete
    render text: 'User deleted'
  end

  def index
    render json: User.all
  end
end
