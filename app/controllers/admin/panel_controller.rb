class Admin::PanelController < ApplicationController
  http_basic_authenticate_with name: ENV['ADMIN_LOGIN'], password: ENV['ADMIN_PASSWORD']

  layout 'admin'

  def home
    gon.admin_login = ENV['ADMIN_LOGIN']
    gon.admin_password = ENV['ADMIN_PASSWORD']
  end

  def users
  end

  def statistics
  end
end
