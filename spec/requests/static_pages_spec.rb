require 'spec_helper'

describe "Static pages" do
  let!(:user) do
    FactoryGirl.create :user, name: "Pablo", best_score: 123
  end

  before do
    FactoryGirl.create :user, name: "Pueblo", best_score: 358
  end

  context "as a guest user" do
    before do
      visit "/"
    end

    it "shows sign in link" do
      expect(page).to have_content "Zaloguj się"
    end

    it "displays players ranking" do
      expect(page).to have_content "Pablo"
      expect(page).to have_content "Pueblo"
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

    it "shows sign in link" do
      expect(page).to have_content "Witaj Pablo"
      expect(page).to have_content "wyloguj się"
    end

    it "shows nickname field" do
      expect(page).to have_content "Twój nickname"
    end

    describe "changing the nickname" do
      it "can change the nickname using form" do
        fill_in :user_nickname, with: 'Yerbochłon'
        click_button 'Zmień nickname'
        expect(user.nickname).to eq 'Yerbochłon'
      end
    end
  end
end