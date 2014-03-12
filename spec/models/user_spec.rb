require 'spec_helper'

describe User do
  describe "structure" do
    it { should respond_to(:provider) }
    it { should respond_to(:uid) }
    it { should respond_to(:name) }
    it { should respond_to(:email) }
    it { should respond_to(:nickname) }
    it { should respond_to(:image_url) }
    it { should respond_to(:oauth_token) }
    it { should respond_to(:oauth_expires_at) }
    it { should respond_to(:best_score) }
    it { should respond_to(:gameplays) }
  end
end