class ContactMessage

  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  MAX_CONTENT_LENGTH = 140

  attr_accessor :content

  validates :content, presence: true
  validates :content, length: { maximum: MAX_CONTENT_LENGTH }


  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end
end
