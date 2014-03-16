class ContactMessage

  include ActiveModel::Validations #indirect inheritance. can be multiple
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :content
  validates :content, presence: true
  validates :content, length: { maximum: 400 }


  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end
end
