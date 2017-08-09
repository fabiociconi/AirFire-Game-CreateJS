//************************************************************/
// Game.js                                                   */
//                                                           */
// Main Function : Game Engine, responsible by physics,      */
//collision, moviment and game levels                        */
//-----------------------------------------------------------*/
// Last Modification: 08/08/2017 - Fabio A. Ciconi           */
// - Acess backgroud through Assets, using preload           */
// - pause button                                            */
//************************************************************/

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
    const BG_WIDTH = 1200;

    //Backgrounds
    var background1, background2;

    //The Spaceship
    //var spaceship;
    var nave;
    var speedUp = false;
    var speed;

    var txtScore, txtMessage;
    var intScore = 0;
    var p = Game.prototype = new createjs.Container();
    var leftKeyDown, upKeyDown, rightKeyDown, downKeyDown = false;
    var shootKeyDown = false;
    p.Container_initialize = p.initialize;
    p.msgTxt = null;
    p.msgScore = null;
    p.fpsTxt = null;
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

    p.playSoundShoot = function () {
        createjs.Sound.play(game.assets.SOUND_SHOOT);
    }

    p.playSoundAsteroidExplosion = function () {
        createjs.Sound.play(game.assets.SOUND_ASTEROID_EXPLOSION);
    }
    
    p.addPauseButton = function (e) {
        var btnPause, event;
        btnPause = new ui.SimpleButton('||');
        btnPause.on('click', this.pauseOption, this);
        btnPause.regX = btnPause.width / 2;
        btnPause.x = 1160;
        btnPause.y = 15;        
        btnPause.setButton({ upColor: 'yellow', color: 'cyan', borderColor: 'cyan', overColor: 'white' });
        this.addChild(btnPause);
    }

    p.pauseOption = function (e) {
        var paused = !createjs.Ticker.getPaused();
        createjs.Ticker.setPaused(paused);
    }

    p.addBackground = function () {
        background1 = new createjs.Bitmap(game.assets.getAsset(game.assets.BATTLE_BG));
        background2 = new createjs.Bitmap(game.assets.getAsset(game.assets.BATTLE_BG));
        background1.scaleX = background1.scaleY = background2.scaleX = background2.scaleY = 0.2;
        background1.speed = background2.speed = -0.9;
        background2.x = BG_WIDTH;        
        this.addChild(background1, background2);
    }

    p.addSpaceship = function () {
        nave = new game.Nave();
        nave.regX = nave.width / 2;
        nave.regY = nave.height / 2;
        nave.x = 100;
        nave.scaleX = .15;
        nave.scaleY = .15;
        nave.rotation = 90;
        nave.y = (canvas.height / 2);        
        this.addChild(nave);

        window.onkeydown = moveSpaceship;
        window.onkeyup = stopSpaceship;
    }

    p.addMessages = function () {
        this.msgTxt = new createjs.Text("HELLO", '24px Cambria', '#F00');
        this.msgTxt.x = 50;
        this.msgTxt.y = 10;
        this.msgScore = new createjs.Text("HELLO", '24px Cambria', 'cyan');


        var b = this.msgScore.getBounds();
        this.msgScore.x = BG_WIDTH/2 - b.width; 
       

        this.msgScore.y = 10;
        
        this.addChild(this.msgTxt, this.msgScore);

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
            color = '#' + Math.floor(Math.random() * 16777215).toString(16);            
            var imgAsteroid = 'images/asteroid.png';
            asteroid = new createjs.Bitmap(imgAsteroid);
            asteroid.speed = Math.random() * 2 + 4;
            asteroid.bounds = asteroid.getBounds();
            asteroid.regX = asteroid.bounds.width / 2;
            asteroid.regY = asteroid.bounds.height / 2;

            asteroid.scaleX = 1; 
            asteroid.scaleY = 1;
            asteroid.size = asteroidSize;
            //asteroid.regX = asteroid.width / 2;
            //asteroid.regY = asteroid.height / 2;
            asteroid.nextX = STAGE_WIDTH + (Math.random() * numAsteroids * asteroidSize * 2);
            asteroid.nextY = asteroidSize + (Math.random() * numAsteroids * asteroidSize * 2);
            asteroid.x = asteroid.nextX;
            asteroid.y = asteroid.nextY;
            asteroids.addChild(asteroid);
            
        }
    }
    

    p.createBulletContainer = function () {
        this.bulletContainer = new createjs.Container();
        this.addChild(this.bulletContainer);
    }

    p.createBullets = function () {
        var i, bullet, color;
        var bullets = this.bulletContainer;
        var numBullets = 3;
        var bulletSize = 10;

        for (i = 0; i < numBullets; i++) {
            var bullet = new createjs.Sprite(spritesheet, 'bullet');
            bullet.speed = 15;
            bullet.rotation = 90;
            bullet.scaleX = .3;
            bullet.size = bulletSize;
            bullet.x = STAGE_WIDTH;
            bullet.y = 100;
            bullets.addChild(bullet);
        }
    }

    p.update = function () {
        //Moving Asteroids
        var i, asteroid, nextX, nextY;
        var len = this.asteroidContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            
            //if ((intScore == 2000) && (!speedUp))
            //{                
            //this.increaseSpeed(intScore, speedUp);
            //}

            asteroid.rotation += asteroid.speed / 10;
            nextX = asteroid.x - asteroid.speed;
            nextY = asteroid.y;
            if (nextX + asteroid.size < 0) {
                nextX = canvas.width + asteroid.size;
                nextY = 25 + (Math.random() * 575);
            }
            asteroid.nextX = nextX;
            asteroid.nextY = nextY;
            
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
            if (nextX - 70 < 0){
                nextX = 70;
            }
        }
        if (rightKeyDown) {
            nextX = nave.x + 10;
            if (nextX > canvas.width * .6){
                nextX = canvas.width * .6;
            }
        }
        if (upKeyDown) {
            nextY = nave.y - 10;
            if (nextY + 10 < 0){
                nextY = -10;
            }

        }
        if (downKeyDown) {
            nextY = nave.y + 10;
            if (nextY > canvas.height - 67){
                nextY = canvas.height - 67;
            }
        }
        if (shootKeyDown) {
            var bulletIndex;

            for (bulletIndex = 0; bulletIndex < bulletLen; bulletIndex++) {
                bullet = this.bulletContainer.getChildAt(bulletIndex);
                bullet2 = this.bulletContainer.getChildAt(bulletIndex  + 1);
                bulletIndex++;
                if (bullet.x > STAGE_WIDTH) {
                    bulletNextX = nave.x + 75;
                    bulletNextY = nave.y + 19;
                    bullet.nextX = bulletNextX;
                    bullet.nextY = bulletNextY;
                    bulletIndex = bulletLen;
                    this.playSoundShoot();
                    shootKeyDown = false;
                }

                // if (bullet2.x > STAGE_WIDTH) {
                //     bulletNextX = nave.x + 75;
                //     bulletNextY = nave.y + 40;
                //     bullet2.nextX = bulletNextX;
                //     bullet2.nextY = bulletNextY;
                //     bulletIndex = bulletLen;
                //     shootKeyDown = false;
                // }

             
              
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
                txtMessage = "COLLISION DETECTED " + i;
                this.dispatchEvent(game.GameStateEvents.CREDITS);
                //this.playButton.on('click', this.playGame, this);
                //this.dispatchEvent(this.gameover);
                //this.dispatchEvent(game.GameStateEvents.GAME_OVER);
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
                    txtMessage = "ASTEROID DESTROYED " + i;
                    intScore += 200;
                    txtScore = "SCORE: " + intScore;
                    asteroid.nextX = STAGE_WIDTH;
                    asteroid.nextY = 25 + (Math.random() * 575);
                    bullet.nextX = STAGE_WIDTH;
                    bullet.nextY = 4000;

                    this.playSoundAsteroidExplosion();
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

    p.increaseSpeed = function (intScore, speedUp){
        if ((intScore == 2000) && (speedUp == false)){  

            var len = this.asteroidContainer.getNumChildren();      
            for (var ispeed = 0; ispeed < len; ispeed++) {
                asteroid = this.asteroidContainer.getChildAt(ispeed);
                asteroid.speed *= 1.5;                
            }
            this.speedUp = true;
        }
    }

    p.render = function () {

        var i, asteroid, bullet;
        var len = this.asteroidContainer.getNumChildren();

        for (i = 0; i < len; i++) {
            asteroid = this.asteroidContainer.getChildAt(i);
            asteroid.x = asteroid.nextX;
            asteroid.y = asteroid.nextY;
        }

        len = this.bulletContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            bullet = this.bulletContainer.getChildAt(i);
            bullet.x = bullet.nextX;
            bullet.y = bullet.nextY;
        }

        this.msgTxt.text = txtMessage;
        this.msgScore.text = txtScore;
    }

    p.checkGame = function () {
        //if (!this.asteroidContainer.getNumChildren()) {
            //this.dispatchEvent(game.GameStateEvents.CREDITS);
        //}
    }

    p.run = function () {
        this.update();
        this.render();
        this.checkGame();
    }

    window.game.Game = Game;

}(window));