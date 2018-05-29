class UserSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :email, :name, :nickname, :fb_nickname, :best_score, :gameplays, :created_at_txt, :created_at_unix, :updated_at_txt, :updated_at_unix

end
