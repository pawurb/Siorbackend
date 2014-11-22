#contact form stuff
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
  $('.js-mushrooms-ad').tooltip({placement: 'right'})
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
    $(".pagination").html "Ładowanie..."
    $.getScript @href
    false)

  #cookie disclaimer footer
  unless localStorage.getItem('cookiesConfirm2') == 'true'
    $('#main-content').after(JST["partials/cookieInfo"]({ name: "Sam" }));

  #cookie confirmation click
  $('#cookies-all-right').on('click', ->
    $('#footer').slideUp()
    localStorage.setItem('cookiesConfirm2', 'true')
  )



