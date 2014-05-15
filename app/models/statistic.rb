class Statistic < ActiveRecord::Base
  validates :score, :duration, presence: true
  validates :score, :duration, numericality: { only_integer: true }
  after_create :get_location

  scope :recent, lambda { last(100) }

  def self.create_from_request params, ip
    statistic = Statistic.new(params)
    statistic.ip = ip
    statistic.save
  end

  def self.uniq_count
    Statistic.pluck(:ip).uniq.count
  end

  def get_location
    LocationWorker.perform_async(id)
  end
end
