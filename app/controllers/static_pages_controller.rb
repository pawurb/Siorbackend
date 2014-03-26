class StaticPagesController < ApplicationController
  def home
    gon.facebook_id = ENV['FACEBOOK_ID']
    set_highscore_data if current_user

    @players = User.for_ranking(params[:page])
  end

  private

  def set_highscore_data
    gon.userLoggedIn = true
    gon.userHighscore = current_user.best_score
  end
end
