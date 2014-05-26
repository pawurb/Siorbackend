class Statistic < ActiveRecord::Base
  validates :score, :duration, presence: true
  validates :score, :duration, numericality: { only_integer: true }

  scope :recent, lambda { order('updated_at DESC').last(100) }

  def self.create_from_request params, ip
    if Statistic.last && Statistic.last.ip == ip
      statistic = Statistic.last
      statistic.attempts += 1
    else
      statistic = Statistic.new(params)
      statistic.ip = ip
      statistic.city = '...'
    end
    statistic.save
  end

  def self.uniq_count
    Statistic.pluck(:ip).uniq.count
  end
end
