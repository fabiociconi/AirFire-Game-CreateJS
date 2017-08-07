(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    //Key Constants
    const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_UP = 38;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;
    const SPACE_BAR = 32;

    //Stage Constants
    const STAGE_WIDTH = 1200;
    const BG_WIDTH = 1800;

    //Backgrounds
    var background1, background2;

    //The Spaceship
    //var spaceship;
    var nave;

    var txtScore;
    var p = Game.prototype = new createjs.Container();
    var leftKeyDown, upKeyDown, rightKeyDown, downKeyDown = false;
    var shootKeyDown = false;
    p.Container_initialize = p.initialize;
    p.msgTxt = null;
    p.asteroidContainer = null;
    p.bulletContainer = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addPauseButton();//pause button
        this.addSpaceship();
        this.addMessages();
        this.createAsteroidContainer();
        this.createAsteroids();
        this.createBulletContainer();
        this.createBullets();

    }
    //fabio ARRUMAR ESTA BAGUNCA
    p.addPauseButton = function (e) {
        var btn, event;
        btn = new ui.SimpleButton('||');
        btn.on('click', this.pausePORRA, this);
        btn.regX = btn.width / 2;
        btn.x = 1150;
        btn.y = 0;
        btn.setButton({ upColor: 'yellow', color: 'blue', borderColor: 'blue', overColor: 'white' });
        this.addChild(btn);
    }

    p.pausePORRA = function (e) {
               var paused = !createjs.Ticker.getPaused();
            createjs.Ticker.setPaused(paused);
            
    }
    //fabio ARRUMAR ESTA BAGUNCA
    p.addBackground = function () {

        background1 = new createjs.Bitmap(game.assets.getAsset(game.assets.BATTLE_BG));
        background2 = new createjs.Bitmap(game.assets.getAsset(game.assets.BATTLE_BG));
        //var imgBackground = 'images/milkyway.jpg';

        //background1 = new createjs.Bitmap(imgBackground);
        background1.scaleX = background1.scaleY = 0.3;
        this.addChild(background1);
      
        //background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 0.3;
        background2.x = BG_WIDTH;

        background1.speed = background2.speed = -1;

        this.addChild(background2);


    }

    p.addSpaceship = function () {
        nave  = new game.Nave();
        nave.regX = nave.width / 2;
        nave.regY = nave.height / 2;
        nave.x = 100;
        nave.scaleX =.2;
        nave.scaleY=.2;
        nave.rotation = 90;
        nave.y = (canvas.height / 2);
        //spaceship.regX = spaceship.width / 2;
        //spaceship.regY = spaceship.height / 2;
        //spaceship.x = 50
        //spaceship.y = (canvas.height / 2);
        this.addChild(nave);

        window.onkeydown = moveSpaceship;
        window.onkeyup = stopSpaceship;
    }


    p.addMessages = function () {
        this.msgTxt = new createjs.Text("HELLO", '24px Verdana', '#F00');
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
            //asteroid = new PulsingOrb(color, asteroidSize);
            var imgAsteroid = 'images/asteroid.png';
            asteroid = new createjs.Bitmap(imgAsteroid);
            asteroid.speed = Math.random() * 2 + 2;
            asteroid.size = asteroidSize;
            asteroid.regX = asteroid.width / 2;
            asteroid.regY = asteroid.height / 2;
            asteroid.x = STAGE_WIDTH;
            asteroid.y = asteroidSize + (Math.random() * numAsteroids * asteroidSize * 2);
            asteroids.addChild(asteroid);
        }
    }

    p.onAsteroidShoot = function (e) {
        this.asteroidContainer.removeChild(e.target);
    }

    p.createBulletContainer = function () {
        this.bulletContainer = new createjs.Container();
        this.addChild(this.bulletContainer);
    }

    p.createBullets = function () {
        var i, bullet, color;
        var bullets = this.bulletContainer;
        var numBullets = 50;
        var bulletSize = 10;

        for (i = 0; i < numBullets; i++) {

            
            var ImgBullet = 'images/bullet.png';
            var bullet = new createjs.Bitmap(ImgBullet);
            bullet.speed = 8;
            bullet.size = bulletSize;
            bullet.x = STAGE_WIDTH;
            bullet.y = 100;
            bullets.addChild(bullet);
        }
    }


    p.update = function () {

        //Moving Asteroids
        var i, asteroid, nextX;
        var len = this.asteroidContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            nextX = asteroid.x - asteroid.speed;

            if (nextX + asteroid.size < 0) {
                nextX = canvas.width + asteroid.size;
            }

            asteroid.nextX = nextX;
        }

        //Moving Bullets
        var j, bullet, bulletNextX, bulletNextY;
        var bulletLen = this.bulletContainer.getNumChildren();
        for (j = 0; j < bulletLen; j++) {
            bullet = this.bulletContainer.getChildAt(j);
            bulletNextX = bullet.x + bullet.speed;
            bullet.nextX = bulletNextX;
        }


        //Moving Spaceship
        var bg1NextX, bg2NextX;

        bg1NextX = background1.x + background1.speed;
        bg2NextX = background2.x + background2.speed;

        background1.x = bg1NextX;
        background2.x = bg2NextX;

        if (background1.x <= -BG_WIDTH) {
            background1.x = background2.x + BG_WIDTH;
        }
        if (background2.x <= -BG_WIDTH) {
            background2.x = background1.x + BG_WIDTH;
        }

        var nextX = nave.x;
        var nextY = nave.y;

        if (leftKeyDown) {
            nextX = nave.x - 10;
        }
        if (rightKeyDown) {
            nextX = nave.x + 10;
        }
        if (upKeyDown) {
            nextY = nave.y - 10;
        }
        if (downKeyDown) {
            nextY = nave.y + 10;
        }

        if (shootKeyDown) {
            var bulletIndex;

            for (bulletIndex = 0; bulletIndex < bulletLen; bulletIndex++) {
                bullet = this.bulletContainer.getChildAt(bulletIndex);
                if (bullet.x > STAGE_WIDTH) {
                    bulletNextX = nave.x + 35;
                    bulletNextY = nave.y + 25;
                    bullet.nextX = bulletNextX;
                    bullet.nextY = bulletNextY;
                    bulletIndex = bulletLen;
                }
            }
        }

        nave.x = nextX;
        nave.y = nextY;



        //Asteroid and Spaceship Collision
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);

            var slot = asteroid;
            var pt = slot.globalToLocal(nave.x, nave.y);
            if (slot.hitTest(pt.x, pt.y)) {
                txtScore = "COLLISION DETECTED " + i;
                this.dispatchEvent(game.GameStateEvents.GAME_OVER);
            }
        }

        //Asteroid and Shoot Collision
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);

            var slot = asteroid;

            for (j = 0; j < bulletLen; j++) {
                bullet = this.bulletContainer.getChildAt(j);
                var pt = slot.globalToLocal(bullet.x, bullet.y);
                if (slot.hitTest(pt.x, pt.y)) {
                    txtScore = "ASTEROID DESTROYED " + i;
                    asteroid.nextX = STAGE_WIDTH;
                    bullet.nextX = STAGE_WIDTH;
                    bullet.nextY = 4000;

                }
            }
        }
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
            case SPACE_BAR:
                shootKeyDown = true;
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
            case 32:
                shootKeyDown = false;
                break;
        }
    }

    p.render = function () {

        var i, asteroid, bullet;

        var len = this.asteroidContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            asteroid.x = asteroid.nextX;
        }

        len = this.bulletContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            bullet = this.bulletContainer.getChildAt(i);
            bullet.x = bullet.nextX;
            bullet.y = bullet.nextY;
        }

        this.msgTxt.text = txtScore;
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