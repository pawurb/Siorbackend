class StatisticSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :duration, :score, :ip, :date
end
