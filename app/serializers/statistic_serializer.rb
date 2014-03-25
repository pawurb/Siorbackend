class StatisticSerializer < ActiveModel::Serializer
  attributes :id, :duration, :score, :ip, :date

  def date
    object.created_at.strftime("%e-%m-%y %H:%M")
  end
end
