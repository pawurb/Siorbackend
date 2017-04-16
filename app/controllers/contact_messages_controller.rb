class ContactMessagesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    @message = ContactMessage.new params.fetch(:contact_message)
    @sent = if @message.valid?
      send_message(@message.content)
      Comment(content: @message.content)
      true
    else
      false
    end

    respond_to do |format|
      format.js
    end
  end

  private

  def send_message(content)
    message_content = "Siorba gracz uważa że: #{content}"
    notifier = Slack::Notifier.new ENV.fetch("SLACK_WEBHOOK") do
      defaults username: 'Siorb', channel: '#tracky'
    end

    notifier.ping Slack::Notifier::LinkFormatter.format(message_content), icon_emoji: ":goat:"
  end
end
