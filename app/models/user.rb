class User < ActiveRecord::Base

  MAX_NICKNAME_LENGTH = 15

  RANDOM_NICKNAMES = %w{Yerbochłon Nayerbany Siorbacz}

  scope :for_ranking, lambda { |page| paginate(per_page: 10, page: page).order('best_score DESC') }

  validates :email, uniqueness: true, allow_blank: true
  validates :nickname, presence: true, on: :update
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

  def self.from_omniauth(auth, ip)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth[:provider]
      user.uid = auth[:uid]
      user.name = auth[:info][:name]
      user.email = auth[:info][:email]
      user.ip = ip

      user.image_url = auth[:info][:image]
      user.oauth_token = auth[:credentials][:token]
      user.oauth_expires_at = Time.at(auth[:credentials][:expires_at])
      user.save!

      user.generate_initial_nickname if user.nickname.nil?
    end
  end

  def generate_initial_nickname
    begin
      self.nickname = User.random_nickname
    end while !self.valid?

    self.save!
  end

  def self.random_nickname
    core = RANDOM_NICKNAMES.sample
    digit = (1 + Random.rand(User.count + 500)).to_s
    "#{core}#{digit}"
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
