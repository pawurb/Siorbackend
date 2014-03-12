class StaticPagesController < ApplicationController
  def home
    gon.facebook_id = ENV['FACEBOOK_ID']
  end
end
