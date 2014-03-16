class SiorbMailer < ActionMailer::Base
  default from: "Siorba gracz"

  def contact_message(message)
    @message = message
    mail to: "p.urbanek89@gmail.com", subject: 'Siorb - gracz uważa że'
  end
end
