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
      }
    }
    end

    it "creates User with correct data values" do
      user = User.from_omniauth(omniauth_hash)
      expect(user.name).to eq 'Joe Bloggs'
      expect(user.location).to eq 'Palo Alto, California'
      expect(user.image_url).to eq 'http://graph.facebook.com/1234567/picture?type=square'
      expect(user.nickname).to eq 'jbloggs'
      expect(user.best_score).to eq 0
      expect(user.gameplays).to eq 0
    end
  end
end