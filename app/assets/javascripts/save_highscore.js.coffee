if gon.userLoggedIn
  console.log localStorage["highScore"]
  localStorage.setItem("highScore", gon.userHighscore)
  console.log localStorage["highScore"]

