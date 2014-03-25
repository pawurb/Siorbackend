class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :nickname, :best_score, :gameplays
end
