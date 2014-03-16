class User < ActiveRecord::Base
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :nickname, uniqueness: true


  def update params
    if params["score"]
      update_statistics params["score"]
    elsif params["nickname"]
      update_attributes nickname: params["nickname"]
    else
      false
    end
  end


  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth[:provider]
      user.uid = auth[:uid]
      user.name = auth[:info][:name]
      user.email = auth[:info][:email]
      user.location = auth[:info][:location]
      user.image_url = auth[:info][:image]
      user.nickname = auth[:info][:nickname]
      user.best_score = 0
      user.gameplays = 0
      user.oauth_token = auth[:credentials][:token]
      user.oauth_expires_at = Time.at(auth[:credentials][:expires_at])
      user.save!
    end
  end

  private

  def update_statistics score
    score = Integer(score)
    self.best_score = score if score > self.best_score
    self.gameplays += 1
    save!

    rescue ArgumentError #score conversiton failure
      false
  end
end
