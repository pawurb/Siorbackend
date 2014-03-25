require 'spec_helper'

describe User do
  describe "structure" do
    it { should_not respond_to(:provider) }
    it { should_not respond_to(:uid) }
    it { should_not respond_to(:oauth_token) }
    it { should_not respond_to(:oauth_expires_at) }
    it { should_not respond_to(:image_url) }

    it { should have_one(:facebook_account) }
    it { should have_one(:account) }

    it { should respond_to(:email) }
    it { should respond_to(:nickname) }
    it { should respond_to(:best_score) }
    it { should respond_to(:gameplays) }
  end

  describe "place in ranking method" do
    let!(:looser_user) do
      FactoryGirl.create :user, nickname: 'Siorbafan', best_score: 0
    end

    context "there is only one user" do
      it "he is the best of all" do
        expect(looser_user.place_in_ranking).to eq 1
      end
    end

    context "there are more users" do
      let!(:mid_user) do
        FactoryGirl.create :user, nickname: 'Yerbochłon' , best_score: 22
      end

      let!(:winner_user) do
        FactoryGirl.create :user, nickname: 'Yerbopij' , best_score: 23
      end

      it "gives each user correct place in the ranking" do
        expect(winner_user.place_in_ranking).to eq 1
        expect(mid_user.place_in_ranking).to eq 2
        expect(looser_user.place_in_ranking).to eq 3
      end

      describe "two users have the same score" do
        let!(:second_winner_user) do
          FactoryGirl.create :user, nickname: 'Yerbopijca' , best_score: 23
        end

        it "gives each user correct place in the ranking" do
          expect(winner_user.place_in_ranking).to eq 1
          expect(second_winner_user.place_in_ranking).to eq 1
          expect(mid_user.place_in_ranking).to eq 3
          expect(looser_user.place_in_ranking).to eq 4
        end
      end
    end
  end
end