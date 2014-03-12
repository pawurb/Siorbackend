jQuery ->
  # done in siorb js code already

  # $('body').prepend('<div id="fb-root"></div>')

  # $.ajax
  #   url: "#{window.location.protocol}//connect.facebook.net/en_US/all.js"
  #   dataType: 'script'
  #   cache: true


window.fbAsyncInit = ->
  FB.init(appId: '649603845076570', cookie: true)

  $('#sign_in').click (e) ->
    e.preventDefault()
    FB.login ((response) ->
      window.location = '/auth/facebook/callback' if response.authResponse),
      scope: "email,user_events,user_location,user_birthday"

  $('#sign_out').click (e) ->
    FB.getLoginStatus (response) ->
      FB.logout() if response.authResponse
    true