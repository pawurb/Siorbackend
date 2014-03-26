# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

messageSentInfo = "<span class='contact-form-info'>Twoja wiadomość została wysłana</span>"
contactForm = '#contact-message form'
contactFormInfo = '.contact-form-info'
contactFormBtn = '.contact-form-btn'

showMessageSentInfo = ->
  $(contactFormBtn).after(messageSentInfo)
  $(contactFormInfo).hide().slideDown('slow')
  setTimeout ->
    $(contactFormInfo).slideUp('slow')
  , 1500


jQuery ->
  $(contactForm).hide()
  $(contactFormInfo).hide()

  $(contactFormBtn).on('click', ->
    $(contactForm).slideToggle()
  )

  $("#{contactForm} .submit").on('click', ->
    $(contactForm).slideUp()
  )

  $(contactForm).on('submit', showMessageSentInfo)


  # ajax pagination
  $(document).on('click', '.pagination a', ->
    $(".pagination").html "Ładowanie"
    $.getScript @href
    false)

  return
