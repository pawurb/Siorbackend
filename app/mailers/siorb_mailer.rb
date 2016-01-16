class SiorbMailer < ActionMailer::Base
  default from: "Siorba gracz"

  def contact_message(message)
    @message = message
    mail to: Settings[:MAILER_RECIPIENT], subject: 'Siorb - gracz uważa że'
  end
end
