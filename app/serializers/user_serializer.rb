class UserSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :email, :name, :nickname, :fb_nickname, :best_score, :gameplays, :image_url, :created_at, :created_at_unix, :updated_at, :updated_at_unix

end
