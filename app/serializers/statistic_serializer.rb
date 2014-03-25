class StatisticSerializer < ActiveModel::Serializer
  attributes :id, :duration, :score, :ip
end
