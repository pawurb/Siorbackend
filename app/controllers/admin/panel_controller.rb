class Admin::PanelController < ApplicationController
  http_basic_authenticate_with name: Settings[:ADMIN_LOGIN], password: Settings[:ADMIN_PASSWORD]

  layout 'admin'

  def home
    gon.admin_login = Settings[:ADMIN_LOGIN]
    gon.admin_password = Settings[:ADMIN_PASSWORD]
  end

  def users
  end

  def statistics
  end
end
