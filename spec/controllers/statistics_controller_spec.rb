require 'spec_helper'

describe StatisticsController do

  context "correct data sent" do
    let(:js_request_data) do
      {
        "statistic" =>
        {
          "score" => '123',
          "duration" => '60'
        }
      }
    end

    it "creates a new statictics data" do
      xhr :post, :create, js_request_data
      expect(response).to be_success
      statistic = Statistic.last
      expect(statistic.score).to eq 123
      expect(statistic.duration).to eq 60
      expect(statistic.ip).not_to be_nil
    end
  end

  context "invalid data sent" do
    let(:js_request_data) do
      {
        "statistic" =>
        {
          "score" => 'hakerka',
          "duration" => 'hakerka'
        }
      }
    end

    it "does not create invalid statistic and fails silently" do
      xhr :post, :create, js_request_data
      expect(response).to be_success
      expect(Statistic.last).to be_nil
    end
  end

end