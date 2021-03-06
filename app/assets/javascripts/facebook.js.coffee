window.fbAsyncInit = ->
  FB.init(appId: gon.facebook_id, cookie: true)

  permissions = "email"
  signInClicked = false

  $('#sign_out').click (e) ->
    FB.getLoginStatus (response) ->
      FB.logout() if response.authResponse
    true

  FB.Event.subscribe('edge.create', (response) ->
    console.log 'clicka lajka'
  )

  # pimp my siorb partial
  if localStorage.getItem('highScore') > 99 and !(localStorage.getItem('sharedOnFB') == 'true')
    $("#pimpMySiorb").html(JST["partials/pimpingOn"]({ title: "Odpicuj mi Siorba!" }));
    $('#pimpingOn').tooltip()
    $('#pimpingOn').on('click', ->
      $('.tooltip').hide()
    )
  else if localStorage.getItem('highScore') < 99 and !(localStorage.getItem('sharedOnFB') == 'true')
    $("#pimpMySiorb").html(JST["partials/pimpingOff"]({ title: "Zdobądź 100 pkt. żeby odblokować" }));
    $('#pimpingOff').tooltip()


  $("#shareButton").click ->
    FB.ui
      method: "feed"
      picture: "http://#{window.location.host}/assets/siorbIcon200.png"
      link: "https://siorb.dobreziele.pl"
      caption: "Grałeś już w Siorba?"
      description: "..."
    , (response) ->
      if response and response.post_id
        localStorage.setItem('sharedOnFB', true)
        alert('Odśwież stronę żeby nacieszyć się nową stylówą Siorbka :)')
      else
        false


