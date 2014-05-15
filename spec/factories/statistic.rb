FactoryGirl.define do
  factory :statistic do
    sequence :score do |n|
      n
    end
    sequence :duration do |n|
      n
    end
    sequence :ip do |n|
      "192.168.0.#{n}"
    end
    city 'Kraków'
  end
end
