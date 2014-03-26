FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "pablo#{n}@wp.pl"
    end
    sequence :name do |n|
      "Pablo #{n}"
    end
    sequence :nickname do |n|
      "nickname#{n}"
    end
    location 'Koluszki'
  end
end
