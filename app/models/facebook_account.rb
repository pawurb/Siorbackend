class FacebookAccount < ActiveRecord::Base
  belongs_to :user

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |account|
      account.provider = auth[:provider]
      account.uid = auth[:uid]
      account.name = auth[:info][:name]
      account.location = auth[:info][:location]
      account.set_birthday auth[:extra][:raw_info][:birthday]
      account.image_url = auth[:info][:image]
      account.oauth_token = auth[:credentials][:token]
      account.oauth_expires_at = Time.at(auth[:credentials][:expires_at])

      if account.user
        account.user.email = auth[:info][:email]
        account.user.save!
      else
        account.create_user!(email: auth[:info][:email])
      end

      account.save!
    end
  end

  def set_birthday string_date
    month, day, year = string_date.split("/")
    formatted_date = "#{year}-#{month}-#{day}"
    self.birthday = formatted_date
  end


end
