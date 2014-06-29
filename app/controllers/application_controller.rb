class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :detect_device_format


  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def authenticate_user!
    unless current_user
      render text: "Access denied", status: 403
    end
  end

  def detect_device_format
    mobile_devices = /Mobile|webOS|iPad|iPhone|Android|Windows Phone/
    request.variant = :mobile if request.user_agent =~ mobile_devices
  end

  helper_method :current_user
end
