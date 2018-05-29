class User < ActiveRecord::Base

  MAX_NICKNAME_LENGTH = 15

  RANDOM_NICKNAMES = %w{Yerbochłon Nayerbany Siorbacz}

  #model should not be responsible for pagination logic...
  scope :for_ranking, lambda { |page| order('best_score DESC').paginate(per_page: 10, page: page, total_entries: 50) }

  scope :for_admin, lambda { order('updated_at DESC').all }

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

  def self.from_omniauth(auth)
    params = ActiveSupport::HashWithIndifferentAccess.new(auth)
    Rails.logger.error auth
    where(params.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = params[:provider]
      user.uid = params[:uid]
      user.name = params[:info][:name]
      user.fb_nickname = params[:info][:nickname]
      user.email = params[:info][:email]

      user.oauth_token = params[:credentials][:token]
      user.oauth_expires_at = Time.at(params[:credentials][:expires_at])
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
