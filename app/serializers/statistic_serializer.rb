class StatisticSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :duration, :score, :ip, :created_at_txt, :created_at_unix, :city
end
