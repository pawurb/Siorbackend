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
    it "does not allow access" do
      xhr :put, :update, js_request_data
      response.status.should eq 403
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
  end
end