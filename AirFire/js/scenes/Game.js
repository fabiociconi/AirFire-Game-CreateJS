(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_UP = 38;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;

    var background, background2;
    var spaceship;
    var p = Game.prototype = new createjs.Container();

    var leftKeyDown, upKeyDown, rightKeyDown, downKeyDown = false;

    p.Container_initialize = p.initialize;

    p.msgTxt = null;
    p.asteroidContainer = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addSpaceship();
        this.addMessages();
        this.createAsteroidContainer();
        this.createAsteroids();
        //this.moveSpaceship();
        //this.stopSpaceship();
        
    }
    p.addBackground = function () {

        var imgBackground = 'images/milkyway.jpg';

        background = new createjs.Bitmap(imgBackground);
        background.scaleX = background.scaleY = 0.2;
        this.addChild(background);  

        background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 0.2;
        background2.x = 1200;

        background.speed = background2.speed =  -0.9;

        this.addChild(background2);  


    }

     p.addSpaceship = function () {

         var imgSpaceship = 'images/spaceship.png';

         spaceship = new createjs.Bitmap(imgSpaceship);
         spaceship.x = 50
         spaceship.y = (canvas.height / 2);
         this.addChild(spaceship);

         window.onkeydown = moveSpaceship;
         window.onkeyup = stopSpaceship;
     }


    p.addMessages = function () {
        this.msgTxt = new createjs.Text("HELLO", '24px Arial', '#FFF');
        this.addChild(this.msgTxt);
    }
    p.createAsteroidContainer = function () {
        this.asteroidContainer = new createjs.Container();
        this.addChild(this.asteroidContainer);
    }
    p.createAsteroids = function () {
        var i, asteroid, color;
        var asteroids = this.asteroidContainer;
        var numAsteroids = 12;
        var asteroidSize = 25;
        for (i = 0; i < numAsteroids; i++) {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16)
            asteroid = new PulsingOrb(color, asteroidSize);
            asteroid.speed = Math.random() * 2 + 2;
            asteroid.size = asteroidSize;
            asteroid.x = 800;
            asteroid.y = asteroidSize + (Math.random() * numAsteroids * asteroidSize * 2);
            asteroids.addChild(asteroid);
        }
    }

    p.update = function () {

        //Moving Asteroids
        var i, asteroid, nextX;
        var len = this.asteroidContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            nextX = asteroid.x - asteroid.speed;

            if (nextX - asteroid.size < 0) {
                 nextX = canvas.width + asteroid.size;
            }

            asteroid.nextX = nextX;
        }


        //Moving Spaceship
        var bg1NextX, bg2NextX;

        bg1NextX = background.x + background.speed;
        bg2NextX = background2.x + background2.speed;

        background.x = bg1NextX;
        background2.x = bg2NextX;
        
        if (background.x <= -1200) {
            background.x = background2.x + 1200;            
        }
        if (background2.x <= -1200) {
            background2.x = background.x + 1200;            
        }

        var nextX = spaceship.x;
        var nextY = spaceship.y;

        if (leftKeyDown) 
        {
            nextX = spaceship.x - 10;
        }
        else if (rightKeyDown) 
        {
            nextX = spaceship.x + 10;
        }
        else if (upKeyDown) 
        {
            nextY = spaceship.y - 10;
        }
        else if (downKeyDown) 
        {
            nextY = spaceship.y + 10;
        }

        spaceship.x = nextX;
        spaceship.y = nextY;

    }

     function moveSpaceship(e) {
         e = !e ? window.event : e;
         switch (e.keyCode) {
             case ARROW_KEY_LEFT:
                 leftKeyDown = true;
                 break;
             case ARROW_KEY_UP:
                 upKeyDown = true;
                 break;  
             case ARROW_KEY_RIGHT:
                 rightKeyDown = true;
                 break;
             case ARROW_KEY_DOWN:
                 downKeyDown = true;
                 break;
         }
     }

     function stopSpaceship(e) {
         e = !e ? window.event : e;
         switch (e.keyCode) {
             case 37:
                 leftKeyDown = false;
                 break;
             case 38:
                 upKeyDown = false;
                 break;
             case 39:
                 rightKeyDown = false;
                 break;
             case 40:
                 downKeyDown = false;
                 break;
         }
     }

    p.render = function () {
        var i, astreroid;
        var len = this.asteroidContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            asteroid.x = asteroid.nextX;
        }
        this.msgTxt.text = "ASTEROIDS LEFT: " + this.asteroidContainer.getNumChildren();
    }
    p.checkGame = function () {
        if (!this.asteroidContainer.getNumChildren()) {
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
    }
    p.run = function () {
        this.update();
        this.render();
        this.checkGame();
    }

    window.game.Game = Game;

}(window));