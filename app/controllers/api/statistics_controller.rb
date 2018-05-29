module API
  class StatisticsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      if Statistic.create_from_request(statistic_params)
      end
      render text: 'OK'
    end

    private

    def statistic_params
      params.require(:statistic).permit(:score, :duration)
    end
  end
end
