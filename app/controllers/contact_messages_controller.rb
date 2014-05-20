class ContactMessagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @message = ContactMessage.new params[:contact_message]

    @sent = if @message.valid?
      SiorbMailer.contact_message(@message).deliver
      true
    else
      false
    end

    respond_to do |format|
      format.js
    end
  end
end
