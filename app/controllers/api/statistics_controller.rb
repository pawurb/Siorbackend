module API
  class StatisticsController < ApplicationController
    http_basic_authenticate_with name: Settings[:ADMIN_LOGIN], password: Settings[:ADMIN_PASSWORD], except: [:create]

    #fix issue with authenticity_token getting cached and going invalid
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      stat = Statistic.create_from_request statistic_params, request.ip
      Statistic::LocationWorker.perform_async(stat.id)
      render text: 'OK'
    end

    def index
      render json: Statistic.recent
    end

    def destroy
      Statistic.find_by(id: params[:id]).delete
      render text: 'Stat deleted'
    end

    def uniq_count
      render json: { count: Statistic.uniq_count }
    end

    private

    def statistic_params
      params.require(:statistic).permit(:score, :duration)
    end
  end
end