class ContactMessagesController < ApplicationController
  def create
    @message = ContactMessage.new params[:contact_message]
    SiorbMailer.contact_message(@message).deliver

    respond_to do |format|
      format.js
    end
  end
end
