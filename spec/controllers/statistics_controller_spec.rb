require 'spec_helper'

describe StatisticsController do
  let(:js_request_data) do
    {
      "statistic" =>
      {
        "score" => '123',
        "duration" => '60'
      }
    }
  end

  context "as a guest user" do
    it "creates a new statictics data" do
      xhr :post, :create, js_request_data
      expect(response.status).to be_success
      statistic = Statistic.last
      expect(statistic.score).to eq 123
      expect(statistic.duration).to eq 60
    end
  end

end