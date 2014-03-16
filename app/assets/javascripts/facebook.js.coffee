jQuery ->
  # done in siorb.js code already
  # $('body').prepend('<div id="fb-root"></div>')
  # $.ajax
  #   url: "#{window.location.protocol}//connect.facebook.net/en_US/all.js"
  #   dataType: 'script'
  #   cache: true

window.fbAsyncInit = ->
  FB.init(appId: gon.facebook_id, cookie: true)

  permissions = "email, user_location, user_birthday"

  $('#sign_in').click (e) ->
    e.preventDefault()
    FB.login ((response) ->
      window.location = '/auth/facebook/callback' if response.authResponse),
      scope: permissions

  $('#sign_out').click (e) ->
    FB.getLoginStatus (response) ->
      FB.logout() if response.authResponse
    true