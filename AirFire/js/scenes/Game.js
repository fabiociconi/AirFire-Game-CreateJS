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
var mothership;
var speedUp = false;
var boolLevelUp = true;
var speed;
var numBullets;
var numTotalAsteroids;
var numAsteroids = 3;
var spaceshipLife = 1;
var bossLife= 1;
var mothershipLife = 1;


var numBulletsBoss;
var explode;

var startTime;
var boolShipOff = false;

var txtScore, txtLevel, txtClock;
var intScore = 0;
var intLevel = 1;
var TimeShowOn, TimeShowOff = 0;
var moveBossStart, moveBossEnd = 0;
var moveMothershipStart, moveMothershipEnd = 0;
var showBoss = false;
var showMothership = false;
var moveBoss = true;
var moveMothership = true;

var barHealth;
var barHealthBoss;
var barHealthMothership;


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
p.barEnergy=null;
p.barEnergyBoss=null;
p.barEnergyMothership=null;






p.initialize = function () {
    this.Container_initialize();
    this.addBackground();
    this.addPauseButton();
    this.addSpaceship();
    this.addMessages();
    this.createAsteroidContainer();
    this.createAsteroids();
    this.addBoss();
    this.addMothership();
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
    boss = new createjs.Sprite(spritesheet, 'bossLevel2');
    boss.bounds = boss.getBounds();
    boss.regX = boss.bounds.width / 2;
    boss.regY = boss.bounds.height / 2;

    boss.nextX = STAGE_WIDTH * 3;
    boss.nextY = STAGE_WIDTH * -3;    
    boss.x = boss.nextX;
    boss.y = boss.nextY;
    boss.scaleX = 0.16;
    boss.scaleY = 0.16;
    boss.rotation = -90;
    boss.speedY = 300;
    boss.speedX = 300;
    this.addChild(boss);

    barHealthBoss = new game.HealthBar();
    barHealthBoss.x= -(STAGE_WIDTH - 115); 
    barHealthBoss.y= 13;
    this.addChild(barHealthBoss);
}

p.addMothership = function () {
    mothership = new createjs.Sprite(spritesheet, 'redBoss');
    mothership.bounds = mothership.getBounds();
    mothership.regX = mothership.bounds.width / 2;
    mothership.regY = mothership.bounds.height / 2;

    mothership.nextX = STAGE_WIDTH * 3;
    mothership.nextY = STAGE_WIDTH * 3;    
    mothership.x = mothership.nextX;
    mothership.y = mothership.nextY;
    mothership.scaleX = 0.3;
    mothership.scaleY = 0.3;
    mothership.rotation = 90;
    mothership.speedY = 300;
    mothership.speedX = 300;
    this.addChild(mothership);

    barHealthMothership = new game.HealthBar();
    barHealthMothership.x= -(STAGE_WIDTH - 115); 
    barHealthMothership.y= 13;
    this.addChild(barHealthMothership);

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

p.playSoundShipCollision = function () {
    createjs.Sound.play(game.assets.SOUND_COLLISION);
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

p.hitSpaceShip = function(x,y){
    var explode = new createjs.Sprite(spritesheet, 'hitSpaceShip');
    explode.x = x-170;
    explode.y = y-90;    
    this.playSoundShipCollision();
    console.log(x);
    console.log(y);
    

    this.addChild(explode);
    explode.on('animationend', this.explosionComplete, this, true);
    spaceship.nextY = -100;
    explode.gotoAndPlay('hitSpaceShip');
}

p.hitEnemy = function(x,y){
    var explode = new createjs.Sprite(spritesheet, 'hitEnemy');
    explode.x = x-130;
    explode.y = y-130;      
    this.playSoundShipCollision();
    console.log(x);
    console.log(y);
    this.addChild(explode);
    explode.on('animationend', this.explosionComplete, this, true);
    explode.gotoAndPlay('hitEnemy');    
}

p.explosionBoss = function(x,y){
    var explode = new createjs.Sprite(spritesheet, 'explosionEnemy');
    explode.x = x-130;
    explode.y = y-130;
      
    this.playSoundShipExplosion();
    console.log(x);
    console.log(y);
    

    this.addChild(explode);
    explode.on('animationend', this.explosionComplete, this, true);
    boss.nextY = STAGE_WIDTH * 3;
    explode.gotoAndPlay('explosionEnemy');

    boss.alpha = 0;
    showBoss = false;
    this.barEnergyBoss.nextX *= -1;
    barHealthBoss.x *= -1;

    boss.nextX = STAGE_WIDTH * 3;
    boss.nextY = STAGE_WIDTH * -3;
    
}

p.explosionMothership = function(x,y){
    var explode = new createjs.Sprite(spritesheet, 'explosionEnemy');
    explode.x = x-170;
    explode.y = y-90;
      
    this.playSoundShipExplosion();
    console.log(x);
    console.log(y);
    

    this.addChild(explode);
    explode.on('animationend', this.explosionComplete, this, true);
    mothership.nextY = STAGE_WIDTH * 3;
    explode.gotoAndPlay('explosionEnemy');

    mothership.alpha = 0;
    showMothership = false;
    this.barEnergyMothership.nextX *= -1;
    barHealthMothership.x *= -1;

    mothership.nextX = STAGE_WIDTH * 3;
    mothership.nextY = STAGE_WIDTH * -3;
    
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
    //var len = this.asteroidContainer.getNumChildren();
    for (i = 0; i < this.numAsteroids; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);
        nextX = canvas.width * 2 + asteroid.size;
        asteroid.nextX = nextX;
    }   

    if (intLevel == 3){        
        showMothership = true;
        barHealthMothership.x *= -1;
        this.barEnergyMothership.nextX *= -1;
    }

    this.showLevelMain();
}

p.moveBoss = function () {
    moveBoss = false;
    moveBossStart = (new Date()).getTime();

    var destX = 1 + (Math.random() * 2);
    var destY = 1 + (Math.random() * 2);


    if (destX >= 1 && destX < 2) {  
        if (boss.nextX >=  canvas.height - 50){   
            createjs.Tween.get(boss).to({nextX:boss.nextX - boss.speedX},1000);
        }
        else{
            createjs.Tween.get(boss).to({nextX:boss.nextX + boss.speedX},1000);
        }
    }
    else if (destX >= 2 && destX < 3) {
        if (boss.nextX <=  canvas.width * .7){   
            createjs.Tween.get(boss).to({nextX:boss.nextX + boss.speedX},1000);
        }
        else{
            createjs.Tween.get(boss).to({nextX:boss.nextX - boss.speedX},1000);
        }
    }

    if (destY >= 1 && destY < 2) {
        if (boss.nextY >=  canvas.height - 50){
            createjs.Tween.get(boss).to({nextY:boss.nextY - boss.speedY},1000);
        }
        else{
            createjs.Tween.get(boss).to({nextY:boss.nextY + boss.speedY},1000);
        }        
    }
    else if (destY >= 2 && destY < 3) {
        if (boss.nextY <= 50){            
            createjs.Tween.get(boss).to({nextY:boss.nextY + boss.speedY},1000);
        }
        else{
            createjs.Tween.get(boss).to({nextY:boss.nextY - boss.speedY},1000);
        }
    }
}

p.moveMothership = function () {
    moveMothership = false;
    moveMothershipStart = (new Date()).getTime();

    var destX = 1 + (Math.random() * 2);
    var destY = 1 + (Math.random() * 2);


    if (destX >= 1 && destX < 2) {  
        if (mothership.nextX >=  canvas.height - 50){   
            createjs.Tween.get(mothership).to({nextX:mothership.nextX - mothership.speedX},1000);
        }
        else{
            createjs.Tween.get(mothership).to({nextX:mothership.nextX + mothership.speedX},1000);
        }
    }
    else if (destX >= 2 && destX < 3) {
        if (mothership.nextX <=  canvas.width * .7){   
            createjs.Tween.get(mothership).to({nextX:mothership.nextX + mothership.speedX},1000);
        }
        else{
            createjs.Tween.get(mothership).to({nextX:mothership.nextX - mothership.speedX},1000);
        }
    }

    if (destY >= 1 && destY < 2) {
        if (mothership.nextY >=  canvas.height - 50){
            createjs.Tween.get(mothership).to({nextY:mothership.nextY - mothership.speedY},1000);
        }
        else{
            createjs.Tween.get(mothership).to({nextY:mothership.nextY + mothership.speedY},1000);
        }        
    }
    else if (destY >= 2 && destY < 3) {
        if (mothership.nextY <= 50){            
            createjs.Tween.get(mothership).to({nextY:mothership.nextY + mothership.speedY},1000);
        }
        else{
            createjs.Tween.get(mothership).to({nextY:mothership.nextY - mothership.speedY},1000);
        }
    }
}

p.showLevelMain = function () {
    TimeShowOn = (new Date()).getTime();

    this.msgLevelMain.x = canvas.width / 2 - 80;
    this.msgLevelMain.y = canvas.height / 2 - 100;
}

p.addPauseButton = function (e) {
    var btnPause, event;
    btnPause = new ui.SimpleButton('||');
    btnPause.on('click', this.pauseOption, this);
    btnPause.regX = btnPause.width / 2;
    btnPause.scaleX = .6;
    btnPause.scaleY = .6;
    btnPause.x = 1175;
    btnPause.y = 13;
    btnPause.setButton({ upColor: 'black',  color: 'cyan', borderColor: 'cyan', overColor: 'white' });
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

    barHealth = new game.HealthBar();
    barHealth.x= 400; 
    barHealth.y= 13;
    this.addChild(barHealth);
}

p.addMessages = function () {
    this.msgLevel = new createjs.Text("LEVEL: ", '24px Agency FB', 'cyan');
    this.msgLevel.x = 10;
    this.msgLevel.y = 10;

    this.barEnergy = new createjs.Text("ENERGY: ", '24px Agency FB', 'cyan');
    this.barEnergy.x = 330;
    this.barEnergy.y = 10;

    this.barEnergyBoss = new createjs.Text("BOSS: ", '24px Agency FB', 'cyan');
    this.barEnergyBoss.nextX = -(STAGE_WIDTH - 170);
    this.barEnergyBoss.y = 10;

    this.barEnergyMothership = new createjs.Text("MOTHERSHIP: ", '24px Agency FB', 'cyan');
    this.barEnergyMothership.nextX = -(STAGE_WIDTH - 220);
    this.barEnergyMothership.y = 10;




    this.msgScore = new createjs.Text("SCORE: ", '24px Agency FB', 'cyan');
    var b = this.msgScore.getBounds();
    this.msgScore.x = 200;
    this.msgScore.y = 10;

    this.msgClock = new createjs.Text("", '24px Agency FB', 'cyan');
    this.msgClock.x = 115;
    this.msgClock.y = 10;

    this.msgLevelMain = new createjs.Text('LEVEL: ' + intLevel, '60px Agency FB', 'cyan');
    this.showLevelMain();

    this.addChild(this.msgLevel, this.msgScore, this.msgClock, this.msgLevelMain, this.barEnergy, this.barEnergyBoss, this.barEnergyMothership);

}

p.createAsteroidContainer = function () {
    this.asteroidContainer = new createjs.Container();
    this.addChild(this.asteroidContainer);
}

p.createAsteroids = function () {
    var i, asteroid;
    var asteroids = this.asteroidContainer;
    this.numTotalAsteroids = 12;
    var asteroidSize = 25;
    for (i = 0; i < this.numTotalAsteroids; i++) {
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
        asteroid.nextX = STAGE_WIDTH + asteroidSize*2 + (Math.random() * this.numTotalAsteroids * asteroidSize * 2);
        asteroid.nextY = asteroidSize + (Math.random() * this.numTotalAsteroids * asteroidSize * 2);
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
    this.numBulletsBoss = 30;
    var bulletSize = 10;

    for (i = 0; i < this.numBulletsBoss; i++) {
        var bulletBoss = new createjs.Sprite(spritesheet, 'bulletBoss');
        bulletBoss.speed = 20;
        bulletBoss.rotation = -90;
        bulletBoss.scaleX = .3;
        bulletBoss.size = bulletSize;
        bulletBoss.nextX = STAGE_WIDTH * 2;
        bulletBoss.nextY = STAGE_WIDTH * 2;

        bulletBoss.x = bulletBoss.nextX;
        bulletBoss.y = bulletBoss.nextY;
        bulletsBoss.addChild(bulletBoss);
    }
}

p.update = function () {
    //Moving Asteroids
    var i, asteroid, nextX, nextY;
    //var len = this.asteroidContainer.getNumChildren();


    if (intScore == 0){        
        this.numAsteroids = 3;
    }
    else if (intScore == 3000){        
        this.numAsteroids = 6;
    }
    else if (intScore == 6000){        
        this.numAsteroids = 9;
    }
    //else if (intLevel > 2){        
     //   this.numAsteroids = 12;
    //}


    //Testing
    //showBoss = true;

    for (i = 0; i < this.numAsteroids; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);

        if ((intScore >= 10000) && (!speedUp)) {
            //var len = this.asteroidContainer.getNumChildren();
            for (var ispeed = 0; ispeed < this.numAsteroids; ispeed++) {
                asteroid = this.asteroidContainer.getChildAt(ispeed);
                asteroid.speed *= 1.6;
            }
            speedUp = true;
            showBoss = true;
            barHealthBoss.x *= -1;
            this.barEnergyBoss.nextX *= -1;
            boss.nextX = canvas.width - 200;
            boss.nextY = (canvas.height / 2);
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
    moveBossEnd = (new Date()).getTime();
    var bossTime = Math.floor((moveBossEnd - moveBossStart) / 1000);

    if (bossTime > 0)
    {
        moveBoss = true;
    }

    if (showBoss && moveBoss) //It will be true when Level = 3
    {             //Moves need improvements :)
         this.moveBoss();
    }

    if (showBoss)
    {
        if (boss.nextX > canvas.width - 50) {
            boss.nextX = canvas.width - 50; 
        }

        if (boss.nextX < canvas.width * .7) {            
            boss.nextX = canvas.width * .7;           
        }

        if (boss.nextY - 50 < 0) {
            boss.nextY = 50;    
        }

        if (boss.nextY > canvas.height - 50) {
            boss.nextY = canvas.height - 50;  
        }  
    }

    //Moving Mothership 
    moveMothershipEnd = (new Date()).getTime();
    var mothershipTime = Math.floor((moveMothershipEnd - moveMothershipStart) / 1000);

    if (mothershipTime > 0)
    {
        moveMothership = true;
    }

    if (showMothership && moveMothership) 
    {             
         this.moveMothership();
    }

    if (showMothership)
    {
        if (mothership.nextX > canvas.width - 100) {
            mothership.nextX = canvas.width - 100; 
        }

        if (mothership.nextX < canvas.width * .7) {            
            mothership.nextX = canvas.width * .7;           
        }

        if (mothership.nextY - 100 < 0) {
            mothership.nextY = 100;    
        }

        if (mothership.nextY > canvas.height - 100) {
            mothership.nextY = canvas.height - 100;  
        }  
    }


    //Moving Bullets
    var j, bullet, bulletNextX, bulletNextY;
    var bulletLen = this.bulletContainer.getNumChildren();
    for (j = 0; j < bulletLen; j++) {
        bullet = this.bulletContainer.getChildAt(j);
        bulletNextX = bullet.x + bullet.speed;
        bullet.nextX = bulletNextX;
    }

    //Moving Boss Bullets
    var j, bullet, bulletNextX, bulletNextY;
    var bulletBossLen = this.bulletBossContainer.getNumChildren();
    for (j = 0; j < bulletBossLen; j++) {
        bullet = this.bulletBossContainer.getChildAt(j);
        bulletNextX = bullet.x - bullet.speed;
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

    //Bullet and Boss Collision
    for (bulletIndex = 0; bulletIndex < bulletLen; bulletIndex++) {
        bullet = this.bulletContainer.getChildAt(bulletIndex);

        //var bBounds = bullet.getBounds();
        //var bossBounds = boss.getBounds();

        //bullet.regX = bBounds.width / 2;
        //bullet.regY = bBounds.height / 2;


        if (bullet.x - 15 < boss.x + boss.getBounds().width * boss.scaleX / 2 &&
            bullet.x - 15 > boss.x - boss.getBounds().width * boss.scaleX / 2 &&
            bullet.y + 35 < boss.y + boss.getBounds().height* boss.scaleY / 2 &&
            bullet.y + 35 > boss.y - boss.getBounds().height* boss.scaleY / 2 && showBoss)
        {
            bossLife = bossLife - 0.03;
            if (bossLife < 0)
            {
                bossLife = 0;
            }
            barHealthBoss.updateLife(bossLife);                  
            this.hitEnemy(boss.x,boss.y);
            if (bossLife == 0)
            {
                this.explosionBoss(boss.x,boss.y);                 
                this.levelUp();  
            }  
                       
        }

        if (bullet.x < mothership.x + mothership.getBounds().width * mothership.scaleX / 2 &&
            bullet.x > mothership.x - mothership.getBounds().width * mothership.scaleX / 2 &&
            bullet.y < mothership.y + mothership.getBounds().height* mothership.scaleY / 2 &&
            bullet.y > mothership.y - mothership.getBounds().height* mothership.scaleY / 2 && showMothership) 
        {

            mothershipLife = mothershipLife - 0.001;
            if (mothershipLife < 0)
            {
                mothershipLife = 0;
            }
            barHealthMothership.updateLife(mothershipLife);
                            
            this.hitEnemy(mothership.x,mothership.y);
            if (mothershipLife == 0)
            {
                this.explosionMothership(mothership.x,mothership.y);                 
                //this.levelUp();  
            }   
        }
    }

    //Moving Boss Bullets to Boss Ship
    var bulletBossIndex;
    if (showBoss || showMothership)
    {
        for (bulletBossIndex = 0; bulletBossIndex < bulletBossLen; bulletBossIndex++) {
            bullet = this.bulletBossContainer.getChildAt(bulletBossIndex);
            if ((bullet.x < -STAGE_WIDTH) && (bulletBossIndex < 1)) {
                if (showBoss)
                {
                    bullet.nextX = boss.nextX - 90;
                    bullet.nextY = boss.nextY;
                }
                else if (showMothership)
                {
                    bullet.nextX = mothership.nextX - 90;
                    bullet.nextY = mothership.nextY
                }
                bulletBossIndex = bulletBossLen;
                this.playSoundShoot();
            }
        }
    }

    spaceship.x = nextX;
    spaceship.y = nextY;

    //Bullet Boss and Spaceship Collision
    for (bulletBossIndex = 0; bulletBossIndex < bulletBossLen; bulletBossIndex++) {
        bulletBoss = this.bulletBossContainer.getChildAt(bulletBossIndex);

        var bBossBounds = bulletBoss.getBounds();
        var sBounds = spaceship.getBounds();

        bulletBoss.regX = bBossBounds.width / 2;
        bulletBoss.regY = bBossBounds.height / 2;


               

        if (bulletBoss.x < spaceship.x + spaceship.getBounds().width*spaceship.scaleX   &&
            bulletBoss.x > spaceship.x &&
            bulletBoss.y < spaceship.y + spaceship.getBounds().height*spaceship.scaleY &&
            bulletBoss.y > spaceship.y  && !boolShipOff) 
        {
            spaceshipLife = spaceshipLife - 0.06;
            if (spaceshipLife < 0)
            {
                spaceshipLife = 0;
            }
            barHealth.updateLife(spaceshipLife);
            this.hitSpaceShip(spaceship.x,spaceship.y);
            if (spaceshipLife == 0)
            {
                this.explosionSpaceShip(spaceship.x,spaceship.y);   
            }         
        }
    } 


    //Asteroid and Spaceship Collision
    for (i = 0; i < this.numAsteroids; i++) {
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
            spaceshipLife = spaceshipLife - 0.01;
            if (spaceshipLife < 0)
            {
                spaceshipLife = 0;
            }
            barHealth.updateLife(spaceshipLife);            
            this.hitSpaceShip(spaceship.x,spaceship.y);
            if (spaceshipLife == 0)
            {
                this.explosionSpaceShip(spaceship.x,spaceship.y);   
            }            
        }
    }

    //ndgmr.DEBUG_COLLISION = true;
    //var collision;
    //collision = ndgmr.checkRectCollision(spaceship, asteroid);
    // if (collision) {
    //        this.gameOver();
    // }


    //Asteroid and Shoot Collision
    for (i = 0; i < this.numAsteroids; i++) {
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
                asteroid.nextX = STAGE_WIDTH + asteroid.size * 2;
                asteroid.nextY = 25 + (Math.random() * 575);
                bullet.nextX = STAGE_WIDTH;
                bullet.nextY = 4000;
                this.explosionAsteroids(asteroid.x,asteroid.y);
                this.playSoundAsteroidExplosion();
                if ((intScore == 6000) && (boolLevelUp)) {
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
    //var len = this.asteroidContainer.getNumChildren();

    for (i = 0; i < this.numAsteroids; i++) {
        asteroid = this.asteroidContainer.getChildAt(i);
        asteroid.x = asteroid.nextX;
        asteroid.y = asteroid.nextY;
    }

    var len = this.bulletContainer.getNumChildren();
    for (i = 0; i < len; i++) {
        bullet = this.bulletContainer.getChildAt(i);
        bullet.x = bullet.nextX;
        bullet.y = bullet.nextY;
    }

    len = this.bulletBossContainer.getNumChildren();
    for (i = 0; i < len; i++) {
        bullet = this.bulletBossContainer.getChildAt(i);
        bullet.x = bullet.nextX;
        bullet.y = bullet.nextY;
    }

    boss.x = boss.nextX;
    boss.y = boss.nextY;

    mothership.x = mothership.nextX;
    mothership.y = mothership.nextY;

    this.barEnergyBoss.x = this.barEnergyBoss.nextX;
    this.barEnergyMothership.x = this.barEnergyMothership.nextX;

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
    createjs.Sound.stop(); 
    showBoss = false; 
    showMothership = false;
    spaceshipLife = 1;
    bossLife = 1;
    mothershipLife = 1;
    //createjs.Sound.removeSound(game.assets.SOUND_GAME); 
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