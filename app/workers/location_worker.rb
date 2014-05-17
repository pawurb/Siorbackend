class LocationWorker
  include Sidekiq::Worker
  # sidekiq_options retry: false

  def perform(statistic_id)
    stat = Statistic.find(statistic_id)
    url = "http://freegeoip.net/json/#{stat.ip}"
    RestClient::Request.execute method: :get, url: url, timeout: 10, open_timeout: 10
    stat.city = JSON.parse(response)['city']
    stat.save
  rescue => e
    Rails.logger.error "Failed to get statistic location because of: #{e.message}"
  end
end