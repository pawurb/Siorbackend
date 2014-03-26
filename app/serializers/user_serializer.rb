class UserSerializer < ActiveModel::Serializer
  include ::SerializerDateFormatter

  attributes :id, :email, :name, :nickname, :best_score, :gameplays, :image_url, :location, :date, :birthday_date


  def birthday_date
    if object.birthday
      object.birthday.strftime("%e-%m-%Y")
    else
      nil
    end
  end
end
