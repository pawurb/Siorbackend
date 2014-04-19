jQuery ->
  # done in siorb.js code already
  # $('body').prepend('<div id="fb-root"></div>')
  # $.ajax
  #   url: "#{window.location.protocol}//connect.facebook.net/en_US/all.js"
  #   dataType: 'script'
  #   cache: true

window.fbAsyncInit = ->
  FB.init(appId: gon.facebook_id, cookie: true)

  permissions = "email"
  signInClicked = false

  $('#sign_in').click (e) ->
    e.preventDefault()

    #prevent multiple clicking
    unless signInClicked
      signInClicked = true

      #handle canceling login
      setTimeout ->
        signInClicked = false
      , 3000

      FB.login ((response) ->
        window.location = '/auth/facebook/callback' if response.authResponse),
        scope: permissions

  $('#sign_out').click (e) ->
    FB.getLoginStatus (response) ->
      FB.logout() if response.authResponse
    true


  FB.Event.subscribe('edge.create', (response) ->
    console.log 'clicka lajka'
  )

  $(".share-button").click ->
    FB.ui
      method: "feed"
      redirect_uri: 'www.wp.pl'
      picture: "http://#{window.location.host}/assets/siorbIcon200.png"
      link: "http://siorb.dobreziele.pl"
      caption: "A czy ty grałeś już w Siorba?"
    , (response) ->
      if response is null
        false
        window.alert('Nie to nie...')
      else
        $('.share-image').fadeOut('slow')
        localStorage.setItem('sharedOnFB', true)
        window.alert('Dzięki!')


