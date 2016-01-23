class ContactMessagesController < ApplicationController
  def create
    @message = ContactMessage.new params.fetch(:contact_message)
    @sent = if @message.valid?
      send_message(@message.content)
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
    notifier = Slack::Notifier.new ENV.fetch("SLACK_WEBHOOK")
    notifier.username = "Slacker"
    notifier.channel = '#slacker'
    notifier.ping Slack::Notifier::LinkFormatter.format(message_content), icon_emoji: ":goat:"
  end
end
