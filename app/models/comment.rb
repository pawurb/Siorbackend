class Comment < ActiveRecord::Base
  validates :content, presence: true
  scope :approved, -> {
    where(approved: true)
  }
end
