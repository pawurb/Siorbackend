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

  $(".share-button-off").click -> # TODO turn on
    FB.ui
      method: "feed"
      picture: "http://#{window.location.host}/assets/siorbIcon200.png"
      link: "http://siorb.dobreziele.pl"
      caption: "Grałeś już w Siorba?"
      description: "..."
    , (response) ->
      if response is null
        false
      else
        $('.share-image').fadeOut('slow')
        localStorage.setItem('sharedOnFB', true)


