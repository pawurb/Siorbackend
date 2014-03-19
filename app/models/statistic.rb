class Statistic < ActiveRecord::Base
  validates :score, :duration, presence: true
  validates :score, :duration, numericality: { only_integer: true }

  def self.create_from_request params, ip
    statistic = Statistic.new(params)
    statistic.ip = ip
    statistic.save
  end
end
