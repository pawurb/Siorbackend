class SiorbMailer < ActionMailer::Base
  default from: "Siorba gracz"

  def contact_message(message)
    @message = message
    mail to: ['p.urbanek89@gmail.com', 'info@dobreziele.pl'], subject: 'Siorb - gracz uważa że'
  end
end
