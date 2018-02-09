class StaticPagesController < ApplicationController
  def home
    gon.facebook_id = ENV['FACEBOOK_ID']
    set_highscore_data if current_user

    @players = User.for_ranking(params[:page])
    @comments = Comment.approved
    @description = "Najbardziej zyerbolona gra w internecie! Pijesz nałogowo Yerba Mate? Pij ją nadal, graj w Siorba, zdobywaj listkowe punkty i baw się zdrowo. Szybkości nada Ci Turbo Guarana, a Grzybek Lucynek przeniesie w inny wymiar. Zagraj!"
    @title = "Siorb - Droga do Rozbudzenia; Gra Yerba Mate, Sklep Dobre Ziele Kraków"
  end

  private

  def set_highscore_data
    gon.userLoggedIn = true
    gon.userHighscore = current_user.best_score
  end
end
