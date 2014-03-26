class StatisticsController < ApplicationController
  http_basic_authenticate_with name: ENV['ADMIN_LOGIN'], password: ENV["ADMIN_PASSWORD"], only: [:index]

  def create
    Statistic.create_from_request statistic_params, request.ip
    render text: 'OK'
  end

  def index
    render json: Statistic.recent
  end

  def destroy
    Statistic.find_by(id: params[:id]).delete
    render text: 'Stat deleted'
  end

  private

  def statistic_params
    params.require(:statistic).permit(:score, :duration)
  end
end
