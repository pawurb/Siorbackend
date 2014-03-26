class UserSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :email, :name, :nickname, :best_score, :gameplays, :image_url, :location, :date, :birthday_date


  def birthday_date
    object.birthday.strftime("%e-%m-%y %H:%M")
  end
end
