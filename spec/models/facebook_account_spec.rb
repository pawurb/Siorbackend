require 'spec_helper'

describe FacebookAccount do
  describe "structure" do
    it { should respond_to(:provider) }
    it { should respond_to(:uid) }
    it { should respond_to(:location) }
    it { should respond_to(:birthday) }
    it { should respond_to(:image_url) }
    it { should respond_to(:oauth_token) }
    it { should respond_to(:oauth_expires_at) }
    it { should respond_to(:name) }

    it { should belong_to(:user) }

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

    context "user was not previously registered" do
      it "creates FacebookAccount and corresponding User with correct data values" do
        fb_account = FacebookAccount.from_omniauth(omniauth_hash)
        user = fb_account.user
        expect(fb_account.birthday).to eq "26/04/1989".to_datetime
        expect(fb_account.location).to eq 'Palo Alto, California'
        expect(fb_account.image_url).to eq 'http://graph.facebook.com/1234567/picture?type=square'
        expect(fb_account.name).to eq 'Joe Bloggs'

        expect(user.nickname).not_to be_nil
        expect(user.email).to eq 'joe@bloggs.com'
        expect(user.best_score).to eq 0
        expect(user.gameplays).to eq 0
      end
    end

    context "user has already had a non facebook account" do

    end
  end
end