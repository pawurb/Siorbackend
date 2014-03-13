FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "pablo#{n}@wp.pl"
    end
    sequence :name do |n|
      "Pablo #{n}"
    end
  end
end
