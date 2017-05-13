class Comment < ActiveRecord::Base
  validates :content, presence: true
  scope :approved, -> {
    where(approved: true).order(created_at: :desc)
  }
end
