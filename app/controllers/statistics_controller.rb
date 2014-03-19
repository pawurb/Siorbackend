class StatisticsController < ApplicationController
  def create
    Statistic.create_from_request statistic_params, request.ip
    render text: 'OK'
  end

  private

  def statistic_params
    params.require(:statistic).permit(:score, :duration)
  end
end
