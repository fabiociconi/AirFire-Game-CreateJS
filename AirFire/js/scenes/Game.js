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

    var spaceship;
    var boss;
    var speedUp = false;
    var boolLevelUp = true;
    var speed;
    var numBullets;
    var numAsteroids;
    var numBulletsBoss;
    var explode;

    var startTime;
    var boolShipOff = false;

    var txtScore, txtLevel, txtClock;
    var intScore = 0;
    var intLevel = 1;
    var TimeShowOn, TimeShowOff = 0;
    var showBoss = false;

    var p = Game.prototype = new createjs.Container();
    var leftKeyDown, upKeyDown, rightKeyDown, downKeyDown = false;
    var shootKeyDown = false;

    p.Container_initialize = p.initialize;
    p.msgLevel = null;
    p.msgLevelMain = null;
    p.msgScore = null;
    p.msgClock = null;
    p.fpsTxt = null;
    p.asteroidContainer = null;
    p.bulletContainer = null;
    p.bulletBossContainer = null;


  

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addPauseButton();
        this.addSpaceship();
        this.addMessages();
        this.createAsteroidContainer();
        this.createAsteroids();
        this.addBoss();
        this.createBulletContainer();
        this.createBullets();
        this.createBulletBossContainer();
        this.createBulletsBoss();
        this.playGameMusic();
        intScore = 0;
        intLevel = 1;
        startTime = (new Date()).getTime();
        speedUp = false;
        boolShipOff = false;


    }
    p.playGameMusic = function(){
        createjs.Sound.play(game.assets.SOUND_GAME);
    }
    p.addBoss = function () {
        boss = new createjs.Sprite(spritesheet, 'boss');
        boss.bounds = boss.getBounds();
        boss.regX = boss.bounds.width / 2;
        boss.regY = boss.bounds.height / 2;

        boss.nextX = STAGE_WIDTH * 3;
        boss.nextY = STAGE_WIDTH * 3;
        //boss.nextX = canvas.width - 200;        
        //boss.nextY = (canvas.height / 2);        
        boss.x = boss.nextX;
        boss.y = boss.nextY;
        boss.scaleX = 0.15;
        boss.scaleY = 0.15;
        boss.rotation = 90;
        this.addChild(boss);

        //boss.nextX = STAGE_WIDTH + (Math.random() * this.numAsteroids * asteroidSize * 2);
        //boss.nextY = asteroidSize + (Math.random() * this.numAsteroids * asteroidSize * 2);

    }
    p.playSoundShoot = function () {
        createjs.Sound.play(game.assets.SOUND_SHOOT);
    }

    p.playSoundAsteroidExplosion = function () {
        createjs.Sound.play(game.assets.SOUND_ASTEROID_EXPLOSION);
    }

    p.playSoundShipExplosion = function () {
        createjs.Sound.play(game.assets.SOUND_SHIP_EXPLOSION);
    }    

    p.explosionSpaceShip = function(x,y){
       var explode = new createjs.Sprite(spritesheet, 'explosionSpaceShip');
        explode.x = x-170;
        explode.y = y-90;
        
        boolShipOff = true;  
        this.playSoundShipExplosion();
        console.log(x);
        console.log(y);
       

        this.addChild(explode);
        explode.on('animationend', this.explosionComplete, this, true);
        spaceship.nextY = -100;
        explode.gotoAndPlay('explosionSpaceShip');

        spaceship.alpha = 1;
        createjs.Tween.get(spaceship).to({alpha:-3}, 2000);
        
    }
    p.explosionAsteroids = function (x,y) {
        var explode = new createjs.Sprite(spritesheet, 'explosionAsteroids');
        explode.x = x-150;
        explode.y = y-140;
        //console.log(x);
        //console.log(y);

        this.addChild(explode);
        explode.on('animationend', this.explosionComplete, this, true);
        explode.gotoAndPlay('explosion');
    }
 
      p.explosionComplete = function (e) {
        var explosion = e.target;
        this.removeChild(explosion);
    }

    p.levelUp = function () {
    intLevel++;
    boolLevelUp = false;

    var i, asteroid, nextX, nextY;
    var len = this.asteroidContainer.getNumChildren();
    for (i = 0; i < len; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);
        nextX = canvas.width * 2 + asteroid.size;
        asteroid.nextX = nextX;
    }
    if (intScore == 10000) {
        showBoss = true;
        boss.nextX = canvas.width - 200;
        boss.nextY = (canvas.height / 2);

    }
    this.showLevelMain();
}



p.showLevelMain = function () {
    TimeShowOn = (new Date()).getTime();

    this.msgLevelMain.x = canvas.width / 2 - 105;
    this.msgLevelMain.y = canvas.height / 2 - 100;
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
    spaceship = new game.SpaceShip();
    spaceship.regX = spaceship.width / 2;
    spaceship.regY = spaceship.height / 2;
    spaceship.x = 100;
    spaceship.scaleX = .15;
    spaceship.scaleY = .15;
    spaceship.rotation = 90;
    spaceship.y = (canvas.height / 2);
    this.addChild(spaceship);

    window.onkeydown = moveSpaceship;
    window.onkeyup = stopSpaceship;
}

p.addMessages = function () {
    this.msgLevel = new createjs.Text("LEVEL: ", '24px Cambria', 'cyan');
    this.msgLevel.x = 10;
    this.msgLevel.y = 10;
    this.msgScore = new createjs.Text("SCORE: ", '24px Cambria', 'cyan');
    var b = this.msgScore.getBounds();
    this.msgScore.x = 150;
    this.msgScore.y = 10;

    this.msgClock = new createjs.Text("", '24px Cambria', 'cyan');
    this.msgClock.x = BG_WIDTH - 150;
    this.msgClock.y = 10;

    this.msgLevelMain = new createjs.Text('LEVEL: ' + intLevel, '60px Calibri', 'cyan');
    this.showLevelMain();

    this.addChild(this.msgLevel, this.msgScore, this.msgClock, this.msgLevelMain);

}

p.createAsteroidContainer = function () {
    this.asteroidContainer = new createjs.Container();
    this.addChild(this.asteroidContainer);
}

p.createAsteroids = function () {
    var i, asteroid;
    var asteroids = this.asteroidContainer;
    this.numAsteroids = 12;
    var asteroidSize = 25;
    for (i = 0; i < this.numAsteroids; i++) {
        //color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        asteroid = new game.Enemy();

        //var imgAsteroid = 'images/asteroid.png';
        //asteroid = new createjs.Bitmap(imgAsteroid);
        asteroid.speed = Math.random() * 2 + 4;
        asteroid.bounds = asteroid.getBounds();
        asteroid.regX = asteroid.bounds.width / 2;
        asteroid.regY = asteroid.bounds.height / 2;

        asteroid.scaleY = 1;
        asteroid.scaleX = 1;
        asteroid.size = asteroidSize;
        //asteroid.regX = asteroid.width / 2;
        //asteroid.regY = asteroid.height / 2;
        asteroid.nextX = STAGE_WIDTH + (Math.random() * this.numAsteroids * asteroidSize * 2);
        asteroid.nextY = asteroidSize + (Math.random() * this.numAsteroids * asteroidSize * 2);
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
    this.numBullets = 30;
    var bulletSize = 10;

    for (i = 0; i < this.numBullets; i++) {
        var bullet = new createjs.Sprite(spritesheet, 'bullet');
        bullet.speed = 15;
        bullet.rotation = 90;
        bullet.scaleX = .3;
        bullet.size = bulletSize;
        bullet.nextX = STAGE_WIDTH * 2;
        bullet.nextY = STAGE_WIDTH * 2;

        bullet.x = bullet.nextX;
        bullet.y = bullet.nextY;
        bullets.addChild(bullet);
    }
}

p.createBulletBossContainer = function () {
    this.bulletBossContainer = new createjs.Container();
    this.addChild(this.bulletBossContainer);
}

p.createBulletsBoss = function () {
    var i, bulletBoss, color;
    var bulletsBoss = this.bulletBossContainer;
    this.numBullets = 30;
    var bulletSize = 10;

    for (i = 0; i < this.numBulletsBoss; i++) {
        var bulletBoss = new createjs.Sprite(spritesheet, 'bullet');
        bulletBoss.speed = 20;
        bulletBoss.rotation = -90;
        bulletBoss.scaleX = .3;
        bulletBoss.size = bulletSize;
        bulletBoss.nextX = STAGE_WIDTH * 2;
        bulletBoss.nextY = STAGE_WIDTH * 2;

        bulletBoss.x = bullet.nextX;
        bulletBoss.y = bullet.nextY;
        bulletsBoss.addChild(bulletBoss);
    }
}

p.update = function () {
    //Moving Asteroids
    var i, asteroid, nextX, nextY;
    var len = this.asteroidContainer.getNumChildren();
    for (i = 0; i < len; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);

        if ((intScore == 2000) && (!speedUp)) {
            var len = this.asteroidContainer.getNumChildren();
            for (var ispeed = 0; ispeed < len; ispeed++) {
                asteroid = this.asteroidContainer.getChildAt(ispeed);
                asteroid.speed *= 1.6;
            }
            speedUp = true;
        }

        asteroid.rotation += asteroid.speed / 10;
        nextX = asteroid.x - asteroid.speed;
        nextY = asteroid.y;
        if (nextX + asteroid.size < 0) {
            nextX = canvas.width + asteroid.size;
            nextY = 25 + (Math.random() * 550);
        }
        asteroid.nextX = nextX;
        asteroid.nextY = nextY;

    }

    //Moving Boss   

    if (showBoss) //It will be true when Level = 3
    {             //Moves need improvements :)
        var destX = 1 + (Math.random() * 4);
        var destY = 1 + (Math.random() * 4);

        if (destX >= 1 && destX < 2) {
            boss.nextX = boss.x + 30;
        }
        else if (destX >= 2 && destX < 3) {
            boss.nextX = boss.x - 30;
        }
        else if (destX >= 3) {
            boss.nextX = boss.x;
        }

        if (destY >= 1 && destY < 2) {
            boss.nextY = boss.y + 30;
        }
        else if (destY >= 2 && destY < 3) {
            boss.nextY = boss.y - 30;
        }
        else if (destY >= 3) {
            boss.nextY = boss.y;
        }


        boss.x = boss.nextX;
        boss.y = boss.nextY;
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

    var nextX = spaceship.x;
    var nextY = spaceship.y;

    if (leftKeyDown && !boolShipOff) {
        nextX = spaceship.x - 10;
        if (nextX - 70 < 0) {
            nextX = 70;
        }
    }
    if (rightKeyDown && !boolShipOff) {
        nextX = spaceship.x + 10;
        if (nextX > canvas.width * .6) {
            nextX = canvas.width * .6;
        }
    }
    if (upKeyDown && !boolShipOff) {
        nextY = spaceship.y - 10;
        if (nextY + 10 < 0) {
            nextY = -10;
        }

    }
    if (downKeyDown && !boolShipOff) {
        nextY = spaceship.y + 10;
        if (nextY > canvas.height - 67) {
            nextY = canvas.height - 67;
        }
    }
    if (shootKeyDown && !boolShipOff) {
        var bulletIndex;

        for (bulletIndex = 0; bulletIndex < bulletLen; bulletIndex++) {
            bullet = this.bulletContainer.getChildAt(bulletIndex);

            if (intLevel > 1) {

                if ((bullet.x > STAGE_WIDTH) && (bulletIndex < 2)) {

                    for (var bullet2Index = 0; bullet2Index < bulletLen; bullet2Index++) {
                        var bullet2 = this.bulletContainer.getChildAt(bullet2Index);

                        if ((bullet2.x > STAGE_WIDTH) && (bulletIndex != bullet2Index) && (bulletIndex < 2)) {


                            bulletNextX = spaceship.x + 75;
                            bulletNextY = spaceship.y + 7;
                            bullet.nextX = bulletNextX;
                            bullet.nextY = bulletNextY;

                            var bullet2NextX = spaceship.x + 75;
                            var bullet2NextY = spaceship.y + 31;
                            bullet2.nextX = bullet2NextX;
                            bullet2.nextY = bullet2NextY;

                            bulletIndex = bulletLen;
                            bullet2Index = bulletLen;

                            this.playSoundShoot();
                            shootKeyDown = false;
                        }
                    }
                }
            }
            else {
                if ((bullet.x > STAGE_WIDTH) && (bulletIndex < 2)) {
                    bulletNextX = spaceship.x + 75;
                    bulletNextY = spaceship.y + 19;
                    bullet.nextX = bulletNextX;
                    bullet.nextY = bulletNextY;
                    bulletIndex = bulletLen;
                    this.playSoundShoot();
                    shootKeyDown = false;
                }
            }
        }
    }
    spaceship.x = nextX;
    spaceship.y = nextY;

    //Asteroid and Spaceship Collision
    for (i = 0; i < len; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);

        var aBounds = asteroid.getBounds();
        var sBounds = spaceship.getBounds();

        // spaceship.regX = sBounds.width / 2;
        // spaceship.regY = sBounds.height / 2;

        asteroid.regX = aBounds.width / 2;
        asteroid.regY = aBounds.height / 2;

        if (spaceship.x < asteroid.x + aBounds.width / 3 &&
            spaceship.x > asteroid.x - aBounds.width / 3 &&
            spaceship.y < asteroid.y + aBounds.height / 2 &&
            spaceship.y > asteroid.y - aBounds.height && !boolShipOff) 
        {
            this.explosionSpaceShip(spaceship.x,spaceship.y);            
        }
    }


    //ndgmr.DEBUG_COLLISION = true;
    //var collision;
    //collision = ndgmr.checkRectCollision(spaceship, asteroid);
    // if (collision) {
    //        this.gameOver();
    // }


    //Asteroid and Shoot Collision
    for (i = 0; i < len; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);

        var slot = asteroid;

        for (j = 0; j < bulletLen; j++) {
            bullet = this.bulletContainer.getChildAt(j);

            var aBounds = asteroid.getBounds();
            var bBounds = bullet.getBounds();

            asteroid.regX = aBounds.width / 2;
            asteroid.regY = aBounds.height / 2;

            if (bullet.x < asteroid.x + aBounds.width / 3 &&
                bullet.x > asteroid.x - aBounds.width / 3 &&
                bullet.y < asteroid.y + aBounds.height / 2 &&
                bullet.y > asteroid.y - aBounds.height) {
                intScore += 200;
                boolLevelUp = true;
                asteroid.nextX = STAGE_WIDTH;
                asteroid.nextY = 25 + (Math.random() * 575);
                bullet.nextX = STAGE_WIDTH;
                bullet.nextY = 4000;
                this.explosionAsteroids(asteroid.x,asteroid.y);
                this.playSoundAsteroidExplosion();
                if ((intScore == 5000 || intScore == 10000) && (boolLevelUp)) {
                    this.levelUp();
                }
            }


            //var collision;
            //collision = ndgmr.checkRectCollision(bullet, asteroid);
            // if (collision) {
            //     intScore += 200;
            //     asteroid.nextX = STAGE_WIDTH;
            //     asteroid.nextY = 25 + (Math.random() * 575);
            //     bullet.nextX = STAGE_WIDTH;
            //     bullet.nextY = 4000;
            //     this.playSoundAsteroidExplosion();
            // }

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
        asteroid.y = asteroid.nextY;
    }

    len = this.bulletContainer.getNumChildren();
    for (i = 0; i < len; i++) {
        bullet = this.bulletContainer.getChildAt(i);
        bullet.x = bullet.nextX;
        bullet.y = bullet.nextY;
    }

    boss.x = boss.nextX;
    boss.y = boss.nextY;

    txtLevel = "LEVEL: " + intLevel;
    this.msgLevel.text = this.msgLevelMain.text = txtLevel;
    txtScore = "SCORE: " + intScore;
    this.msgScore.text = txtScore;

    var currentTime = (new Date()).getTime();
    txtClock = Math.floor((currentTime - startTime) / 1000);
    var minutes = Math.floor(txtClock / 60);
    var seconds = txtClock - minutes * 60;
    var finalTime = strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);
    this.msgClock.text = finalTime;

    TimeShowOff = Math.floor((currentTime - TimeShowOn) / 1000);

    if (TimeShowOff > 2) {
        this.msgLevelMain.y = STAGE_WIDTH;
    }

    
    if (spaceship.alpha == -3)
    {
        this.gameOver();
    }

}

function strPadLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

p.gameOver = function () {     
        createjs.Sound.removeSound(game.assets.SOUND_GAME); 
        this.dispatchEvent(game.GameStateEvents.GAME_OVER);
}

p.checkGame = function () {

}

p.run = function () {
    this.update();
    this.render();
    this.checkGame();
}

window.game.Game = Game;

}(window));