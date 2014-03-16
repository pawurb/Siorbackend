class ContactMessage

  include ActiveModel::Validations #indirect inheritance. can be multiple
  include ActiveModel::Conversion
  extend ActiveModel::Naming


  #walidacje
  # validates :email, :content, :author, presence: true
  # validates :email, format: { with: VALID_EMAIL_REGEX } # obiekt klasy Regexp
  # validates :content, length: { maximum: 400 }
  # validates :author, length: { maximum: 30 }


  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end
end
