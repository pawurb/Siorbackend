FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "pablo#{n}@wp.pl"
    end
    sequence :nickname do |n|
      "nickname#{n}"
    end
  end
end
