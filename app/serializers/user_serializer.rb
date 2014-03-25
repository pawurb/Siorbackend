class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :nickname, :best_score, :gameplays, :image_url
end
