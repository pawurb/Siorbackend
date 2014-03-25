class User < ActiveRecord::Base

  MAX_NICKNAME_LENGTH = 15

  RANDOM_NICKNAMES = %w{Yerbochłon}

  scope :for_ranking, lambda { order('best_score DESC').first(20) }

  has_one :account
  has_one :facebook_account

  after_create :generate_initial_nickname

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :nickname, presence: true, on: :update
  validates :nickname, uniqueness: true, on: :update
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



  def generate_initial_nickname
    begin
      self.nickname = User.random_nickname
    end while !self.valid?

    self.save!
  end

  def self.random_nickname
    core = RANDOM_NICKNAMES.sample
    digit = (1 + Random.rand(User.count + 1)).to_s
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
