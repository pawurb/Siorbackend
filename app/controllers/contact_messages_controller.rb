class ContactMessagesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    @message = ContactMessage.new params.fetch(:contact_message)
    @sent = if @message.valid?
      Comment.create(content: @message.content)
      true
    else
      false
    end

    respond_to do |format|
      format.js
    end
  end
end
