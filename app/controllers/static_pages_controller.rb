class StaticPagesController < ApplicationController
  def home
    gon.facebook_id = ENV['FACEBOOK_ID']
    @players = User.all
  end
end
