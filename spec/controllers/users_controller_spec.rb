require 'spec_helper'

describe UsersController do
  let(:js_request_data) do
    {
      "user" =>
      {
        "noturbusiness" => Base64.encode64('124')
      }
    }
  end

  context "as a guest user" do
    describe "update action" do
      it "does not allow access" do
        xhr :put, :update, js_request_data
        response.status.should eq 403
      end
    end

    describe "get users json data" do
      it "does not allow access" do
        xhr :get, :index
        response.status.should eq 401
      end
    end

    describe "delete action" do
      it "does not allow access" do
        xhr :delete, :destroy, id: 2
        response.status.should eq 401
      end
    end
  end

  context "as an admin user" do
    let!(:user) do
      FactoryGirl.create :user
    end

    before do
      http_basic_admin_login
    end

    it "responds with correct data" do
      xhr :get, :index
      response.status.should eq 200
      json = JSON.parse(response.body)["users"]
      expect(json.size).to eq 1
      expect(json.last["id"]).to eq user.id
      expect(json.last["name"]).to eq user.name
      expect(json.last["email"]).to eq user.email
      expect(json.last["nickname"]).to eq user.nickname
      expect(json.last["best_score"]).to eq user.best_score
      expect(json.last["gameplays"]).to eq user.gameplays
      expect(json.last["image_url"]).to eq user.image_url
      expect(json.last["location"]).to eq user.location
    end

    describe "delete action" do
      it "deletes the target user" do
        xhr :delete, :destroy, id: user.id
        expect(User.find_by(id: user.id)).to be_nil
      end
    end
  end

  context "as logged in user" do
    let(:user) do
      FactoryGirl.create :user, best_score: 123, gameplays: 5
    end

    before do
      sign_in user
    end

    it "posting score updates user statictics" do
      xhr :put, :update, js_request_data
      user.gameplays.should eq 6
      user.best_score.should eq 124
    end

    it "posting wrong score format does not update user statistics" do
      xhr :put, :update, { "user" => { "noturbusiness" => 'miliard'} }
      user.gameplays.should eq 5
      user.best_score.should eq 123
      xhr :put, :update, { "user" => { "noturbusiness" => '500'} }
      user.gameplays.should eq 5
      user.best_score.should eq 123
    end

    describe "delete action" do
      it "does not allow access" do
        xhr :delete, :destroy, id: 2
        response.status.should eq 401
      end
    end
  end
end