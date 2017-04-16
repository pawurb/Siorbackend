require 'spec_helper'

describe "Static pages" do
  let!(:user) do
    FactoryGirl.create :user, name: "Pablo", best_score: 123, nickname: "Poyerbany"
  end

  before do
    FactoryGirl.create :user, name: "Pueblo", best_score: 358, nickname: "Poyerbany22"
  end

  context "as a guest user" do
    before do
      visit "/"
    end

    it "shows sign in link" do
      expect(page).to have_content "Zaloguj się"
    end

    it "displays players ranking" do
      expect(page).to have_content "Poyerbany"
      expect(page).to have_content "Poyerbany22"
      expect(page).to have_content "123"
      expect(page).to have_content "358"
    end

    it "does not show player nickname" do
      expect(page).not_to have_content "Twój nickname"
    end
  end

  context "as a logged in user" do
    before do
      sign_in user
      visit "/"
    end

    it "displays user info" do
      expect(page).to have_content "Witaj Pablo"
      expect(page).to have_content "wyloguj się"
      expect(page).to have_content "miejsce"
      expect(page).to have_content "Twoje miejsce w rankingu: 2"

    end

    it "shows nickname field" do
      expect(page).to have_content "Nickname"
    end
  end
end
