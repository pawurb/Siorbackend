/* Copyright (c) 2014 Paweł Urbanek. All rights reserved. */(function(){window.Utils={rand:function(t,e){var a;return null==e&&(e=t,t=0),a=e-t,Math.floor(Math.random()*a+t)}},window.Game={host:"http://"+window.location.host+"/assets",initialFloatSpeed:4,mediumFloatSpeed:5,victoryFloatSpeed:6,mode:"easy",mediumScore:16,hardScore:90,victoryScore:100,scorePenalty:8,score:0,width:800,height:420,window:null,scene:null,assets:null,firstMainMenu:!0,speedUpDuration:7300,mushroomDuration:13600,defaultLeafProbability:.79,defaultGuaranaProbability:.84,defaultMrsCoffeeProbability:.91,defaultMrHotProbability:.97,defaultMushroomProbability:1.01,victory:!1,muted:"true"===localStorage.getItem("muted")?!0:!1,volume:.5,timeouts:{slowDown1:null,slowDown2:null,speedAnimation:null},platformSizes:{current:null,easy:[150,150,200,200,250],medium:[100,150,150,150,200],hard:[75,100,150,150,150]},start:function(){return Crafty.init(this.width,this.height,"game"),this.setBindings(),Crafty.e("AudioManager"),Crafty.e("BlackMaskManager"),localStorage.getItem("highScore")||localStorage.setItem("highScore",0),Crafty.trigger("Game:initialized"),this.runScene.mainMenu()},runScene:{mainMenu:function(){return Crafty.assets=[],Crafty.load(Game.assets.mainMenuList(),function(){return Game.assets.loadMainMenu(),Crafty.scene("MainMenu")})},gameplay:function(){return Crafty.assets=[],Crafty.load(Game.assets.gameplayList(),function(){return Game.assets.loadGameplay(),Crafty.scene("Gameplay")})},gameOver:function(){return Crafty.scene("GameOver")},instruction:function(){return Crafty.load(Game.assets.instructionList(),function(){return Game.assets.loadInstruction(),Crafty.scene("Instruction")})},authors:function(){return Crafty.load(Game.assets.authorsList(),function(){return Game.assets.loadAuthors(),Crafty.scene("Authors")})}},setBindings:function(){return $(document).bind("keyup",function(t){return 80===t.keyCode?Crafty.pause():void 0})},submitScore:function(t){var e;return e=btoa(parseInt(t)),$.ajax({url:"/user?user[noturbusiness]="+e,type:"PUT"})},gameplayStarted:null},Crafty.scene("Authors",function(){var t,e,a;return Game.scene="Authors",Crafty.e("SoundButton"),Crafty.background("url('"+Game.host+"/images/mainMenuBg.png')"),Crafty.e("LogoButton"),Crafty.e("ReturnButton"),e=120,a=60,t=330,Crafty.e("Base, aut_boss_text").at(t,e),Crafty.e("ButtonWithLink").addLink("http://www.dobreziele.pl","autBossLogo.png","Dobre Ziele").at(t+140,e-20),Crafty.e("Base, aut_pablo_text").at(t,e+a),Crafty.e("ButtonWithLink").addLink("http://www.github.com/pawurb","autPabloLogo.png","GitHub").at(t+225,e+40),Crafty.e("Base, aut_cebula_text").at(t,e+2*a),Crafty.e("ButtonWithLink").addLink("http://www.digart.pl/","autCebulaLogo.png","DigArt").at(t+160,e+75),Crafty.e("Base, aut_music_text").at(t,e+3*a),Crafty.e("Base, aut_mailbox").at(t,e+4*a)},function(){return Crafty("Recyclable").destroy()}),Crafty.scene("GameOver",function(){var t,e,a,r;return Game.scene="GameOver",Crafty.background("url('"+Game.host+"/images/gameOverBg.png')"),Crafty.viewport.y=0,Crafty.trigger("Game:gameOverStarted"),Crafty.e("GameOverShortcuts"),Game.score>parseInt(localStorage.getItem("highScore"))&&localStorage.setItem("highScore",Game.score),Game.submitScore(Game.score),a=24,Crafty.e("PixelScoreBoard").displayAt(a+205,Game.height-3*a,"current"),Crafty.e("Base, gOpunkty_button").at(a,Game.height-3*a),Crafty.e("Base, gOrekord_button").at(a,Game.height-2*a),Crafty.e("PixelScoreBoard").displayAt(a+144,Game.height-2*a,"top"),t=220,r=Crafty.e("Button, jeszcze_button"),r.at(Game.width-a-t,Game.height-3*a),$(r._element).on("click",function(){return Game.victory?window.location.reload():Game.runScene.gameplay()}),e=Crafty.e("Button, menu_button"),e.at(Game.width-a-t,Game.height-2*a),$(e._element).on("click",function(){return window.location.reload()}),Crafty.e("GameOverAd")},function(){return Crafty("Recyclable").destroy()}),Crafty.scene("Gameplay",function(){var t,e,a;return t=function(){var t,e,a,r,n,i,o,s;for(Game.platformSizes.current=Game.platformSizes.easy,a=[[1,0,1,2,0,0,3,4,1,2,3],[5,1,0,2,0,5,3,0,3,5,4],[0,1,2,4,0,5,0,2,3,0,1],[0,2,1,2,0,4,1,3,2,5,4]],r=a[Utils.rand(0,a.length)],s=[],t=o=0;10>=o;t=++o)e=r[t],i=200+(Game.height-Game.height/5*e-20),n=Game.width/5*t,s.push(Crafty.e("Platform").at(n,i));return s},e=function(){return Game.victory=!1,Game.mode="easy",Game.floatSpeed=Game.initialFloatSpeed,Game.defaultFloatSpeed=Game.initialFloatSpeed,Game.leafProbability=Game.defaultLeafProbability,Game.guaranaProbability=Game.defaultGuaranaProbability,Game.mrsCoffeeProbability=Game.defaultMrsCoffeeProbability,Game.mrHotProbability=Game.defaultMrHotProbability,Game.mushroomProbability=Game.defaultMushroomProbability},e(),Crafty.trigger("Game:gameplayStarted"),Game.scene="Gameplay",Game.score=0,Crafty.background(""),Game.window=document.getElementById("game"),Game.window.style.backgroundPositionY="0px",Game.runner=Crafty.e("Runner"),Game.view=Crafty.viewport,t(),Crafty.e("BackgroundManager"),a=Crafty.e("GameplayShortcuts"),Crafty.e("ScoreBoard"),Crafty.e("ManaMeter"),Crafty.e("GameObserver"),Crafty.e("RunnerKiller"),Crafty.pause(),setTimeout(function(){return Crafty.pause(),Crafty.trigger("Runner:saysSomething")},1e3)},function(){return $("#game").unbind("click"),Crafty("Recyclable").destroy()}),Crafty.scene("Instruction",function(){return Game.scene="Instruction",Crafty.e("SoundButton"),Crafty.background("url('"+Game.host+"/images/mainMenuBg.png')"),Crafty.e("InstructionField"),Crafty.e("LogoButton"),Crafty.e("ReturnButton")},function(){return Crafty("Recyclable").destroy()}),Crafty.scene("MainMenu",function(){var t,e,a,r,n;return Game.scene="MainMenu",Game.firstMainMenu=!1,Crafty.viewport.y=0,a=200,e=60,n=Crafty.e("Button, start_button").at(485,a),r=Crafty.e("Button, instrukcja_button").at(492,a+e),t=Crafty.e("Button, tworcy_button").at(526,a+2*e),Crafty.e("Base, rekord_button").at(Game.width-210,Game.height-30),Crafty.e("Base, leaves_image").at(429,90),Crafty.e("RunnerImage").at(544,90),Crafty.e("RunnerFace").at(544,90),Crafty.background("url('"+Game.host+"/images/mainMenuBg.png')"),Crafty.e("PixelScoreBoard").displayAt(740,390,"top"),Crafty.e("SoundButton"),Crafty.e("LogoButton"),Game.firstMainMenu||Crafty.e("FBLikeButton"),jQuery(function(){var e,a,i;return i=!1,$(n._element).on("click",function(){return i?void 0:(n.sprite(0,1),i=!0,Game.runScene.gameplay())}),a=!1,$(r._element).on("click",function(){return a?void 0:(a=!0,Game.runScene.instruction())}),e=!1,$(t._element).on("click",function(){return e?void 0:(e=!0,Game.runScene.authors())})})},function(){return Crafty("Recyclable").destroy()}),Game.assets={imagesPath:""+Game.host+"/images/",soundsPath:""+Game.host+"/sounds/",gameplayImages:["psychoVisionBg.jpg","face.png","guarana.png","mushroom.png","leaf.png","manaMeter.png","mrsCoffee.png","mrHot.png","blush.png","sayings.png","cloud.png","discoText.png","tworcyT.png","jeszczeRazT.png","menuT.png","gameOverBg.png","gOrekordT.png","gOpunktyT.png"],mainMenuImages:["mainMenuBg.png","mainMenuLeaves.png","instrukcjaT.png","tworcyT.png","startT.png","rekordT.png","runner.png","face.png","digits.png","sound.png","powrotButton.png"],instructionImages:["arrowL.png","arrowR.png"],authorsImages:["autCebulaText.png","autBossText.png","autPabloText.png","autMusicText.png"],mainMenuSounds:["mainMenu.mp3"],gameplaySounds:["gameplay.ogg","gameplay.mp3","gameOver.mp3","gameOver.ogg","mushroomBeat.ogg","mushroomBeat.mp3","mushroomCollect.ogg","mushroomCollect.mp3","guaranaBeat.ogg","guaranaBeat.mp3","jumpSound.ogg","jumpSound.mp3","leafSound.ogg","leafSound.mp3","burnSound.ogg","burnSound.mp3","coffeeEndSound.ogg","coffeeEndSound.mp3","coffeeStartSound.ogg","coffeeStartSound.mp3","victoryBeat.ogg","victoryBeat.mp3","guaranaCollect.ogg","guaranaCollect.mp3"],loadGameplay:function(){return Crafty.audio.add({gameplay:[""+this.soundsPath+"gameplay.ogg",""+this.soundsPath+"gameplay.mp3"],gameOver:[""+this.soundsPath+"gameOver.ogg",""+this.soundsPath+"gameOver.mp3"],mushroomBeat:[""+this.soundsPath+"mushroomBeat.ogg",""+this.soundsPath+"mushroomBeat.mp3"],mushroomCollect:[""+this.soundsPath+"mushroomCollect.ogg",""+this.soundsPath+"mushroomCollect.mp3"],guaranaCollect:[""+this.soundsPath+"guaranaCollect.ogg",""+this.soundsPath+"guaranaCollect.mp3"],guaranaBeat:[""+this.soundsPath+"guaranaBeat.ogg",""+this.soundsPath+"guaranaBeat.mp3"],jumpSound:[""+this.soundsPath+"jumpSound.ogg",""+this.soundsPath+"jumpSound.mp3"],leafSound:[""+this.soundsPath+"leafSound.ogg",""+this.soundsPath+"leafSound.mp3"],burnSound:[""+this.soundsPath+"burnSound.ogg",""+this.soundsPath+"burnSound.mp3"],coffeeStartSound:[""+this.soundsPath+"coffeeStartSound.ogg",""+this.soundsPath+"coffeeStartSound.mp3"],coffeeEndSound:[""+this.soundsPath+"coffeeEndSound.ogg",""+this.soundsPath+"coffeeEndSound.mp3"],victoryBeat:[""+this.soundsPath+"victoryBeat.ogg",""+this.soundsPath+"victoryBeat.mp3"]}),Crafty.sprite(800,420,""+this.imagesPath+"psychoVisionBg.jpg",{spr_psycho:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"runner.png",{spr_runner:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"face.png",{spr_face:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"blush.png",{spr_blush:[0,0]}),Crafty.sprite(47,56,""+this.imagesPath+"leaf.png",{spr_leaf:[0,0]}),Crafty.sprite(40,49,""+this.imagesPath+"mushroom.png",{spr_mushroom:[0,0]}),Crafty.sprite(34,34,""+this.imagesPath+"guarana.png",{spr_guarana:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"manaMeter.png",{spr_mana:[0,0]}),Crafty.sprite(116,132,""+this.imagesPath+"mrsCoffee.png",{spr_mrs_coffee:[0,0]}),Crafty.sprite(108,164,""+this.imagesPath+"mrHot.png",{spr_mr_hot:[0,0]}),Crafty.sprite(159,24,""+this.imagesPath+"sayings.png",{spr_sayings:[0,0]}),Crafty.sprite(323,138,""+this.imagesPath+"cloud.png",{spr_cloud:[0,0]}),Crafty.sprite(386,38,""+this.imagesPath+"discoText.png",{spr_disco_text:[0,0]}),Crafty.sprite(224,16,""+this.imagesPath+"jeszczeRazT.png",{jeszcze_button:[0,0]}),Crafty.sprite(199,18,""+this.imagesPath+"gOpunktyT.png",{gOpunkty_button:[0,0]}),Crafty.sprite(136,18,""+this.imagesPath+"gOrekordT.png",{gOrekord_button:[0,0]}),Crafty.sprite(180,16,""+this.imagesPath+"menuT.png",{menu_button:[0,0]})},loadMainMenu:function(){return Crafty.audio.add({mainMenu:[""+this.soundsPath+"mainMenu.mp3"]}),Crafty.sprite(214,39,""+this.imagesPath+"startT.png",{start_button:[0,0]}),Crafty.sprite(200,34,""+this.imagesPath+"instrukcjaT.png",{instrukcja_button:[0,0]}),Crafty.sprite(134,34,""+this.imagesPath+"tworcyT.png",{tworcy_button:[0,0]}),Crafty.sprite(132,18,""+this.imagesPath+"rekordT.png",{rekord_button:[0,0]}),Crafty.sprite(36,30,""+this.imagesPath+"sound.png",{sound_button:[0,0]}),Crafty.sprite(320,75,""+this.imagesPath+"mainMenuLeaves.png",{leaves_image:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"runner.png",{spr_runner:[0,0]}),Crafty.sprite(75,75,""+this.imagesPath+"face.png",{spr_face:[0,0]}),Crafty.sprite(12,16,""+this.imagesPath+"digits.png",{spr_digits:[0,0]}),Crafty.sprite(23,28,""+this.imagesPath+"powrotButton.png",{powrot_button:[0,0]})},loadInstruction:function(){return Crafty.sprite(20,20,""+this.imagesPath+"arrowR.png",{arrow_r_button:[0,0]}),Crafty.sprite(20,20,""+this.imagesPath+"arrowL.png",{arrow_l_button:[0,0]})},loadAuthors:function(){return Crafty.sprite(140,22,""+this.imagesPath+"autCebulaText.png",{aut_cebula_text:[0,0]}),Crafty.sprite(98,22,""+this.imagesPath+"autBossText.png",{aut_boss_text:[0,0]}),Crafty.sprite(154,22,""+this.imagesPath+"autPabloText.png",{aut_pablo_text:[0,0]}),Crafty.sprite(161,18,""+this.imagesPath+"autMusicText.png",{aut_music_text:[0,0]}),Crafty.sprite(357,14,""+this.imagesPath+"autSupportBox.png",{aut_mailbox:[0,0]})},gameplayList:function(){var t,e=this;return t=[],_.each(this.gameplayImages,function(a){return t.push(""+e.imagesPath+a)}),_.each(this.gameplaySounds,function(a){return t.push(""+e.soundsPath+a)}),t},mainMenuList:function(){var t,e=this;return t=[],_.each(this.mainMenuImages,function(a){return t.push(""+e.imagesPath+a)}),_.each(this.mainMenuSounds,function(a){return t.push(""+e.soundsPath+a)}),t},instructionList:function(){var t,e=this;return t=[],_.each(this.instructionImages,function(a){return t.push(""+e.imagesPath+a)}),t},authorsList:function(){var t,e=this;return t=[],_.each(this.authorsImages,function(a){return t.push(""+e.imagesPath+a)}),t}},Crafty.c("AudioManager",{mode:"normal",canPlayJump:!0,startMenuMusic:function(){return Crafty.audio.play("mainMenu",-1,Game.volume),!1},setInitialMute:function(){return localStorage.getItem("muted")||localStorage.setItem("muted",!1),Game.muted?Crafty.audio.mute():Crafty.audio.unmute()},setJumpEffect:function(){var t=this;return $(document).bind("keydown",function(e){return 38!==e.keyCode&&32!==e.keyCode||!t.canPlayJump?void 0:(t.playJumpEffect(),t.canPlayJump=!1)}),$(document).bind("keyup",function(){return t.canPlayJump=!0})},playJumpEffect:function(){return Game.runner&&Game.runner._multijumpsLeft>=0?Crafty.audio.play("jumpSound",1,.5*Game.volume):void 0},playLeafEffect:function(){return Crafty.audio.play("leafSound",1,.5*Game.volume)},playBurnEffect:function(){return Crafty.audio.stop("burnSound"),Crafty.audio.play("burnSound",1,Game.volume)},playCoffeeStartEffect:function(){return Crafty.audio.play("coffeeStartSound",1,Game.volume),"mushroom"!==this.mode?(this.mode="coffee",Crafty.audio.stop("guaranaBeat"),Crafty.audio.unpause("gameplay")):void 0},playCoffeeEndEffect:function(){return Crafty.audio.play("coffeeEndSound",1,Game.volume)},playMushroomStartEffect:function(){return"mushroom"===this.mode||"victory"===this.mode?Crafty.audio.play("mushroomCollect"):(this.mode="mushroom",Crafty.audio.pause("gameplay"),Crafty.audio.stop("guaranaBeat"),Crafty.audio.play("mushroomBeat",1,Game.volume))},playMushroomEndEffect:function(){return this.mode="normal",Crafty.audio.stop("mushroomBeat"),Crafty.audio.unpause("gameplay")},playGuaranaStartEffect:function(){return"mushroom"===this.mode||"victory"===this.mode?Crafty.audio.play("guaranaCollect",1,1.1*Game.volume):(this.mode="guarana",Crafty.audio.pause("gameplay"),Crafty.audio.stop("guaranaBeat"),Crafty.audio.play("guaranaBeat",1,1.1*Game.volume))},playGuaranaEndEffect:function(){return"mushroom"!==this.mode?(this.mode="normal",Crafty.audio.stop("guaranaBeat"),Crafty.audio.unpause("gameplay")):void 0},init:function(){return this.requires("Persist"),this.setInitialMute(),this.setJumpEffect(),this.bind("Runner:collectedLeaf",this.playLeafEffect),this.bind("Runner:collectedMrHot",this.playBurnEffect),this.bind("Runner:collectedMrsCoffee",this.playCoffeeStartEffect),this.bind("Coffee:speedUpEnded",this.playCoffeeEndEffect),this.bind("Runner:jumpEffect",this.playJumpEffect),this.mode="normal",this.bind("SceneChange",function(t){return"Gameplay"===t.newScene&&(this.unbind("Runner:collectedMushroom"),this.unbind("Runner:collectedGuarana"),this.unbind("Guarana:ended"),this.unbind("Mushroom:ended"),this.bind("Runner:collectedGuarana",this.playGuaranaStartEffect),this.bind("Guarana:ended",this.playGuaranaEndEffect),this.bind("Runner:collectedMushroom",this.playMushroomStartEffect),this.bind("Mushroom:ended",this.playMushroomEndEffect),this.mode="normal"),null===t.oldScene&&"MainMenu"===t.newScene?this.startMenuMusic():"MainMenu"===t.oldScene&&"Gameplay"===t.newScene?(Crafty.audio.stop("mainMenu"),Crafty.audio.play("gameplay",-1,Game.volume)):"Gameplay"===t.oldScene&&"GameOver"===t.newScene?(this.unbind("Runner:jumpEffect",this.playJumpEffect),Crafty.audio.stop("gameplay"),Crafty.audio.stop("mushroomBeat"),Crafty.audio.stop("guaranaBeat"),Crafty.audio.stop("victoryBeat"),Crafty.audio.play("gameOver",1,.7)):"GameOver"===t.oldScene&&"Gameplay"===t.newScene?(Crafty.audio.stop("gameOver"),Crafty.audio.play("gameplay",-1,Game.volume),Crafty.audio.play("gameplay",-1,Game.volume)):void 0}),this.bind("Siorb:victory",function(){return this.mode="victory",this.unbind("Guarana:ended"),this.unbind("Mushroom:ended"),Crafty.audio.stop(),Crafty.audio.play("victoryBeat",-1,Game.volume)})}}),Crafty.c("BackgroundManager",{xScrollFrame:0,yScrollFrame:0,backgroundX:0,xScrollingSpeed:2,proportion:3,init:function(){return Game.window.style.backgroundPosition="0px -1000px",this.bind("EnterFrame",this.scrollBackgroundX),this.bind("Runner:jump",this.centerOnRunner)},scrollBackgroundX:function(){var t,e;return this.xScrollFrame+=1,1e3===this.xScrollFrame&&(this.xScrollFrame=0),this.xScrollFrame%2?(e=Game.window.style.backgroundPosition,t=parseInt(e.split(" ")[1]),Game.window.style.backgroundPosition=""+this.backgroundX+"px "+(""+t)+"px",this.backgroundX===2*Game.width?this.backgroundX=0:this.backgroundX-=this.xScrollingSpeed):void 0},centerOnRunner:function(t){return Game.view.y-=t.y+Game.view.y-Game.height/2+75,Game.view.x-=t.x+Game.view.x-50,this.yScrollFrame+=1,1e3===this.yScrollFrame&&(this.yScrollFrame=0),0===this.yScrollFrame%3?this.scrollBackgroundY(t):void 0},scrollBackgroundY:function(t){var e,a,r;return e=Game.window.style.backgroundPosition.split(" ")[1].split(""),e=e.slice(0,e.length-2),r=t.up?t.gy-t.jumpSpeed:t.gy,a=""+(Number(e.join(""))-r/this.proportion),Game.window.style.backgroundPosition=""+this.backgroundX+"px "+(""+a)+"px"}}),Crafty.c("BlackMaskManager",{fadeInMask:function(){return Crafty.e("BlackMask").isInvisible().show()},fadeOutMask:function(){return Crafty.e("BlackMask").isVisible().hide()},init:function(){return this.requires("Persist"),this.bind("SceneChange",function(t){return null===t.oldScene&&"MainMenu"===t.newScene?this.fadeOutMask():"GameOver"===t.oldScene&&"MainMenu"===t.newScene?this.fadeOutMask():void 0}),this.bind("Game:gameOverStarted",function(){return this.fadeOutMask()}),this.bind("Game:gameplayStarted",function(){return this.fadeOutMask()})}}),Crafty.c("GameObserver",{absoluteScore:0,init:function(){return this.requires("Recyclable"),this.bind("Runner:collectedGuarana",this.speedUpGuarana),this.bind("Runner:collectedLeaf",this.scorePoint),this.bind("Runner:collectedMrHot",this.losePoints),this.bind("Runner:collectedMrsCoffee",this.losePoints),this.bind("Runner:collectedMushroom",this.scorePoint),this.bind("Runner:collectedMrsCoffee",this.speedUpCoffee),this.bind("Coffee:speedUpEnded",this.slowDownPlatforms),this.bind("Siorb:victory",this.handleVictory)},setSpeedTo:function(t){return Game.floatSpeed=t},speedUpGuarana:function(){return this.speedUpPlatforms("guarana")},speedUpCoffee:function(){return this.speedUpPlatforms("coffee")},speedUpPlatforms:function(t){return Game.floatSpeed<=Game.defaultFloatSpeed&&(Game.floatSpeed+=3),Game.timeouts.slowDown1&&clearTimeout(Game.timeouts.slowDown1),Game.timeouts.slowDown2&&clearTimeout(Game.timeouts.slowDown2),Game.timeouts.slowDown1=setTimeout(function(){return Game.floatSpeed=Game.defaultFloatSpeed+1},Game.speedUpDuration-1e3),Game.timeouts.slowDown2=setTimeout(function(){return Game.floatSpeed=Game.defaultFloatSpeed,"guarana"===t?Crafty.trigger("Guarana:ended"):Crafty.trigger("Coffee:speedUpEnded")},Game.speedUpDuration)},slowDownPlatforms:function(){return Game.floatSpeed===Game.defaultFloatSpeed&&(Game.floatSpeed-=1),Game.timeouts.slowDown1&&clearTimeout(Game.timeouts.slowDown1),Game.timeouts.slowDown2&&clearTimeout(Game.timeouts.slowDown2),Game.timeouts.slowDown2=setTimeout(function(){return Game.floatSpeed=Game.defaultFloatSpeed,Crafty.trigger("Coffee:slowDownEnded")},Game.speedUpDuration/2)},scorePoint:function(t){return Game.score+=t.points,this.absoluteScore+=t.points,this.setDifficulty(),Crafty.trigger("ScoreBoard:updatePoints"),0===this.absoluteScore%16&&Crafty.trigger("Runner:saysSomething"),Game.score>=Game.victoryScore&&Game.victory===!1?Crafty.trigger("Siorb:victory"):void 0},losePoints:function(){return Game.score>=Game.scorePenalty?Game.score-=Game.scorePenalty:Game.score=0,this.setDifficulty(),Crafty.trigger("ScoreBoard:updatePoints")},setDifficulty:function(){return Game.score<Game.mediumScore?Game.platformSizes.current=Game.platformSizes.easy:Game.score<Game.hardScore&&"easy"===Game.mode?(Game.mode="medium",Game.floatSpeed<Game.mediumFloatSpeed&&(Game.floatSpeed=Game.mediumFloatSpeed),Game.defaultFloatSpeed=Game.mediumFloatSpeed,Game.platformSizes.current=Game.platformSizes.medium):"medium"===Game.mode&&Game.score>=Game.hardScore?(Game.mode="hard",Game.platformSizes.current=Game.platformSizes.hard):void 0},handleVictory:function(){return Crafty.e("DiscoText"),Game.victory=!0,Game.leafProbability=.6,Game.guaranaProbability=.66,Game.mushroomProbability=1.01,Game.mrHotProbability=0,Game.mushroomProbability=0,Game.floatSpeed<Game.victoryFloatSpeed&&(Game.floatSpeed=Game.victoryFloatSpeed),Game.defaultFloatSpeed=Game.victoryFloatSpeed}}),Crafty.c("Recyclable",{init:function(){return this}}),Crafty.c("Base",{init:function(){return this.requires("2D, DOM, Color, Recyclable"),this},at:function(t,e){return this.attr({x:t,y:e}),this}}),Crafty.c("Collectable",{init:function(){var t=this;return this.requires("Base, Collision, Floatable"),this.attr({z:301}),this.onHit("RunnerImage",function(){return Crafty.trigger("Collected",{name:this.name}),this.destroy()}),setTimeout(function(){return t.destroy()},8e3)}}),Crafty.c("Floatable",{floatLeft:!0,init:function(){return this.bind("EnterFrame",this.float)},"float":function(){return this.move("w",Game.floatSpeed)}}),Crafty.c("FBLikeButton",{init:function(){var t;return this.requires("Base"),this.attr({x:10,y:10,w:50,h:50}),t="<div class='fb-like' data-href='https://www.facebook.com/dobrezielepl' data-layout='standard' data-action='like' data-show-faces='false' data-share='false'></div>",function(t,e,a){var r,n=t.getElementsByTagName(e)[0];t.getElementById(a)||(r=t.createElement(e),r.id=a,r.src="//connect.facebook.net/pl_PL/all.js#xfbml=1",n.parentNode.insertBefore(r,n))}(document,"script","facebook-jssdk"),$(this._element).append(t)}}),Crafty.c("BlackMask",{init:function(){var t=this;return this.requires("Base"),this.color("black"),this.attr({x:0,y:Crafty.viewport.y,w:Game.width+200,h:Game.height+200,z:358}),setTimeout(function(){return t.destroy()},2e3)},isVisible:function(){return this.attr({alpha:1}),this},isInvisible:function(){return this.attr({alpha:0}),this},show:function(){var t=this;return setTimeout(function(){return $(t._element).fadeIn("slow")},300)},hide:function(){var t=this;return setTimeout(function(){return $(t._element).fadeOut("slow")},300)}}),Crafty.c("Button",{init:function(){var t=this;return this.requires("Base, Text"),$(this._element).fadeTo(100,.7),$(this._element).hover(function(){return $(t._element).stop().fadeTo(200,1)},function(){return $(t._element).stop().fadeTo(200,.7)})}}),Crafty.c("ButtonWithLink",{init:function(){return this.requires("2D, DOM")},addLink:function(t,e,a){var r,n;return r="<a href="+t+" target='_blank'><img src='assets/images/"+e+"' title='"+a+"'</img></a>",$(this._element).append(r),n=$(this._element).children()[0],$(n).stop().fadeTo(0,.9),$(n).hover(function(){return $(n).stop().fadeTo(200,1)},function(){return $(n).stop().fadeTo(200,.9)}),this},at:function(t,e){return this.attr({x:t,y:e}),this}}),Crafty.c("GameOverAd",{init:function(){var t,e;return this.requires("ButtonWithLink"),this.attr({x:400,y:210}),Game.victory||.5>Math.random()?(t=.5>Math.random()?1:2,e="gameOverAd"+t+".png",this.addLink("http://www.dobreziele.pl",e,"Dobre Ziele")):void 0}}),Crafty.c("GameOverShortcuts",{enterCode:13,escCode:27,init:function(){return this.requires("Recyclable, Keyboard"),this.bind("KeyDown",function(t){return t.keyCode===this.enterCode?Game.victory?window.location.reload():Game.runScene.gameplay():t.keyCode===this.escCode?window.location.reload():void 0})}}),Crafty.c("GameplayShortcuts",{spaceCode:32,init:function(){var t=this;return this.requires("Recyclable, Keyboard, Mouse"),this.bind("KeyDown",function(t){return t.keyCode===this.spaceCode?this.makeRunnerJump():void 0}),$("#game").on("click",function(){return t.makeRunnerJump(),Crafty.trigger("Runner:jumpEffect")})},makeRunnerJump:function(){var t;return t={key:38},Crafty.trigger("KeyDown",t)}}),Crafty.c("InstructionField",{init:function(){var t,e,a;return this.requires("Base"),this.attr({x:330,y:130}),t="<div class='jcarousel'>                  <ul>                    <li><img src='assets/images/instruction1.png' width='431' height='287' alt=''></li>                    <li><img src='assets/images/instruction2.png' width='431' height='287' alt=''></li>                    <li><img src='assets/images/instruction3.png' width='431' height='287' alt=''></li>                  </ul>                </div>",a=370,e=500,Crafty.e("Button, arrow_l_button, jcarousel-prev").at(e,a),Crafty.e("Button, arrow_r_button, jcarousel-next").at(e+60,a),$(this._element).append(t),$(".jcarousel").jcarousel({animation:{duration:400}}),$(".jcarousel-prev").jcarouselControl({target:"-=1"}),$(".jcarousel-next").jcarouselControl({target:"+=1"})}}),Crafty.c("LogoButton",{init:function(){return this.requires("ButtonWithLink"),this.attr({x:160,y:330}),this.addLink("http://www.dobreziele.pl","zieleLogo.png","Dobre Ziele")}}),Crafty.c("ReturnButton",{clicked:!1,init:function(){var t=this;return this.requires("Button, powrot_button"),this.at(750,365),$(this._element).on("click",function(){return t.clicked?void 0:(t.clicked=!0,Game.runScene.mainMenu())})}}),Crafty.c("SoundButton",{init:function(){var t=this;return this.requires("Button, sound_button"),this.at(Game.width-45,10),this.chooseSprite(),$(this._element).on("click",function(){return Crafty.audio.toggleMute(),t.chooseSprite(),"false"===localStorage.getItem("muted")?localStorage.setItem("muted",!0):localStorage.setItem("muted",!1)})},chooseSprite:function(){var t;return t=Crafty.audio.muted?0:1,this.sprite(t,0)}}),Crafty.c("ComicCloud",{isVisible:!1,delay:3e3,init:function(){return this.requires("Base, spr_cloud"),this.attr({z:310}),this.move("e",100),this.move("s",100),$(this._element).hide(),this.bind("Runner:saysSomething",this.showCloud)},showCloud:function(){var t=this;return this.isVisible?void 0:(this.isVisible=!0,$(this._element).stop().fadeIn("fast").delay(this.delay).fadeOut("fast"),setTimeout(function(){return t.isVisible=!1},this.delay))}}),Crafty.c("ComicSayings",{isVisible:!1,delay:3e3,phrasesCount:13,init:function(){return this.requires("Base, spr_sayings"),this.attr({z:310}),this.move("e",105),this.move("s",119),$(this._element).hide(),this.bind("Runner:saysSomething",this.showSaying)},showSaying:function(){var t=this;return this.sprite(0,Utils.rand(0,this.phrasesCount)),this.isVisible?void 0:(this.isVisible=!0,$(this._element).stop().fadeIn("fast").delay(this.delay).fadeOut("fast"),setTimeout(function(){return t.isVisible=!1},this.delay))}}),Crafty.c("DiscoText",{delay:2e3,init:function(){return this.requires("Base, SpriteAnimation, spr_disco_text"),this.attr({x:Game.width/2-200,y:Game.view.y+Game.runner.y,z:310}),this.reel("DiscoText:Blinks",500,[[0,0],[0,1]]),this.bind("Runner:jump",function(t){return this.y=Game.runner.y+Game.view.y+t.y-100}),this.animate("DiscoText:Blinks",-1)}}),Crafty.c("Guarana",{name:"guarana",init:function(){return this.requires("Collectable, spr_guarana")}}),Crafty.c("Leaf",{name:"leaf",init:function(){return this.requires("Collectable, spr_leaf")}}),Crafty.c("ManaMeter",{init:function(){return this.requires("Base, spr_mana"),this.attr({x:Game.width-100,y:Game.view.y+Game.runner.y,w:75,h:75,z:300,alpha:.6}),this.bind("ScoreBoard:updatePoints",this.updateYerbaLevel),this.bind("Runner:jump",function(t){return this.y=Game.runner.y+Game.view.y+t.y-250})},updateYerbaLevel:function(){var t;return t=90>Game.score?parseInt(Game.score/10):9,this.sprite(0,t)}}),Crafty.c("MrHot",{name:"mrHot",init:function(){return this.requires("Collectable"),this.attr({w:50,h:50,z:304}),this.attach(Crafty.e("MrHotImage"))}}),Crafty.c("MrHotImage",{init:function(){return this.requires("Base, spr_mr_hot"),this.attr({z:301}),this.move("w",20),this.move("n",80)}}),Crafty.c("MrsCoffee",{name:"mrsCoffee",init:function(){return this.requires("Collectable"),this.attr({w:50,h:50}),this.attach(Crafty.e("MrsCoffeeImage"))}}),Crafty.c("MrsCoffeeImage",{init:function(){return this.requires("Base, spr_mrs_coffee"),this.attr({z:301}),this.move("w",30),this.move("n",60)}}),Crafty.c("Mushroom",{name:"mushroom",init:function(){return this.requires("Collectable, spr_mushroom")}}),Crafty.c("PixelPoint",{init:function(){return this.requires("Base, spr_digits"),this.attr({w:12,h:16,z:301})},print:function(t){return this.sprite(0,t),this}}),Crafty.c("PixelScoreBoard",{init:function(){return this.requires("Base"),this.attr({w:200,h:50,z:301}),this},printScore:function(t){var e,a=this;return e="current"===t?Game.score:"top"===t?localStorage.getItem("highScore"):0,_.each((""+e).split(""),function(t,e){var r;return t=parseInt(t),r=Crafty.e("PixelPoint").print(t).at(a.x+12*e,a.y),"GameOver"===Game.scene?r.attr({alpha:.5}):void 0})},displayAt:function(t,e,a){return this.at(t,e),this.printScore(a)}}),Crafty.c("Platform",{sizesSize:null,init:function(){return this.requires("Base, Solid, Floatable"),this.sizesSize=Game.platformSizes.current.length,this.attr({h:15,w:Game.platformSizes.current[Utils.rand(0,this.sizesSize)],z:200}),this.bind("EnterFrame",this.resetPosition)},resetPosition:function(){var t,e,a,r,n;return-250>this.x&&(t=[-168,-84],e=[84,168],a=[-84,84],n=this.y>1300?t[Utils.rand(0,2)]:1e3>this.y?e[Utils.rand(0,2)]:a[Utils.rand(0,2)],this.attr({w:Game.platformSizes.current[Utils.rand(0,this.sizesSize)]}),r=Utils.rand(this.width+200,this.width+400),this.at(Game.width,this.y+n),Math.random()>.6)?this.generateCollectable(this.x+30,this.y-50):void 0},generateCollectable:function(t,e){var a,r;return a=Math.random(),r=Utils.rand(20,30),Game.leafProbability>a?Crafty.e("Leaf").at(t+r,e):Game.guaranaProbability>a?Crafty.e("Guarana").at(t+r,e+20):Game.mrsCoffeeProbability>a?Crafty.e("MrsCoffee").at(t+r,e):Game.mrHotProbability>a?Crafty.e("MrHot").at(t+r,e):Crafty.e("Mushroom").at(t+r,e+6)}}),Crafty.c("PsychoVision",{isAnimating:!1,duration:Game.mushroomDuration,init:function(){return this.requires("Base, spr_psycho"),this.bind("Runner:psychoVision",this.showVision),this.attr({x:0,y:76,z:200,alpha:0}),$(this._element).css("display","none")},showVision:function(){var t=this;return this.isAnimating?void 0:($(this._element).css("opacity","0.01").css("display","block").fadeTo(this.duration/12,.2).fadeTo(this.duration/12,.1).fadeTo(this.duration/12,.2).fadeTo(this.duration/12,.1).fadeTo(this.duration/12,.2).fadeTo(this.duration/12,.1).fadeTo(this.duration/12,.2).fadeTo(this.duration/12,.1).fadeTo(this.duration/12,.2).fadeTo(this.duration/12,.1).fadeTo(this.duration/12,.2).fadeTo(this.duration/12,0),this.isAnimating=!0,Crafty.trigger("Face:crazy"),setTimeout(function(){return t.isAnimating=!1,Crafty.trigger("Face:stopCrazy"),Crafty.trigger("Mushroom:ended")},this.duration))}}),Crafty.c("Runner",{speedValue:0,jumpValue:10,backgroundX:0,gravityValue:.6,scaredFaceVelocity:40,init:function(){return this.requires("Base, Twoway, Gravity"),this.attr({x:50,y:Game.height/2,w:50,h:10,z:300}),this.attach(Crafty.e("RunnerBlush")),this.attach(Crafty.e("RunnerImage")),this.attach(Crafty.e("RunnerFace")),this.attach(Crafty.e("PsychoVision")),this.attach(Crafty.e("ComicCloud")),this.attach(Crafty.e("ComicSayings")),this.twoway(this.speedValue,this.jumpValue),this.gravity("Solid"),this.gravityConst(this.gravityValue),this.bind("Move",this.runnerDidMove),this.multijumps(2,this.jumpValue/2,!0),this.bind("Collected",this.handleCollected),this.bind("Guarana:ended",function(){return this.gravityConst(this.gravityValue)}),this.bind("Runner:collectedMrsCoffee",function(){return this.gravityConst(this.gravityValue)})},runnerDidMove:function(){return 0!==this._gy?(this._gy>this.scaredFaceVelocity&&Crafty.trigger("Face:falling"),this._gy>20&&Crafty.trigger("Runner:falling"),Crafty.trigger("Runner:jump",{gy:this._gy,up:this._up,jumpSpeed:this._jumpSpeed,x:this.x,y:this.y})):void 0},at:function(t,e){return this.attr({x:t,y:e})},handleCollected:function(t){return"guarana"===t.name?(Crafty.trigger("Runner:collectedGuarana"),this.gravityConst(this.gravityValue-.2)):"leaf"===t.name?Crafty.trigger("Runner:collectedLeaf",{points:2}):"mushroom"===t.name?(Crafty.trigger("Runner:collectedMushroom",{points:2}),Crafty.trigger("Runner:psychoVision")):"mrsCoffee"===t.name?Crafty.trigger("Runner:collectedMrsCoffee"):"mrHot"===t.name?Crafty.trigger("Runner:collectedMrHot"):void 0
}}),Crafty.c("RunnerBlush",{init:function(){return this.requires("Base, spr_blush"),this.attr({z:310}),this.move("e",25),this.move("s",148),this.bind("Runner:collectedMrHot",this.showBlush),$(this._element).hide()},showBlush:function(){return $(this._element).stop().fadeIn("slow").delay(3e3).fadeOut("slow")}}),Crafty.c("RunnerFace",{mode:"normal",init:function(){return this.requires("Base, SpriteAnimation, spr_face"),this.attr({z:299}),this.move("e",23),this.move("s",148),this.bind("Face:fasterGuarana",this.faceFasterGuarana),this.bind("Face:fasterCoffee",this.faceFasterCoffee),this.bind("Face:slowerCoffee",this.faceSlowerCoffee),this.bind("Face:normal",this.faceNormal),this.bind("Face:crazy",this.faceCrazy),this.bind("Face:stopCrazy",this.faceStopCrazy),this.bind("Face:falling",this.faceFalling),this.bind("Siorb:victory",this.handleVictoryFace)},faceNormal:function(){return this.sprite(0,0)},faceFasterGuarana:function(){return this.sprite(0,3)},faceFasterCoffee:function(){return this.sprite(0,5)},faceSlowerCoffee:function(){return this.sprite(0,4)},faceFalling:function(){return this.sprite(0,2)},faceCrazy:function(){return this.unbind("Face:normal",this.faceNormal),this.unbind("Face:fasterGuarana",this.faceFasterGuarana),this.unbind("Face:fasterCoffee",this.faceFasterCoffee),this.unbind("Face:slowerCoffee",this.faceSlowerCoffee),"victory"!==this.mode?(this.mode="crazy",this.sprite(0,1)):void 0},faceStopCrazy:function(){return this.bind("Face:normal",this.faceNormal),this.bind("Face:fasterGuarana",this.faceFasterGuarana),this.bind("Face:fasterCoffee",this.faceFasterCoffee),this.bind("Face:slowerCoffee",this.faceSlowerCoffee),this.mode="normal",this.sprite(0,0)},handleVictoryFace:function(){return this.unbind("Face:normal",this.faceNormal),this.unbind("Face:fasterGuarana",this.faceFasterGuarana),this.unbind("Face:fasterCoffee",this.faceFasterCoffee),this.unbind("Face:slowerCoffee",this.faceSlowerCoffee),this.unbind("Face:crazy",this.faceCrazy),this.unbind("Face:stopCrazy",this.faceStopCrazy),this.mode="victory",this.sprite(0,3)}}),Crafty.c("RunnerImage",{mode:"normal",init:function(){return this.requires("Base, SpriteAnimation, spr_runner"),this.attr({z:299}),this.move("e",25),this.move("s",148),this.reel("Runner:Runs",300,0,0,3),this.reel("Runner:RunsSlower",500,0,0,3),this.reel("Runner:RunsFaster",150,0,0,3),this.animate("Runner:Runs",-1),this.bind("hitGround",this.groundHitPose),this.bind("Runner:collectedGuarana",this.runFasterGuarana),this.bind("Runner:collectedMrsCoffee",this.runFasterCoffee),this.bind("Coffee:speedUpEnded",this.runSlowerCoffee)},groundHitPose:function(){return this.resumeAnimation(),this.bind("Runner:falling",this.fallingPose),"normal"===this.mode?(this.bind("Runner:jump",this.jumpPose),Crafty.trigger("Face:normal"),this.animate("Runner:Runs",-1)):void 0},fallingPose:function(){return this.unbind("Runner:falling"),this.animate("Runner:RunsFaster",-1)},jumpPose:function(){return"normal"===this.mode?(this.pauseAnimation(),this.sprite(0,1),this.unbind("Runner:jump")):void 0},runFasterGuarana:function(){return this.mode="guarana",Crafty.trigger("Face:fasterGuarana"),this.runFasterAnimation()},runFasterCoffee:function(){return this.mode="coffee",Crafty.trigger("Face:fasterCoffee"),this.runFasterAnimation()},runSlowerCoffee:function(){var t=this;return Crafty.trigger("Face:slowerCoffee"),this.animate("Runner:RunsSlower",-1),Game.timeouts.speedAnimation&&clearTimeout(Game.timeouts.speedAnimation),Game.timeouts.speedAnimation=setTimeout(function(){return t.mode="normal",Crafty.trigger("Face:normal"),t.animate("Runner:Runs",-1)},Game.speedUpDuration/2)},runFasterAnimation:function(){var t=this;return this.animate("Runner:RunsFaster",-1),Game.timeouts.speedAnimation&&clearTimeout(Game.timeouts.speedAnimation),Game.timeouts.speedAnimation=setTimeout(function(){return"guarana"===t.mode?(t.mode="normal",Crafty.trigger("Face:normal"),t.animate("Runner:Runs",-1)):void 0},Game.speedUpDuration)}}),Crafty.c("RunnerKiller",{deathGrenzenY:1800,deathHappened:!1,init:function(){return this.requires("Base, Collision"),this.attr({x:0,y:this.deathGrenzenY,h:200,w:Game.width}),this.onHit("RunnerImage",function(){return this.deathHappened?void 0:(this.deathHappened=!0,Crafty("ScoreBoard").destroy(),Crafty("ManaMeter").destroy(),Crafty("PsychoVision").destroy(),setTimeout(function(){return Crafty("BackgroundManager").destroy()},1e3),setTimeout(function(){return Game.timeouts.speedAnimation&&clearTimeout(Game.timeouts.speedAnimation),Game.timeouts.slowDown1&&clearTimeout(Game.timeouts.slowDown1),Game.timeouts.slowDown2&&clearTimeout(Game.timeouts.slowDown2),Game.floatSpeed=Game.defaultFloatSpeed,Game.runScene.gameOver()},2500))})}}),Crafty.c("ScoreBoard",{init:function(){return this.requires("2D, DOM, Text"),this.attr({x:Game.width-69,y:Game.view.y+Game.runner.y,w:400,z:301}),this.textFont({type:"italic",size:"20px",family:"Arial"}),this.text(""+Game.score),this.bind("ScoreBoard:updatePoints",this.updateScoreBoard),this.bind("Runner:jump",function(t){return this.y=Game.runner.y+Game.view.y+t.y-215})},updateScoreBoard:function(){return this.text(""+Game.score)}})}).call(this);