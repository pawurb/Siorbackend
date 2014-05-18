class Statistic::LocationWorker
  include Sidekiq::Worker
  # sidekiq_options retry: false

  def perform(statistic_id)
    stat = Statistic.find(statistic_id)
    url = "http://ip-api.com/json/#{stat.ip}"
    response = RestClient::Request.execute method: :get, url: url, timeout: 10, open_timeout: 10
    location = JSON.parse(response)['city']
    stat.city = location.blank? ? 'n/a' : location
    stat.save
  rescue => e
    Rails.logger.error "Failed to get statistic location because of: #{e.message}"
    stat.city = 'err'
    stat.save
  end
end