(function() {
  var Game, startFunction;

  Game = {
    host: "http://" + window.location.host + "/assets",
    initialFloatSpeed: 4,
    mediumFloatSpeed: 5,
    victoryFloatSpeed: 6,
    extremeFloatSpeed: 7,
    colorLevel: 1,
    mode: 'easy',
    mediumScore: 5,
    colorChangeScore: 50,
    hardScore: 80,
    victoryScore: 100,
    probabilitiesScore: 25,
    hotPenalty: 5,
    coffeePenalty: 3,
    score: 0,
    width: 800,
    height: 420,
    window: null,
    scene: null,
    assets: null,
    firstMainMenu: true,
    speedUpDuration: 7300,
    speedUpValue: 2,
    mushroomDuration: 13600,
    easyLeafProbability: 0.81,
    easyGuaranaProbability: 0.88,
    easyMrsCoffeeProbability: 0.92,
    easyMrHotProbability: 0.96,
    easyMushroomProbability: 1.01,
    mediumLeafProbability: 0.77,
    mediumGuaranaProbability: 0.84,
    mediumMrsCoffeeProbability: 0.92,
    mediumMrHotProbability: 0.97,
    mediumMushroomProbability: 1.01,
    victoryLeafProbability: 0.60,
    victoryGuaranaProbability: 0.66,
    victoryMrsCoffeeProbability: 0,
    victoryMrHotProbability: 0,
    victoryMushroomProbability: 1.01,
    victory: false,
    muted: (localStorage.getItem('muted') === 'true' ? true : false),
    sharedOnFB: (localStorage.getItem('sharedOnFB') === 'true' ? true : false),
    volume: 0.5,
    timeouts: {
      slowDown1: null,
      slowDown2: null,
      speedAnimation: null
    },
    platformSizes: {
      current: null,
      easy: [150, 150, 200, 250, 250],
      medium: [100, 100, 150, 150, 200],
      hard: [75, 100, 100, 150, 150]
    },
    start: function() {
      Crafty.init(this.width, this.height, "game");
      this.setBindings();
      Crafty.e('AudioManager');
      Crafty.e('BlackMaskManager');
      if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', 0);
      }
      Crafty.trigger('Game:initialized');
      return this.runScene.mainMenu();
    },
    runScene: {
      mainMenu: function() {
        Crafty.assets = [];
        return Crafty.load(Game.assets.mainMenuList(), function() {
          Game.assets.loadMainMenu();
          return Crafty.scene("MainMenu");
        });
      },
      gameplay: function() {
        Crafty.assets = [];
        return Crafty.load(Game.assets.gameplayList(), function() {
          Game.assets.loadGameplay();
          return Crafty.scene("Gameplay");
        });
      },
      gameOver: function() {
        return Crafty.scene('GameOver');
      },
      instruction: function() {
        return Crafty.load(Game.assets.instructionList(), function() {
          Game.assets.loadInstruction();
          return Crafty.scene("Instruction");
        });
      },
      authors: function() {
        return Crafty.load(Game.assets.authorsList(), function() {
          Game.assets.loadAuthors();
          return Crafty.scene("Authors");
        });
      }
    },
    setBindings: function() {
      return $(document).bind("keyup", function(e) {
        if (e.keyCode === 80) {
          return Crafty.pause();
        }
      });
    },
    submitStatistic: function(score, duration) {
      return $.ajax({
        url: "/api/statistics?statistic[score]=" + score + "&statistic[duration]=" + duration,
        type: 'POST'
      });
    },
    submitScore: function(score) {
      var scoreParam;
      if ((typeof gon !== 'undefined') && gon.userLoggedIn) {
        scoreParam = btoa(parseInt(score));
        return $.ajax({
          url: "/api/user?user[noturbusiness]=" + scoreParam,
          type: 'PUT'
        });
      }
    },
    gameplayStarted: null
  };

  window.GameInterface = {};

  startFunction = Game.start;

  window.GameInterface.start = startFunction.bind(Game);

  Crafty.c('Base', {
    init: function() {
      this.requires('2D, DOM, Color, Recyclable');
      return this;
    },
    at: function(x, y) {
      this.attr({
        x: x,
        y: y
      });
      return this;
    }
  });

  Crafty.c('Collectable', {
    init: function() {
      this.requires('Base, Collision, Floatable');
      this.attr({
        z: 301
      });
      this.onHit('RunnerImage', function() {
        Crafty.trigger('Collected', {
          name: this.name
        });
        return this.destroy();
      });
      return setTimeout((function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this), 8000);
    }
  });

  Crafty.c('Floatable', {
    floatLeft: true,
    init: function() {
      return this.bind('EnterFrame', this.float);
    },
    float: function() {
      return this.move('w', Game.floatSpeed);
    }
  });

  Game.assets = {
    imagesPath: "" + Game.host + "/images/",
    soundsPath: "" + Game.host + "/sounds/",
    gameplayImages: ["psychoVisionBg.jpg", "face.png", "guarana.png", "mushroom.png", "leaf.png", "manaMeter.png", "mrsCoffee.png", "mrHot.png", "blush.png", "sayings.png", "cloud.png", "discoText.png", "glasses.png", "controlsHint.png", "tworcyT.png", "jeszczeRazT.png", "menuT.png", "gameOverBg.png", "gOrekordT.png", "gOpunktyT.png", "platform1.png", "platform2.png", "platform3.png", "platform4.png", "platform5.png", "platform6.png", "platform7.png", "platform8.png"],
    mainMenuImages: ["mainMenuBg.png", "mainMenuLeaves.png", "instrukcjaT.png", "tworcyT.png", "startT.png", "rekordT.png", "runner.png", "face.png", "digits.png", "sound.png", "powrotButton.png", "glasses.png", "glassesBig.png"],
    instructionImages: ["arrowL.png", "arrowR.png"],
    authorsImages: ["autCebulaText.png", "autBossText.png", "autPabloText.png", "autMusicText.png"],
    mainMenuSounds: ["mainMenu.mp3"],
    gameplaySounds: ["gameplay.ogg", "gameplay.mp3", "gameOver.mp3", "gameOver.ogg", "mushroomBeat.ogg", "mushroomBeat.mp3", "mushroomCollect.ogg", "mushroomCollect.mp3", "guaranaBeat.ogg", "guaranaBeat.mp3", "jumpSound.ogg", "jumpSound.mp3", "leafSound.ogg", "leafSound.mp3", "burnSound.ogg", "burnSound.mp3", "coffeeEndSound.ogg", "coffeeEndSound.mp3", "coffeeStartSound.ogg", "coffeeStartSound.mp3", "victoryBeat.ogg", "victoryBeat.mp3", "guaranaCollect.ogg", "guaranaCollect.mp3"],
    loadGameplay: function() {
      Crafty.audio.add({
        gameplay: ["" + this.soundsPath + "gameplay.ogg", "" + this.soundsPath + "gameplay.mp3"],
        gameOver: ["" + this.soundsPath + "gameOver.ogg", "" + this.soundsPath + "gameOver.mp3"],
        mushroomBeat: ["" + this.soundsPath + "mushroomBeat.ogg", "" + this.soundsPath + "mushroomBeat.mp3"],
        mushroomCollect: ["" + this.soundsPath + "mushroomCollect.ogg", "" + this.soundsPath + "mushroomCollect.mp3"],
        guaranaCollect: ["" + this.soundsPath + "guaranaCollect.ogg", "" + this.soundsPath + "guaranaCollect.mp3"],
        guaranaBeat: ["" + this.soundsPath + "guaranaBeat.ogg", "" + this.soundsPath + "guaranaBeat.mp3"],
        jumpSound: ["" + this.soundsPath + "jumpSound.ogg", "" + this.soundsPath + "jumpSound.mp3"],
        leafSound: ["" + this.soundsPath + "leafSound.ogg", "" + this.soundsPath + "leafSound.mp3"],
        burnSound: ["" + this.soundsPath + "burnSound.ogg", "" + this.soundsPath + "burnSound.mp3"],
        coffeeStartSound: ["" + this.soundsPath + "coffeeStartSound.ogg", "" + this.soundsPath + "coffeeStartSound.mp3"],
        coffeeEndSound: ["" + this.soundsPath + "coffeeEndSound.ogg", "" + this.soundsPath + "coffeeEndSound.mp3"],
        victoryBeat: ["" + this.soundsPath + "victoryBeat.ogg", "" + this.soundsPath + "victoryBeat.mp3"],
        nice: ["" + this.soundsPath + "nice.ogg", "" + this.soundsPath + "nice.mp3"]
      });
      Crafty.sprite(800, 420, "" + this.imagesPath + "psychoVisionBg.jpg", {
        spr_psycho: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "runner.png", {
        spr_runner: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "face.png", {
        spr_face: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "blush.png", {
        spr_blush: [0, 0]
      });
      Crafty.sprite(47, 56, "" + this.imagesPath + "leaf.png", {
        spr_leaf: [0, 0]
      });
      Crafty.sprite(40, 49, "" + this.imagesPath + "mushroom.png", {
        spr_mushroom: [0, 0]
      });
      Crafty.sprite(34, 34, "" + this.imagesPath + "guarana.png", {
        spr_guarana: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "manaMeter.png", {
        spr_mana: [0, 0]
      });
      Crafty.sprite(116, 132, "" + this.imagesPath + "mrsCoffee.png", {
        spr_mrs_coffee: [0, 0]
      });
      Crafty.sprite(108, 164, "" + this.imagesPath + "mrHot.png", {
        spr_mr_hot: [0, 0]
      });
      Crafty.sprite(159, 24, "" + this.imagesPath + "sayings.png", {
        spr_sayings: [0, 0]
      });
      Crafty.sprite(323, 138, "" + this.imagesPath + "cloud.png", {
        spr_cloud: [0, 0]
      });
      Crafty.sprite(386, 38, "" + this.imagesPath + "discoText.png", {
        spr_disco_text: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "glasses.png", {
        spr_glasses: [0, 0]
      });
      Crafty.sprite(303, 54, "" + this.imagesPath + "controlsHint.png", {
        spr_hints: [0, 0]
      });
      Crafty.sprite(220, 16, "" + this.imagesPath + "jeszczeRazT.png", {
        jeszcze_button: [0, 0]
      });
      Crafty.sprite(199, 18, "" + this.imagesPath + "gOpunktyT.png", {
        gOpunkty_button: [0, 0]
      });
      Crafty.sprite(136, 18, "" + this.imagesPath + "gOrekordT.png", {
        gOrekord_button: [0, 0]
      });
      return Crafty.sprite(180, 18, "" + this.imagesPath + "menuT.png", {
        menu_button: [0, 0]
      });
    },
    loadMainMenu: function() {
      Crafty.audio.add({
        mainMenu: ["" + this.soundsPath + "mainMenu.mp3"]
      });
      Crafty.sprite(214, 39, "" + this.imagesPath + "startT.png", {
        start_button: [0, 0]
      });
      Crafty.sprite(200, 34, "" + this.imagesPath + "instrukcjaT.png", {
        instrukcja_button: [0, 0]
      });
      Crafty.sprite(134, 34, "" + this.imagesPath + "tworcyT.png", {
        tworcy_button: [0, 0]
      });
      Crafty.sprite(132, 18, "" + this.imagesPath + "rekordT.png", {
        rekord_button: [0, 0]
      });
      Crafty.sprite(36, 30, "" + this.imagesPath + "sound.png", {
        sound_button: [0, 0]
      });
      Crafty.sprite(320, 75, "" + this.imagesPath + "mainMenuLeaves.png", {
        leaves_image: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "runner.png", {
        spr_runner: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "glasses.png", {
        spr_glasses: [0, 0]
      });
      Crafty.sprite(98, 33, "" + this.imagesPath + "glassesBig.png", {
        spr_big_glasses: [0, 0]
      });
      Crafty.sprite(75, 75, "" + this.imagesPath + "face.png", {
        spr_face: [0, 0]
      });
      Crafty.sprite(12, 16, "" + this.imagesPath + "digits.png", {
        spr_digits: [0, 0]
      });
      return Crafty.sprite(23, 28, "" + this.imagesPath + "powrotButton.png", {
        powrot_button: [0, 0]
      });
    },
    loadInstruction: function() {
      Crafty.sprite(20, 20, "" + this.imagesPath + "arrowR.png", {
        arrow_r_button: [0, 0]
      });
      return Crafty.sprite(20, 20, "" + this.imagesPath + "arrowL.png", {
        arrow_l_button: [0, 0]
      });
    },
    loadAuthors: function() {
      Crafty.sprite(140, 22, "" + this.imagesPath + "autCebulaText.png", {
        aut_cebula_text: [0, 0]
      });
      Crafty.sprite(98, 22, "" + this.imagesPath + "autBossText.png", {
        aut_boss_text: [0, 0]
      });
      Crafty.sprite(154, 22, "" + this.imagesPath + "autPabloText.png", {
        aut_pablo_text: [0, 0]
      });
      return Crafty.sprite(161, 22, "" + this.imagesPath + "autMusicText.png", {
        aut_music_text: [0, 0]
      });
    },
    gameplayList: function() {
      var list;
      list = [];
      _.each(this.gameplayImages, (function(_this) {
        return function(file) {
          return list.push("" + _this.imagesPath + file);
        };
      })(this));
      _.each(this.gameplaySounds, (function(_this) {
        return function(file) {
          return list.push("" + _this.soundsPath + file);
        };
      })(this));
      return list;
    },
    mainMenuList: function() {
      var list;
      list = [];
      _.each(this.mainMenuImages, (function(_this) {
        return function(file) {
          return list.push("" + _this.imagesPath + file);
        };
      })(this));
      _.each(this.mainMenuSounds, (function(_this) {
        return function(file) {
          return list.push("" + _this.soundsPath + file);
        };
      })(this));
      return list;
    },
    instructionList: function() {
      var list;
      list = [];
      _.each(this.instructionImages, (function(_this) {
        return function(file) {
          return list.push("" + _this.imagesPath + file);
        };
      })(this));
      return list;
    },
    authorsList: function() {
      var list;
      list = [];
      _.each(this.authorsImages, (function(_this) {
        return function(file) {
          return list.push("" + _this.imagesPath + file);
        };
      })(this));
      return list;
    }
  };

  Crafty.c('AudioManager', {
    mode: 'normal',
    canPlayJump: true,
    startMenuMusic: function() {
      Crafty.audio.play('mainMenu', -1, Game.volume);
      return false;
    },
    setInitialMute: function() {
      if (!localStorage.getItem('muted')) {
        localStorage.setItem('muted', false);
      }
      if (Game.muted) {
        return Crafty.audio.mute();
      } else {
        return Crafty.audio.unmute();
      }
    },
    setJumpEffect: function() {
      $(document).bind('keydown', (function(_this) {
        return function(e) {
          if ((e.keyCode === 38 || e.keyCode === 32) && _this.canPlayJump) {
            _this.playJumpEffect();
            _this.canPlayJump = false;
          }
          return true;
        };
      })(this));
      return $(document).bind('keyup', (function(_this) {
        return function(e) {
          return _this.canPlayJump = true;
        };
      })(this));
    },
    playNiceEffect: function() {
      return Crafty.audio.play('nice', 1, Game.volume);
    },
    playJumpEffect: function() {
      if (Game.runner && Game.runner._multijumpsLeft > 0) {
        return Crafty.audio.play('jumpSound', 1, Game.volume * 0.5);
      }
    },
    playLeafEffect: function() {
      return Crafty.audio.play('leafSound', 1, Game.volume * 0.5);
    },
    playBurnEffect: function() {
      Crafty.audio.stop('burnSound');
      return Crafty.audio.play('burnSound', 1, Game.volume * 0.5);
    },
    playCoffeeStartEffect: function() {
      Crafty.audio.play('coffeeStartSound', 1, Game.volume);
      if (this.mode !== 'mushroom') {
        this.mode = 'coffee';
        Crafty.audio.stop('guaranaBeat');
        return Crafty.audio.unpause('gameplay');
      }
    },
    playCoffeeEndEffect: function() {
      return Crafty.audio.play('coffeeEndSound', 1, Game.volume);
    },
    playMushroomStartEffect: function() {
      if (this.mode === 'mushroom' || this.mode === 'victory') {
        return Crafty.audio.play('mushroomCollect');
      } else {
        this.mode = 'mushroom';
        Crafty.audio.pause('gameplay');
        Crafty.audio.stop('guaranaBeat');
        return Crafty.audio.play('mushroomBeat', 1, Game.volume);
      }
    },
    playMushroomEndEffect: function() {
      this.mode = 'normal';
      Crafty.audio.stop('mushroomBeat');
      return Crafty.audio.unpause('gameplay');
    },
    playGuaranaStartEffect: function() {
      if (this.mode === 'mushroom' || this.mode === 'victory') {
        return Crafty.audio.play('guaranaCollect', 1, Game.volume * 1.1);
      } else {
        this.mode = 'guarana';
        Crafty.audio.pause('gameplay');
        Crafty.audio.stop('guaranaBeat');
        return Crafty.audio.play('guaranaBeat', 1, Game.volume * 1.1);
      }
    },
    playGuaranaEndEffect: function() {
      if (this.mode !== 'mushroom') {
        this.mode = 'normal';
        Crafty.audio.stop('guaranaBeat');
        return Crafty.audio.unpause('gameplay');
      }
    },
    init: function() {
      this.requires('Persist');
      this.setInitialMute();
      this.setJumpEffect();
      this.bind('Runner:collectedLeaf', this.playLeafEffect);
      this.bind('Runner:collectedMrHot', this.playBurnEffect);
      this.bind('Runner:collectedMrsCoffee', this.playCoffeeStartEffect);
      this.bind('Coffee:speedUpEnded', this.playCoffeeEndEffect);
      this.bind('Runner:saysNice', this.playNiceEffect);
      this.mode = 'normal';
      this.bind('SceneChange', function(data) {
        if (data.newScene === 'Gameplay') {
          this.unbind('Runner:collectedMushroom', this.playMushroomStartEffect);
          this.unbind('Runner:collectedGuarana', this.playGuaranaStartEffect);
          this.unbind('Guarana:ended', this.playGuaranaEndEffect);
          this.unbind('Mushroom:ended', this.playMushroomEndEffect);
          this.bind("Runner:jumpEffect", this.playJumpEffect);
          this.bind('Runner:collectedGuarana', this.playGuaranaStartEffect);
          this.bind('Guarana:ended', this.playGuaranaEndEffect);
          this.bind('Runner:collectedMushroom', this.playMushroomStartEffect);
          this.bind('Mushroom:ended', this.playMushroomEndEffect);
          this.mode = 'normal';
        }
        if (data.oldScene === null && data.newScene === 'MainMenu') {
          return this.startMenuMusic();
        } else if (data.oldScene === 'MainMenu' && data.newScene === 'Gameplay') {
          Crafty.audio.stop('mainMenu');
          return Crafty.audio.play('gameplay', -1, Game.volume);
        } else if (data.oldScene === 'Gameplay' && data.newScene === 'GameOver') {
          this.unbind("Runner:jumpEffect", this.playJumpEffect);
          Crafty.audio.stop('gameplay');
          Crafty.audio.stop('mushroomBeat');
          Crafty.audio.stop('guaranaBeat');
          Crafty.audio.stop('victoryBeat');
          return Crafty.audio.play('gameOver', 1, 0.7);
        } else if (data.oldScene === 'GameOver' && data.newScene === 'Gameplay') {
          return Crafty.audio.play('gameplay', -1, Game.volume);
        }
      });
      this.bind('Siorb:victory', function() {
        this.mode = 'victory';
        setTimeout(function() {
          return Crafty.trigger('Siorb:victoryEnd');
        }, 83000);
        this.unbind('Guarana:ended', this.playGuaranaEndEffect);
        this.unbind('Mushroom:ended', this.playMushroomEndEffect);
        Crafty.audio.stop();
        return Crafty.audio.play('victoryBeat', 1, Game.volume);
      });
      return this.bind('Siorb:victoryEnd', function() {
        this.mode = 'normal';
        this.bind('Guarana:ended', this.playGuaranaEndEffect);
        this.bind('Mushroom:ended', this.playMushroomEndEffect);
        Crafty.audio.stop('victoryBeat');
        return Crafty.audio.play('gameplay', -1, Game.volume);
      });
    }
  });

  Crafty.c('BackgroundManager', {
    xScrollFrame: 0,
    yScrollFrame: 0,
    backgroundX: 0,
    xScrollingSpeed: 2,
    yScrollProportion: 3,
    init: function() {
      Game.window.style.backgroundPosition = '0px -1000px';
      this.bind('EnterFrame', this.scrollBackgroundX);
      return this.bind('Runner:jump', this.centerOnRunner);
    },
    scrollBackgroundX: function() {
      var backgroundY, position;
      this.xScrollFrame += 1;
      if (this.xScrollFrame === 1000) {
        this.xScrollFrame = 0;
      }
      if (this.xScrollFrame % 2) {
        position = Game.window.style.backgroundPosition;
        backgroundY = parseInt(position.split(' ')[1]);
        Game.window.style.backgroundPosition = this.backgroundX.toString() + "px " + backgroundY.toString() + "px";
        if (this.backgroundX === Game.width * 2) {
          return this.backgroundX = 0;
        } else {
          return this.backgroundX -= this.xScrollingSpeed;
        }
      }
    },
    centerOnRunner: function(data) {
      Game.view.y -= (data.y + Game.view.y) - Game.height / 2 + 75;
      Game.view.x -= (data.x + Game.view.x) - 50;
      this.yScrollFrame += 1;
      if (this.yScrollFrame === 1000) {
        this.yScrollFrame = 0;
      }
      if (this.yScrollFrame % this.yScrollProportion === 0) {
        return this.scrollBackgroundY(data);
      }
    },
    scrollBackgroundY: function(data) {
      var arr, backgroundY, treshold;
      arr = Game.window.style.backgroundPosition.split(' ')[1].split('');
      arr = arr.slice(0, arr.length - 2);
      treshold = data.up ? data.gy - data.jumpSpeed : data.gy;
      backgroundY = (Number(arr.join('')) - treshold / this.yScrollProportion).toString();
      return Game.window.style.backgroundPosition = this.backgroundX.toString() + "px " + backgroundY.toString() + "px";
    }
  });

  Crafty.c('BlackMaskManager', {
    fadeInMask: function() {
      return Crafty.e('BlackMask').isInvisible().show();
    },
    fadeOutMask: function() {
      return Crafty.e('BlackMask').isVisible().hide();
    },
    init: function() {
      this.requires('Persist');
      this.bind('SceneChange', function(data) {
        if (data.oldScene === null && data.newScene === 'MainMenu') {
          return this.fadeOutMask();
        } else if (data.oldScene === 'GameOver' && data.newScene === 'MainMenu') {
          return this.fadeOutMask();
        }
      });
      this.bind('Game:gameOverStarted', function() {
        return this.fadeOutMask();
      });
      return this.bind('Game:gameplayStarted', function() {
        return this.fadeOutMask();
      });
    }
  });

  Crafty.c('GameObserver', {
    absoluteScore: 0,
    init: function() {
      this.requires('Recyclable');
      this.bind('Runner:collectedGuarana', this.speedUpGuarana);
      this.bind('Runner:collectedLeaf', this.scorePoint);
      this.bind('Runner:collectedMrHot', function() {
        return this.losePoints('hot');
      });
      this.bind('Runner:collectedMrsCoffee', function() {
        return this.losePoints('coffee');
      });
      this.bind('Runner:collectedMushroom', this.scorePoint);
      this.bind('Runner:collectedMrsCoffee', this.speedUpCoffee);
      this.bind('Coffee:speedUpEnded', this.slowDownPlatforms);
      this.bind('Siorb:victory', this.handleVictory);
      this.bind('Siorb:victoryEnd', this.handleVictoryEnd);
      return this.bind('Siorb:MediumProbabilities', this.switchProbabilities);
    },
    setDefaultSpeedTo: function(newSpeed) {
      if (Game.floatSpeed < newSpeed) {
        Game.floatSpeed = newSpeed;
      }
      return Game.defaultFloatSpeed = newSpeed;
    },
    speedUpGuarana: function() {
      return this.speedUpPlatforms('guarana');
    },
    speedUpCoffee: function() {
      return this.speedUpPlatforms('coffee');
    },
    speedUpPlatforms: function(drug) {
      if (Game.floatSpeed <= Game.defaultFloatSpeed) {
        Game.floatSpeed += Game.speedUpValue;
      }
      if (Game.timeouts.slowDown1) {
        clearTimeout(Game.timeouts.slowDown1);
      }
      if (Game.timeouts.slowDown2) {
        clearTimeout(Game.timeouts.slowDown2);
      }
      Game.timeouts.slowDown1 = setTimeout(function() {
        return Game.floatSpeed = Game.defaultFloatSpeed + 1;
      }, Game.speedUpDuration - 1000);
      return Game.timeouts.slowDown2 = setTimeout(function() {
        Game.floatSpeed = Game.defaultFloatSpeed;
        if (drug === 'guarana') {
          return Crafty.trigger('Guarana:ended');
        } else {
          return Crafty.trigger('Coffee:speedUpEnded');
        }
      }, Game.speedUpDuration);
    },
    slowDownPlatforms: function() {
      if (Game.floatSpeed === Game.defaultFloatSpeed) {
        Game.floatSpeed -= 1;
      }
      if (Game.timeouts.slowDown1) {
        clearTimeout(Game.timeouts.slowDown1);
      }
      if (Game.timeouts.slowDown2) {
        clearTimeout(Game.timeouts.slowDown2);
      }
      return Game.timeouts.slowDown2 = setTimeout(function() {
        Game.floatSpeed = Game.defaultFloatSpeed;
        return Crafty.trigger('Coffee:slowDownEnded');
      }, Game.speedUpDuration / 2);
    },
    scorePoint: function(data) {
      Game.score += data.points;
      this.absoluteScore += data.points;
      this.setDifficulty();
      Crafty.trigger('ScoreBoard:updatePoints');
      if ((this.absoluteScore % 10) === 0 && (Game.score % Game.colorChangeScore) !== 0) {
        Crafty.trigger('Runner:saysSomething');
      }
      if (Game.score >= Game.victoryScore && Game.victory === false) {
        Crafty.trigger('Siorb:victory');
      }
      if (Game.score === Game.probabilitiesScore) {
        return Crafty.trigger('Siorb:MediumProbabilities');
      }
    },
    losePoints: function(type) {
      var penalty;
      penalty = type === 'hot' ? Game.hotPenalty : Game.coffeePenalty;
      if (Game.score >= penalty) {
        Game.score -= penalty;
      } else {
        Game.score = 0;
      }
      this.setDifficulty();
      return Crafty.trigger('ScoreBoard:updatePoints');
    },
    setDifficulty: function() {
      var colorLevel;
      colorLevel = parseInt(Game.score / Game.colorChangeScore) + 1;
      if (Game.colorLevel < colorLevel) {
        Game.colorLevel = colorLevel;
        Crafty.trigger('Runner:saysNice');
      }
      if (Game.score < Game.mediumScore) {
        return Game.platformSizes.current = Game.platformSizes.easy;
      } else if (Game.score < Game.hardScore && Game.mode === 'easy') {
        Game.mode = 'medium';
        this.setDefaultSpeedTo(Game.mediumFloatSpeed);
        return Game.platformSizes.current = Game.platformSizes.medium;
      } else if (Game.mode === 'medium' && Game.score >= Game.hardScore) {
        Game.mode = 'hard';
        return Game.platformSizes.current = Game.platformSizes.hard;
      }
    },
    handleVictory: function() {
      Game.victory = true;
      Game.leafProbability = Game.victoryLeafProbability;
      Game.guaranaProbability = Game.victoryGuaranaProbability;
      Game.mushroomProbability = Game.victoryMushroomProbability;
      Game.mrHotProbability = Game.victoryMrHotProbability;
      Game.mrsCoffeeProbability = Game.victoryMrsCoffeeProbability;
      this.setDefaultSpeedTo(Game.victoryFloatSpeed);
      return Game.runner.attach(Crafty.e('DiscoText'));
    },
    handleVictoryEnd: function() {
      Game.leafProbability = Game.mediumLeafProbability;
      Game.guaranaProbability = Game.mediumGuaranaProbability;
      Game.mrsCoffeeProbability = Game.mediumMrsCoffeeProbability;
      Game.mrHotProbability = Game.mediumMrHotProbability;
      Game.mushroomProbability = Game.mediumMushroomProbability;
      return this.setDefaultSpeedTo(Game.extremeFloatSpeed);
    },
    switchProbabilities: function() {
      Game.leafProbability = Game.mediumLeafProbability;
      Game.guaranaProbability = Game.mediumGuaranaProbability;
      Game.mrsCoffeeProbability = Game.mediumMrsCoffeeProbability;
      Game.mrHotProbability = Game.mediumMrHotProbability;
      return Game.mushroomProbability = Game.mediumMushroomProbability;
    }
  });

  Crafty.c('Recyclable', {
    init: function() {
      return this;
    }
  });

  Crafty.c('ComicCloud', {
    isVisible: false,
    delay: 3000,
    init: function() {
      this.requires('Base, spr_cloud');
      this.attr({
        z: 310
      });
      this.move('e', 100);
      this.move('s', 100);
      $(this._element).hide();
      return this.bind('Runner:saysSomething', this.showCloud);
    },
    showCloud: function() {
      if (!this.isVisible) {
        this.isVisible = true;
        $(this._element).stop().fadeIn('fast').delay(this.delay).fadeOut('fast');
        return setTimeout((function(_this) {
          return function() {
            return _this.isVisible = false;
          };
        })(this), this.delay);
      }
    }
  });

  Crafty.c('ComicSayings', {
    firstTime: true,
    isVisible: false,
    delay: 3000,
    phrasesCount: 13,
    init: function() {
      this.requires('Base, spr_sayings');
      this.attr({
        z: 310
      });
      this.move('e', 105);
      this.move('s', 119);
      $(this._element).hide();
      return this.bind('Runner:saysSomething', this.showSaying);
    },
    showSaying: function() {
      var spriteNum;
      spriteNum = this.firstTime ? (this.firstTime = false, 0) : Utils.rand(1, this.phrasesCount);
      this.sprite(0, spriteNum);
      if (!this.isVisible) {
        this.isVisible = true;
        $(this._element).stop().fadeIn('fast').delay(this.delay).fadeOut('fast');
        return setTimeout((function(_this) {
          return function() {
            return _this.isVisible = false;
          };
        })(this), this.delay);
      }
    }
  });

  Crafty.c('DiscoText', {
    delay: 2000,
    init: function() {
      this.requires('Base, SpriteAnimation, spr_disco_text');
      this.attr({
        x: 210,
        y: Game.runner.y + 50,
        z: 310
      });
      this.reel('DiscoText:Blinks', 500, [[0, 0], [0, 1]]);
      this.animate('DiscoText:Blinks', -1);
      return setTimeout((function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this), 10000);
    }
  });

  Crafty.c('Guarana', {
    name: 'guarana',
    init: function() {
      return this.requires('Collectable, spr_guarana');
    }
  });

  Crafty.c('Leaf', {
    name: 'leaf',
    init: function() {
      return this.requires('Collectable, spr_leaf');
    }
  });

  Crafty.c('ManaMeter', {
    init: function() {
      this.requires('Base, spr_mana');
      this.attr({
        x: 700,
        y: 100,
        w: 75,
        h: 75,
        z: 300,
        alpha: 0.6
      });
      return this.bind('ScoreBoard:updatePoints', this.updateYerbaLevel);
    },
    updateYerbaLevel: function() {
      var manaLevel;
      manaLevel = Game.score < 100 ? parseInt(Game.score / 10) : 10;
      return this.sprite(0, manaLevel);
    }
  });

  Crafty.c('MrHot', {
    name: 'mrHot',
    init: function() {
      this.requires('Collectable');
      this.attr({
        w: 50,
        h: 50,
        z: 304
      });
      return this.attach(Crafty.e('MrHotImage'));
    }
  });

  Crafty.c('MrHotImage', {
    init: function() {
      this.requires('Base, spr_mr_hot');
      this.attr({
        z: 301
      });
      this.move('w', 20);
      return this.move('n', 80);
    }
  });

  Crafty.c('MrsCoffee', {
    name: 'mrsCoffee',
    init: function() {
      this.requires('Collectable');
      this.attr({
        w: 50,
        h: 50
      });
      return this.attach(Crafty.e('MrsCoffeeImage'));
    }
  });

  Crafty.c('MrsCoffeeImage', {
    init: function() {
      this.requires('Base, spr_mrs_coffee');
      this.attr({
        z: 301
      });
      this.move('w', 30);
      return this.move('n', 60);
    }
  });

  Crafty.c('Mushroom', {
    name: 'mushroom',
    init: function() {
      return this.requires('Collectable, spr_mushroom');
    }
  });

  Crafty.c('PixelPoint', {
    init: function() {
      this.requires('Base, spr_digits');
      return this.attr({
        w: 12,
        h: 16,
        z: 301
      });
    },
    print: function(value) {
      this.sprite(0, value);
      return this;
    }
  });

  Crafty.c('PixelScoreBoard', {
    init: function() {
      this.requires('Base');
      this.attr({
        w: 200,
        h: 50,
        z: 301
      });
      return this;
    },
    printScore: function(scoreType) {
      var score;
      score = scoreType === 'current' ? Game.score : scoreType === 'top' ? localStorage.getItem('highScore') : 0;
      return _.each(score.toString().split(''), (function(_this) {
        return function(point, index) {
          var pixelPoint;
          point = parseInt(point);
          pixelPoint = Crafty.e('PixelPoint').print(point).at(_this.x + (12 * index), _this.y);
          if (Game.scene === 'GameOver') {
            return pixelPoint.attr({
              alpha: 0.5
            });
          }
        };
      })(this));
    },
    displayAt: function(x, y, type) {
      this.at(x, y);
      return this.printScore(type);
    }
  });

  Crafty.c('Platform', {
    sizesSize: null,
    init: function() {
      this.requires('Base, Solid, Floatable');
      this.sizesSize = Game.platformSizes.current.length;
      this.attr({
        h: 15,
        w: Game.platformSizes.current[Utils.rand(0, this.sizesSize)],
        z: 200
      });
      return this.bind('EnterFrame', this.resetPosition);
    },
    setLevel: function(num) {
      var currentLevel;
      $(this._element).removeClass(function(index, css) {
        return (css.match(/level/g || [])).join(' ');
      });
      currentLevel = "level" + num;
      return $(this._element).addClass(currentLevel);
    },
    resetPosition: function() {
      var higher, lower, random, x, yOffset;
      if (this.x < -250) {
        this.setLevel(Game.colorLevel);
        higher = [-168, -84];
        lower = [84, 168];
        random = [-84, 84];
        yOffset = this.y > 1300 ? higher[Utils.rand(0, 2)] : this.y < 1000 ? lower[Utils.rand(0, 2)] : random[Utils.rand(0, 2)];
        this.attr({
          w: Game.platformSizes.current[Utils.rand(0, this.sizesSize)]
        });
        x = Utils.rand(this.width + 200, this.width + 400);
        this.at(Game.width, this.y + yOffset);
        if (Math.random() > 0.55) {
          return this.generateCollectable(this.x + 30, this.y - 50);
        }
      }
    },
    generateCollectable: function(x, y) {
      var random, xOffset;
      random = Math.random();
      xOffset = Utils.rand(20, 30);
      if (random < Game.leafProbability) {
        return Crafty.e('Leaf').at(x + xOffset, y);
      } else if (random < Game.guaranaProbability) {
        return Crafty.e('Guarana').at(x + xOffset, y + 20);
      } else if (random < Game.mrsCoffeeProbability) {
        return Crafty.e('MrsCoffee').at(x + xOffset, y);
      } else if (random < Game.mrHotProbability) {
        return Crafty.e('MrHot').at(x + xOffset, y);
      } else {
        return Crafty.e('Mushroom').at(x + xOffset, y + 6);
      }
    }
  });

  Crafty.c('PsychoVision', {
    isAnimating: false,
    duration: Game.mushroomDuration,
    init: function() {
      this.requires('Base, spr_psycho');
      this.bind('Runner:psychoVision', this.showVision);
      this.attr({
        x: 0,
        y: 76,
        z: 200,
        alpha: 0
      });
      return $(this._element).css('display', "none");
    },
    showVision: function() {
      if (!this.isAnimating) {
        $(this._element).css('opacity', '0.01').css('display', 'block').fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0.1).fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0.1).fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0.1).fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0.1).fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0.1).fadeTo(this.duration / 12, 0.2).fadeTo(this.duration / 12, 0);
        setTimeout((function(_this) {
          return function() {
            return $(_this._element).css('display', 'none');
          };
        })(this), Game.mushroomDuration);
        this.isAnimating = true;
        Crafty.trigger('Face:crazy');
        return setTimeout((function(_this) {
          return function() {
            _this.isAnimating = false;
            Crafty.trigger('Face:stopCrazy');
            return Crafty.trigger('Mushroom:ended');
          };
        })(this), this.duration);
      }
    }
  });

  Crafty.c('Runner', {
    speedValue: 0,
    jumpValue: 10,
    backgroundX: 0,
    gravityValue: 0.60,
    scaredFaceVelocity: 40,
    init: function() {
      var bestScore;
      this.requires('Base, Twoway, Gravity');
      this.attr({
        x: 50,
        y: Game.height / 2,
        w: 50,
        h: 10,
        z: 300
      });
      this.attach(Crafty.e('RunnerBlush'));
      this.attach(Crafty.e('RunnerImage'));
      this.attach(Crafty.e('RunnerFace'));
      this.attach(Crafty.e('PsychoVision'));
      this.attach(Crafty.e('ComicCloud'));
      this.attach(Crafty.e('ComicSayings'));
      if (Game.sharedOnFB) {
        this.attach(Crafty.e('RunnerGlasses'));
      }
      bestScore = parseInt(localStorage.getItem('highScore'));
      if (bestScore < 10) {
        this.attach(Crafty.e('ControlsHint'));
      }
      this.twoway(this.speedValue, this.jumpValue);
      this.gravity('Solid');
      this.gravityConst(this.gravityValue);
      this.bind("Move", this.runnerDidMove);
      this.multijumps(2, this.jumpValue / 2, true);
      this.bind('Collected', this.handleCollected);
      this.bind('Guarana:ended', function() {
        return this.gravityConst(this.gravityValue);
      });
      return this.bind('Runner:collectedMrsCoffee', function() {
        return this.gravityConst(this.gravityValue);
      });
    },
    runnerDidMove: function() {
      if (this._gy !== 0) {
        if (this._gy > this.scaredFaceVelocity) {
          Crafty.trigger('Face:falling');
        }
        if (this._gy > 20) {
          Crafty.trigger('Runner:falling');
        }
        return Crafty.trigger('Runner:jump', {
          gy: this._gy,
          up: this._up,
          jumpSpeed: this._jumpSpeed,
          x: this.x,
          y: this.y
        });
      }
    },
    at: function(x, y) {
      return this.attr({
        x: x,
        y: y
      });
    },
    handleCollected: function(data) {
      if (data.name === 'guarana') {
        Crafty.trigger('Runner:collectedGuarana');
        return this.gravityConst(this.gravityValue - 0.2);
      } else if (data.name === 'leaf') {
        return Crafty.trigger('Runner:collectedLeaf', {
          points: 1
        });
      } else if (data.name === 'mushroom') {
        Crafty.trigger('Runner:collectedMushroom', {
          points: 1
        });
        return Crafty.trigger('Runner:psychoVision');
      } else if (data.name === 'mrsCoffee') {
        return Crafty.trigger('Runner:collectedMrsCoffee');
      } else if (data.name === 'mrHot') {
        return Crafty.trigger('Runner:collectedMrHot');
      }
    }
  });

  Crafty.c('RunnerBigGlasses', {
    init: function() {
      this.requires('Base, spr_big_glasses');
      return this.attr({
        z: 310
      });
    }
  });

  Crafty.c('RunnerBlush', {
    init: function() {
      this.requires('Base, spr_blush');
      this.attr({
        z: 310
      });
      this.move('e', 25);
      this.move('s', 148);
      this.bind('Runner:collectedMrHot', this.showBlush);
      return $(this._element).hide();
    },
    showBlush: function() {
      return $(this._element).stop().fadeIn('slow').delay(3000).fadeOut('slow');
    }
  });

  Crafty.c('RunnerFace', {
    mode: 'normal',
    init: function() {
      this.requires('Base, SpriteAnimation, spr_face');
      this.attr({
        z: 299
      });
      this.move('e', 23);
      this.move('s', 148);
      this.bind('Face:fasterGuarana', this.faceFasterGuarana);
      this.bind('Face:fasterCoffee', this.faceFasterCoffee);
      this.bind('Face:slowerCoffee', this.faceSlowerCoffee);
      this.bind('Face:normal', this.faceNormal);
      this.bind('Face:crazy', this.faceCrazy);
      this.bind('Face:stopCrazy', this.faceStopCrazy);
      this.bind('Face:falling', this.faceFalling);
      return this.bind('Siorb:victory', this.handleVictoryFace);
    },
    faceNormal: function() {
      return this.sprite(0, 0);
    },
    faceFasterGuarana: function() {
      return this.sprite(0, 3);
    },
    faceFasterCoffee: function() {
      return this.sprite(0, 5);
    },
    faceSlowerCoffee: function() {
      return this.sprite(0, 4);
    },
    faceFalling: function() {
      return this.sprite(0, 2);
    },
    faceCrazy: function() {
      this.unbind('Face:normal', this.faceNormal);
      this.unbind('Face:fasterGuarana', this.faceFasterGuarana);
      this.unbind('Face:fasterCoffee', this.faceFasterCoffee);
      this.unbind('Face:slowerCoffee', this.faceSlowerCoffee);
      if (this.mode !== 'victory') {
        this.mode = 'crazy';
        return this.sprite(0, 1);
      }
    },
    faceStopCrazy: function() {
      this.bind('Face:normal', this.faceNormal);
      this.bind('Face:fasterGuarana', this.faceFasterGuarana);
      this.bind('Face:fasterCoffee', this.faceFasterCoffee);
      this.bind('Face:slowerCoffee', this.faceSlowerCoffee);
      this.mode = 'normal';
      return this.sprite(0, 0);
    },
    handleVictoryFace: function() {
      this.unbind('Face:normal', this.faceNormal);
      this.unbind('Face:fasterGuarana', this.faceFasterGuarana);
      this.unbind('Face:fasterCoffee', this.faceFasterCoffee);
      this.unbind('Face:slowerCoffee', this.faceSlowerCoffee);
      this.unbind('Face:crazy', this.faceCrazy);
      this.unbind('Face:stopCrazy', this.faceStopCrazy);
      this.mode = 'victory';
      return this.sprite(0, 3);
    }
  });

  Crafty.c('RunnerGlasses', {
    init: function() {
      this.requires('Base, spr_glasses');
      this.attr({
        z: 310
      });
      this.move('e', 23);
      return this.move('s', 147);
    }
  });

  Crafty.c('RunnerImage', {
    mode: 'normal',
    init: function() {
      this.requires('Base, SpriteAnimation, spr_runner');
      this.attr({
        z: 299
      });
      this.move('e', 25);
      this.move('s', 148);
      this.reel('Runner:Runs', 300, 0, 0, 3);
      this.reel('Runner:RunsSlower', 500, 0, 0, 3);
      this.reel('Runner:RunsFaster', 150, 0, 0, 3);
      this.animate('Runner:Runs', -1);
      this.bind('hitGround', this.groundHitPose);
      this.bind('Runner:collectedGuarana', this.runFasterGuarana);
      this.bind('Runner:collectedMrsCoffee', this.runFasterCoffee);
      return this.bind('Coffee:speedUpEnded', this.runSlowerCoffee);
    },
    groundHitPose: function() {
      this.resumeAnimation();
      this.bind('Runner:falling', this.fallingPose);
      if (this.mode === 'normal') {
        this.bind("Runner:jump", this.jumpPose);
        Crafty.trigger('Face:normal');
        return this.animate('Runner:Runs', -1);
      }
    },
    fallingPose: function() {
      this.unbind('Runner:falling');
      return this.animate('Runner:RunsFaster', -1);
    },
    jumpPose: function() {
      if (this.mode === 'normal') {
        this.pauseAnimation();
        this.sprite(0, 1);
        return this.unbind("Runner:jump");
      }
    },
    runFasterGuarana: function() {
      this.mode = 'guarana';
      Crafty.trigger('Face:fasterGuarana');
      return this.runFasterAnimation();
    },
    runFasterCoffee: function() {
      this.mode = 'coffee';
      Crafty.trigger('Face:fasterCoffee');
      return this.runFasterAnimation();
    },
    runSlowerCoffee: function() {
      Crafty.trigger('Face:slowerCoffee');
      this.animate('Runner:RunsSlower', -1);
      if (Game.timeouts.speedAnimation) {
        clearTimeout(Game.timeouts.speedAnimation);
      }
      return Game.timeouts.speedAnimation = setTimeout((function(_this) {
        return function() {
          _this.mode = 'normal';
          Crafty.trigger('Face:normal');
          return _this.animate('Runner:Runs', -1);
        };
      })(this), Game.speedUpDuration / 2);
    },
    runFasterAnimation: function() {
      this.animate('Runner:RunsFaster', -1);
      if (Game.timeouts.speedAnimation) {
        clearTimeout(Game.timeouts.speedAnimation);
      }
      return Game.timeouts.speedAnimation = setTimeout((function(_this) {
        return function() {
          if (_this.mode === 'guarana') {
            _this.mode = 'normal';
            Crafty.trigger('Face:normal');
            return _this.animate('Runner:Runs', -1);
          }
        };
      })(this), Game.speedUpDuration);
    }
  });

  Crafty.c('RunnerKiller', {
    deathGrenzenY: 1800,
    deathHappened: false,
    init: function() {
      this.requires('Base, Collision');
      this.attr({
        x: 0,
        y: this.deathGrenzenY,
        h: 200,
        w: Game.width
      });
      return this.onHit('RunnerImage', function() {
        if (!this.deathHappened) {
          this.deathHappened = true;
          Crafty("ScoreBoard").destroy();
          Crafty("ManaMeter").destroy();
          Crafty("PsychoVision").destroy();
          Crafty("DiscoText").destroy();
          setTimeout(function() {
            return Crafty("BackgroundManager").destroy();
          }, 1000);
          return setTimeout(function() {
            if (Game.timeouts.speedAnimation) {
              clearTimeout(Game.timeouts.speedAnimation);
            }
            if (Game.timeouts.slowDown1) {
              clearTimeout(Game.timeouts.slowDown1);
            }
            if (Game.timeouts.slowDown2) {
              clearTimeout(Game.timeouts.slowDown2);
            }
            Game.floatSpeed = Game.defaultFloatSpeed;
            return Game.runScene.gameOver();
          }, 2500);
        }
      });
    }
  });

  Crafty.c('ScoreBoard', {
    init: function() {
      this.requires('2D, DOM, Text');
      this.attr({
        x: 730,
        y: 135,
        w: 400,
        z: 301
      });
      this.textFont({
        type: 'italic',
        size: "20px",
        family: 'Arial'
      });
      this.text("" + Game.score);
      return this.bind('ScoreBoard:updatePoints', this.updateScoreBoard);
    },
    updateScoreBoard: function() {
      return this.text("" + Game.score);
    }
  });

  Crafty.c('FBLikeButton', {
    init: function() {
      var html2;
      this.requires('Base');
      this.attr({
        x: 10,
        y: 10,
        w: 50,
        h: 50
      });
      html2 = "<div class='fb-like' data-href='https://www.facebook.com/dobrezielepl' data-layout='standard' data-action='like' data-show-faces='false' data-share='false'></div>";
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/pl_PL/all.js#xfbml=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));;
      return $(this._element).append(html2);
    }
  });

  Crafty.c('BlackMask', {
    init: function() {
      this.requires('Base');
      this.color('black');
      this.attr({
        x: 0,
        y: Crafty.viewport.y,
        w: Game.width + 200,
        h: Game.height + 200,
        z: 358
      });
      return setTimeout((function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this), 2000);
    },
    isVisible: function() {
      this.attr({
        alpha: 1
      });
      return this;
    },
    isInvisible: function() {
      this.attr({
        alpha: 0
      });
      return this;
    },
    show: function() {
      return setTimeout((function(_this) {
        return function() {
          return $(_this._element).fadeIn('slow');
        };
      })(this), 300);
    },
    hide: function() {
      return setTimeout((function(_this) {
        return function() {
          return $(_this._element).fadeOut('slow');
        };
      })(this), 300);
    }
  });

  Crafty.c('Button', {
    init: function() {
      this.requires('Base, Text');
      $(this._element).fadeTo(100, 0.7);
      return $(this._element).hover(((function(_this) {
        return function() {
          return $(_this._element).stop().fadeTo(200, 1);
        };
      })(this)), (function(_this) {
        return function() {
          return $(_this._element).stop().fadeTo(200, 0.7);
        };
      })(this));
    }
  });

  Crafty.c('ButtonWithLink', {
    init: function() {
      return this.requires('2D, DOM');
    },
    addLink: function(url, image, title) {
      var html, link;
      html = "<a href=" + url + " target='_blank'><img src='assets/images/" + image + "' title='" + title + "'</img></a>";
      $(this._element).append(html);
      link = $(this._element).children()[0];
      $(link).stop().fadeTo(0, 0.9);
      $(link).hover(function() {
        return $(link).stop().fadeTo(200, 1);
      }, function() {
        return $(link).stop().fadeTo(200, 0.9);
      });
      return this;
    },
    at: function(x, y) {
      this.attr({
        x: x,
        y: y
      });
      return this;
    }
  });

  Crafty.c('ControlsHint', {
    displayTime: 4,
    init: function() {
      this.requires('Base, spr_hints');
      this.attr({
        alpha: 0.7,
        z: 312
      });
      this.move('e', 250);
      this.move('s', 400);
      return setTimeout((function(_this) {
        return function() {
          $(_this._element).fadeOut('slow');
          return setTimeout(function() {
            return _this.destroy();
          }, 2000);
        };
      })(this), this.displayTime * 1000);
    }
  });

  Crafty.c('GameOverAd', {
    init: function() {
      var adNumber, image;
      this.requires('ButtonWithLink');
      this.attr({
        x: 400,
        y: 210
      });
      if (Math.random() < 0.3) {
        adNumber = Math.random() < 0.5 ? 1 : 2;
        image = "gameOverAd" + adNumber + ".png";
        return this.addLink('http://www.dobreziele.pl', image, 'Dobre Ziele');
      }
    }
  });

  Crafty.c('GameOverShortcuts', {
    enterCode: 13,
    shiftCode: 16,
    escCode: 27,
    init: function() {
      this.requires('Recyclable, Keyboard');
      return this.bind('KeyDown', function(keystroke) {
        if (keystroke.keyCode === this.enterCode || keystroke.keyCode === this.shiftCode) {
          if (Game.victory) {
            return window.location.reload();
          } else {
            return Game.runScene.gameplay();
          }
        } else if (keystroke.keyCode === this.escCode) {
          return window.location.reload();
        }
      });
    }
  });

  Crafty.c('GameplayShortcuts', {
    spaceCode: 32,
    init: function() {
      this.requires('Recyclable, Keyboard, Mouse');
      this.bind('KeyDown', function(keystroke) {
        if (keystroke.keyCode === this.spaceCode) {
          this.makeRunnerJump();
        }
        return true;
      });
      return $('#game').on("click", (function(_this) {
        return function(data) {
          Crafty.trigger('Runner:jumpEffect');
          return _this.makeRunnerJump();
        };
      })(this));
    },
    makeRunnerJump: function() {
      var keystrokeData;
      keystrokeData = {
        key: 38
      };
      return Crafty.trigger("KeyDown", keystrokeData);
    }
  });

  Crafty.c('InstructionField', {
    init: function() {
      var content, scrollButtonsX, scrollButtonsY;
      this.requires('Base');
      this.attr({
        x: 330,
        y: 130
      });
      content = "<div class='jcarousel'> <ul> <li><img src='assets/images/instruction1.png' width='431' height='287' alt=''></li> <li><img src='assets/images/instruction2.png' width='431' height='287' alt=''></li> <li><img src='assets/images/instruction3.png' width='431' height='287' alt=''></li> </ul> </div>";
      scrollButtonsY = 370;
      scrollButtonsX = 500;
      Crafty.e('Button, arrow_l_button, jcarousel-prev').at(scrollButtonsX, scrollButtonsY);
      Crafty.e('Button, arrow_r_button, jcarousel-next').at(scrollButtonsX + 60, scrollButtonsY);
      $(this._element).append(content);
      $('.jcarousel').jcarousel({
        animation: {
          duration: 400
        }
      });
      $(".jcarousel-prev").on("jcarouselcontrol:active", function() {
        return $(this).removeClass("inactive");
      }).on("jcarouselcontrol:inactive", function() {
        return $(this).addClass("inactive");
      }).jcarouselControl({
        target: "-=1"
      });
      return $(".jcarousel-next").on("jcarouselcontrol:active", function() {
        return $(this).removeClass("inactive");
      }).on("jcarouselcontrol:inactive", function() {
        return $(this).addClass("inactive");
      }).jcarouselControl({
        target: "+=1"
      });
    }
  });

  Crafty.c('LogoButton', {
    init: function() {
      this.requires('ButtonWithLink');
      this.attr({
        x: 160,
        y: 330
      });
      return this.addLink('http://www.dobreziele.pl', 'zieleLogo.png', 'Dobre Ziele');
    }
  });

  Crafty.c('ReturnButton', {
    clicked: false,
    init: function() {
      this.requires('Button, powrot_button');
      this.at(750, 365);
      return $(this._element).on('click', (function(_this) {
        return function() {
          if (!_this.clicked) {
            _this.clicked = true;
            return Game.runScene.mainMenu();
          }
        };
      })(this));
    }
  });

  Crafty.c('SoundButton', {
    init: function() {
      this.requires('Button, sound_button');
      this.at(Game.width - 45, 10);
      this.chooseSprite();
      return $(this._element).on('click', (function(_this) {
        return function() {
          Crafty.audio.toggleMute();
          _this.chooseSprite();
          if (localStorage.getItem('muted') === 'false') {
            return localStorage.setItem('muted', true);
          } else {
            return localStorage.setItem('muted', false);
          }
        };
      })(this));
    },
    chooseSprite: function() {
      var spriteNumber;
      spriteNumber = Crafty.audio.muted ? 0 : 1;
      return this.sprite(spriteNumber, 0);
    }
  });

  Crafty.scene('Authors', function() {
    var textX, topY, yOffset;
    Game.scene = 'Authors';
    Crafty.e('SoundButton');
    Crafty.background("url('" + Game.host + "/images/mainMenuBg.png')");
    Crafty.e('LogoButton');
    Crafty.e('ReturnButton');
    topY = 120;
    yOffset = 60;
    textX = 330;
    Crafty.e('Base, aut_boss_text').at(textX, topY);
    Crafty.e('ButtonWithLink').addLink('http://www.dobreziele.pl', 'autBossLogo.png', 'Dobre Ziele').at(textX + 140, topY - 20);
    Crafty.e('Base, aut_pablo_text').at(textX, topY + yOffset);
    Crafty.e('ButtonWithLink').addLink('http://www.github.com/pawurb', 'autPabloLogo.png', 'GitHub').at(textX + 210, topY + 40);
    Crafty.e('Base, aut_cebula_text').at(textX, topY + yOffset * 2);
    Crafty.e('ButtonWithLink').addLink('http://cebulaa.daportfolio.com/', 'autCebulaLogo.png', 'Portfolio').at(textX + 150, topY + 75);
    Crafty.e('Base, aut_music_text').at(textX, topY + yOffset * 3);
    Crafty.e('ButtonWithLink').addLink('http://soundcloud.com/', 'autHarryLogo.png', 'SoundCloud').at(textX + 200, topY + 160);
    return $('#sharingModal-btn').hide();
  }, function() {
    return Crafty('Recyclable').destroy();
  });

  Crafty.scene('GameOver', function() {
    var buttonsOffset, menu_button, offset, playDuration, replayButton;
    Game.scene = 'GameOver';
    Crafty.background("url('" + Game.host + "/images/gameOverBg.png')");
    Crafty.viewport.y = 0;
    Crafty.trigger('Game:gameOverStarted');
    Crafty.e('GameOverShortcuts');
    if (Game.score > parseInt(localStorage.getItem('highScore'))) {
      localStorage.setItem('highScore', Game.score);
    }
    playDuration = parseInt(((new Date).getTime() - Game.gameplayStarted) / 1000);
    Game.submitStatistic(Game.score, playDuration);
    Game.submitScore(Game.score);
    offset = 24;
    Crafty.e('PixelScoreBoard').displayAt(offset + 205, Game.height - offset * 3, 'current');
    Crafty.e('Base, gOpunkty_button').at(offset, Game.height - offset * 3);
    Crafty.e('Base, gOrekord_button').at(offset, Game.height - offset * 2);
    Crafty.e('PixelScoreBoard').displayAt(offset + 144, Game.height - offset * 2, 'top');
    buttonsOffset = 215;
    replayButton = Crafty.e('Button, jeszcze_button');
    replayButton.at(Game.width - offset - buttonsOffset, Game.height - offset * 3);
    $(replayButton._element).on('click', function() {
      if (Game.victory) {
        return window.location.reload();
      } else {
        return Game.runScene.gameplay();
      }
    });
    menu_button = Crafty.e('Button, menu_button');
    menu_button.at(Game.width - offset - buttonsOffset + 37, Game.height - offset * 2);
    $(menu_button._element).on('click', function() {
      return window.location.reload();
    });
    return Crafty.e('GameOverAd');
  }, function() {
    return Crafty('Recyclable').destroy();
  });

  Crafty.scene('Gameplay', function() {
    var generatePlatforms, setDefaults, shortcutManager;
    generatePlatforms = function() {
      var i, level, platformArrangements, randomArrangement, xPos, yPos, _i, _results;
      Game.platformSizes.current = Game.platformSizes.easy;
      platformArrangements = [[1, 0, 1, 2, 0, 0, 3, 4, 1, 2, 3], [5, 1, 0, 2, 0, 5, 3, 0, 3, 5, 4], [0, 1, 2, 4, 0, 5, 0, 2, 3, 0, 1], [0, 2, 1, 2, 0, 4, 1, 3, 2, 5, 4]];
      randomArrangement = platformArrangements[Utils.rand(0, platformArrangements.length)];
      _results = [];
      for (i = _i = 0; _i <= 10; i = ++_i) {
        level = randomArrangement[i];
        yPos = 200 + (Game.height - Game.height / 5 * level - 20);
        xPos = Game.width / 5 * i;
        _results.push(Crafty.e('Platform').at(xPos, yPos).setLevel(Game.colorLevel));
      }
      return _results;
    };
    setDefaults = function() {
      Game.victory = false;
      Game.mode = 'easy';
      Game.floatSpeed = Game.initialFloatSpeed;
      Game.defaultFloatSpeed = Game.initialFloatSpeed;
      Game.leafProbability = Game.easyLeafProbability;
      Game.guaranaProbability = Game.easyGuaranaProbability;
      Game.mrsCoffeeProbability = Game.easyMrsCoffeeProbability;
      Game.mrHotProbability = Game.easyMrHotProbability;
      return Game.mushroomProbability = Game.easyMushroomProbability;
    };
    setDefaults();
    Crafty.trigger('Game:gameplayStarted');
    $('#sharingModal-btn').remove();
    Game.gameplayStarted = (new Date).getTime();
    Game.scene = 'Gameplay';
    Game.score = 0;
    Crafty.background('');
    Game.window = document.getElementById('game');
    $('#game').focus();
    Game.window.style.backgroundPositionY = '0px';
    Game.runner = Crafty.e('Runner');
    Game.view = Crafty.viewport;
    generatePlatforms();
    Crafty.e('BackgroundManager');
    shortcutManager = Crafty.e('GameplayShortcuts');
    Game.runner.attach(Crafty.e('ScoreBoard'));
    Game.runner.attach(Crafty.e('ManaMeter'));
    Crafty.e('GameObserver');
    Crafty.e('RunnerKiller');
    Crafty.pause();
    return setTimeout(function() {
      Crafty.pause();
      return Crafty.trigger('Runner:saysSomething');
    }, 1000);
  }, function() {
    $("#game").unbind("click");
    return Crafty('Recyclable').destroy();
  });

  Crafty.scene('Instruction', function() {
    Game.scene = 'Instruction';
    Crafty.e('SoundButton');
    Crafty.background("url('" + Game.host + "/images/mainMenuBg.png')");
    Crafty.e('InstructionField');
    Crafty.e('LogoButton');
    Crafty.e('ReturnButton');
    return $('#sharingModal-btn').hide();
  }, function() {
    return Crafty('Recyclable').destroy();
  });

  Crafty.scene('MainMenu', function() {
    var authorsButton, buttonOffset, firstYCoord, instructionButton, startButton;
    Game.scene = 'MainMenu';
    Game.firstMainMenu = false;
    Crafty.viewport.y = 0;
    firstYCoord = 200;
    buttonOffset = 60;
    startButton = Crafty.e('Button, start_button').at(485, firstYCoord);
    instructionButton = Crafty.e('Button, instrukcja_button').at(492, firstYCoord + buttonOffset);
    authorsButton = Crafty.e('Button, tworcy_button').at(526, firstYCoord + buttonOffset * 2);
    Crafty.e('Base, rekord_button').at(Game.width - 210, Game.height - 30);
    Crafty.e('Base, leaves_image').at(429, 90);
    Crafty.e('RunnerImage').at(544, 90);
    Crafty.e('RunnerFace').at(544, 90);
    if (Game.sharedOnFB) {
      Crafty.e('RunnerGlasses').at(544, 90);
      Crafty.e('RunnerBigGlasses').at(105, 220);
    }
    Crafty.background("url('" + Game.host + "/images/mainMenuBg.png')");
    Crafty.e('PixelScoreBoard').displayAt(740, 390, 'top');
    Crafty.e('SoundButton');
    Crafty.e('LogoButton');
    if (!Game.firstMainMenu) {
      Crafty.e('FBLikeButton');
    }
    $('#sharingModal-btn').show();
    return jQuery(function() {
      var authorsClicked, instructionClicked, startClicked;
      startClicked = false;
      $(startButton._element).on('click', function() {
        if (!startClicked) {
          startButton.sprite(0, 1);
          startClicked = true;
          return Game.runScene.gameplay();
        }
      });
      instructionClicked = false;
      $(instructionButton._element).on('click', function() {
        if (!instructionClicked) {
          instructionClicked = true;
          return Game.runScene.instruction();
        }
      });
      authorsClicked = false;
      return $(authorsButton._element).on('click', function() {
        if (!authorsClicked) {
          authorsClicked = true;
          return Game.runScene.authors();
        }
      });
    });
  }, function() {
    return Crafty('Recyclable').destroy();
  });

  window.Utils = {
    rand: function(min, max) {
      var range;
      if (max == null) {
        max = min;
        min = 0;
      }
      range = max - min;
      return Math.floor((Math.random() * range) + min);
    }
  };

}).call(this);

/*
//# sourceMappingURL=siorb.js.map
*/
