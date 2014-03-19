class User < ActiveRecord::Base

  MAX_NICKNAME_LENGTH = 20

  RANDOM_NICKNAMES = %w{Yerbochłon}

  scope :for_ranking, lambda { order('best_score DESC').first(20) }

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :nickname, uniqueness: true
  validates :nickname, uniqueness: true
  validates :nickname, length: { maximum: MAX_NICKNAME_LENGTH }


  def update params
    if params["noturbusiness"]
      update_statistics params["noturbusiness"]
   elsif params["nickname"]
      update_nickname params["nickname"]
    else
      false
    end
  end

  def place_in_ranking
    User.where('best_score > ?', self.best_score).count + 1
  end


  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth[:provider]
      user.uid = auth[:uid]
      user.name = auth[:info][:name]
      user.email = auth[:info][:email]
      user.location = auth[:info][:location]
      user.set_birthday auth[:extra][:raw_info][:birthday]
      user.image_url = auth[:info][:image]
      user.oauth_token = auth[:credentials][:token]
      user.oauth_expires_at = Time.at(auth[:credentials][:expires_at])
      user.save!

      begin
        user.nickname = self.generate_initial_nickname
      end while !user.valid?

      user.save!
    end
  end

  def self.generate_initial_nickname
    core = RANDOM_NICKNAMES.sample
    digit = (1 + Random.rand(User.count + 1)).to_s
    "#{core}#{digit}"
  end

  def set_birthday string_date
    month, day, year = string_date.split("/")
    formatted_date = "#{year}-#{month}-#{day}"
    self.birthday = formatted_date
  end

  private

  def update_nickname nickname
    self.nickname = nickname
    self.save
  end

  def update_statistics score
    score = Integer(Base64.decode64(score))
    self.best_score = score if score > self.best_score
    self.gameplays += 1
    save

    rescue ArgumentError #score conversiton failure
      false
  end

end
