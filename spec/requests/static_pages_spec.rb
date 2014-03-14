require 'spec_helper'

describe "Static pages" do
  let!(:user) do
    FactoryGirl.create :user, name: "Yerbochłon", best_score: 123
  end

  before do
    FactoryGirl.create :user, name: "Zjerbolony358", best_score: 358
  end

  context "as a guest user" do
    before do
      visit "/"
    end

    it "shows sign in link" do
      expect(page).to have_content "Zaloguj się"
    end

    it "displays players ranking" do
      expect(page).to have_content "Yerbochłon"
      expect(page).to have_content "Zjerbolony358"
      expect(page).to have_content "123"
      expect(page).to have_content "358"
    end
  end

  context "as a logged in user" do
    before do
      sign_in user
      visit "/"
    end

    it "shows sign in link" do
      expect(page).to have_content "Witaj Yerbochłon"
      expect(page).to have_content "wyloguj się"
    end
  end
end