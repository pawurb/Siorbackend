class LocationWorker
  include Sidekiq::Worker
  # sidekiq_options retry: false

  def perform(statistic_id)
    stat = Statistic.find(statistic_id)
    response = RestClient.get("http://freegeoip.net/json/#{ip}")
    stat.city = JSON.parse(response)['city']
    stat.save
  rescue => e
    Rails.logger.error "Failed to get statistic location because of: #{e.message}"
  end
end