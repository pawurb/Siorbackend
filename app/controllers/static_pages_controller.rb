class StaticPagesController < ApplicationController
  def home
    gon.facebook_id = ENV['FACEBOOK_ID']
    @players = User.all.sort_by(&:best_score)
  end
end
