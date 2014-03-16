# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

messageSentInfo = "<span class='contact-form-info'>Twoja wiadomość została wysłana</span>"

jQuery ->
  contactForm = '#contact-message form'
  contactFormInfo = '.contact-form-info'
  contactFormBtn = '.contact-form-btn'
  $(contactForm).hide()
  $('.contact-form-info').hide()
  $('.contact-form-btn').on('click', ->
    console.log 'dupa'
    $(contactForm).slideToggle()
  )

  $("#{contactForm} .submit").on('click', ->
    $(contactForm).slideUp()
  )

  $(contactForm).on('submit', ->
    $(contactFormBtn).after(messageSentInfo)
    $(contactFormInfo).hide().slideDown('slow')
    setTimeout ->
      $(contactFormInfo).slideUp('slow')
      setTimeout ->
        $(contactFormInfo).remove()
      , 1000
    , 1500
  )

