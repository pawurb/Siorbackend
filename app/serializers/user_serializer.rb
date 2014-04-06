class UserSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :email, :name, :nickname, :best_score, :gameplays, :image_url, :date

end
