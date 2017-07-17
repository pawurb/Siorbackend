module API
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:update]
    http_basic_authenticate_with name: ENV['ADMIN_LOGIN'], password: ENV['ADMIN_PASSWORD'], only: [:index, :destroy]

    #fix issue with authenticity_token getting cached
    skip_before_action :verify_authenticity_token, only: [:update]

    def update
      current_user.update user_params

      respond_to do |format|
        format.any(:js, :json) { render text: 'User statistics updated' }
        format.html { redirect_to ROOT_PATH }
      end
    end

    def destroy
      User.find_by(id: params[:id]).delete
      render text: 'User deleted'
    end

    def index
      render json: User.for_admin
    end

    private

    def user_params
      params.require(:user).permit(:nickname, :noturbusiness)
    end
  end
end
