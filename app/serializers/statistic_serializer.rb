class StatisticSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :duration, :score, :ip, :created_at, :created_at_unix
end
