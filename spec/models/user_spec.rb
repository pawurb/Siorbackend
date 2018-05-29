require 'spec_helper'

describe User do
  describe "structure" do
    it { should respond_to(:provider) }
    it { should respond_to(:uid) }
    it { should respond_to(:name) }
    it { should respond_to(:email) }
    it { should respond_to(:nickname) }
    it { should respond_to(:image_url) }
    it { should respond_to(:image_url) }
    it { should respond_to(:oauth_token) }
    it { should respond_to(:oauth_expires_at) }
    it { should respond_to(:best_score) }
    it { should respond_to(:gameplays) }
    it { should respond_to(:fb_nickname) }

    it { should_not respond_to(:birthday) }
    it { should_not respond_to(:location) }
  end

  describe "from_omniauth class method" do
    let(:omniauth_hash) do
     {
      :provider => 'facebook',
      :uid => '1234567',
      :info => {
        :nickname => 'jbloggs',
        :email => 'joe@bloggs.com',
        :name => 'Joe Bloggs',
        :first_name => 'Joe',
        :last_name => 'Bloggs',
        :image => 'http://graph.facebook.com/1234567/picture?type=square',
        :urls => { :Facebook => 'http://www.facebook.com/jbloggs' },
        :location => 'Palo Alto, California',
        :verified => true
      },
      :credentials => {
        :token => 'ABCDEF...',
        :expires_at => 1321747205,
        :expires => true
      },
      :extra => {
        :raw_info =>
        {
          :birthday => "04/26/1989"
        }
      }
    }
    end

    it "creates User with correct data values" do
      user = User.from_omniauth(omniauth_hash)
      expect(user.name).to eq 'Joe Bloggs'
      expect(user.fb_nickname).to eq 'jbloggs'
      expect(user.image_url).to eq 'http://graph.facebook.com/1234567/picture?type=square'
      expect(user.nickname).not_to be_nil
      expect(user.best_score).to eq 0
      expect(user.gameplays).to eq 0
    end
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
