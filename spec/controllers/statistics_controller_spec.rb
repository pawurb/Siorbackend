require 'spec_helper'

describe StatisticsController do

  describe "create statistics data" do
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

    context "omnious data sent" do
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

  describe "get statistics json data" do
    context "as a guest user" do
      it "does not allow access" do
        xhr :get, :index
        response.status.should eq 401
      end
    end

    context "as an admin user" do
      before do
        http_basic_admin_login
      end

      let!(:statistic) do
        FactoryGirl.create :statistic
      end

      it "responds with correct data" do
        xhr :get, :index
        response.status.should eq 200
        json = JSON.parse(response.body)["statistics"]
        expect(json.size).to eq 1
        expect(json.last["id"]).to eq statistic.id
        expect(json.last["duration"]).to eq statistic.duration
        expect(json.last["score"]).to eq statistic.score
        expect(json.last["ip"]).to eq statistic.ip

        date = statistic.created_at.strftime("%e-%m-%y %H:%M")
        expect(json.last["date"]).to eq date
      end
    end
  end
end