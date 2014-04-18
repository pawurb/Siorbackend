class SiorbMailer < ActionMailer::Base
  default from: "Siorba gracz"

  def contact_message(message)
    @message = message
    mail to: 123, subject: 'Siorb - gracz uważa że'
  end
end
