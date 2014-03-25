require 'spec_helper'

describe Account do
  describe "structure" do
    it { should respond_to(:password_digest) }
    it { should belong_to(:user) }
  end
end
