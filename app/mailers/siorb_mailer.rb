class SiorbMailer < ActionMailer::Base
  default from: "Siorba gracz"

  def contact_message(message)
    @message = message
    mail to: ENV['MAILER_RECIPIENT'], subject: 'Siorb - gracz uważa że'
  end
end
