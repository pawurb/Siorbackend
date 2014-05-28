class StatisticSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :duration, :score, :ip, :city, :attempts, :updated_at_txt, :updated_at_unix, :created_at_txt, :created_at_unix
end
