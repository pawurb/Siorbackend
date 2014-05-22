require 'spec_helper'

describe API::StatisticsController do
  let(:js_request_data) do
    {
      "statistic" =>
      {
        "score" => '123',
        "duration" => '60'
      }
    }
  end

  describe "create statistics data" do
    context "correct data sent" do
      it "creates a new statictics data" do
        xhr :post, :create, js_request_data
        expect(response).to be_success
        statistic = Statistic.last
        expect(statistic.score).to eq 123
        expect(statistic.duration).to eq 60
        expect(statistic.ip).not_to be_nil
        expect(statistic.city).to eq '...'
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
        expect(response.status).to eq 401
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
        expect(response.status).to eq 200
        json = JSON.parse(response.body)["statistics"]
        expect(json.size).to eq 1
        expect(json.last["id"]).to eq statistic.id
        expect(json.last["duration"]).to eq statistic.duration
        expect(json.last["score"]).to eq statistic.score
        expect(json.last["ip"]).to eq statistic.ip
        expect(json.last["city"]).to eq statistic.city

        date = statistic.created_at.strftime("%e-%m-%y %H:%M")
        expect(json.last["created_at_txt"]).to eq date
        expect(json.last["created_at_unix"]).to eq statistic.created_at.to_i
      end

      describe "delete action" do
        it "deletes the target stat" do
          xhr :delete, :destroy, id: statistic.id
          expect(Statistic.find_by(id: statistic.id)).to be_nil
        end
      end
    end
  end

  describe  "get uniq ip's count" do
    before do
      http_basic_admin_login
    end

    context "there are no statistics" do
      it "returns correct uniq ip's count" do
        xhr :get, :uniq_count
        expect(response.status).to eq 200
        json = JSON.parse(response.body)["count"]
        expect(json).to eq 0
      end
    end

    context "there are some statistics" do
      before do
        3.times do
          xhr :post, :create, js_request_data
        end
      end

      it "returns correct uniq ip's count" do
        xhr :get, :uniq_count
        expect(response.status).to eq 200
        json = JSON.parse(response.body)["count"]
        expect(json).to eq 1
      end
    end
  end
end