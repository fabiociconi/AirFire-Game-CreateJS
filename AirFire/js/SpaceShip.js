//************************************************************/
// SpaceShi.js                                                   */
//                                                           */
// Main Function :  player data                              */
//-----------------------------------------------------------*/
(function () {

    window.game = window.game || {}

    function SpaceShip() {
        this.data = data.PlayerData;
        this.initialize();
    }

    var p = SpaceShip.prototype = new createjs.Container();

    p.data = null;
    p.spaceShipSprite = null;
    //p.targetSprite = null;
    //p.magicSprite = null;
     p.healthBar = null;

    //p.targetTween = null;
    //p.targetable = false;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.createSpaceShipSprite();
       // this.createHealthBar();
        //this.addHealthBar();

    }
    p.createSpaceShipSprite = function () {
        this.spaceShipSprite = new createjs.Sprite(spritesheet, this.data.frame);
        this.addChild(this.spaceShipSprite);
    }
    // p.createHealthBar = function () {
    //     var naveBounds = this.enemySprite.getBounds();
    //     //this.healthBar = new game.EnemyHealthBar(this.data.maxHP);
    //     this.healthBar.y = enemyBounds.height + 10;
    //     this.healthBar.x = (enemyBounds.width / 2) - (this.healthBar.getBounds().width / 2);
    //     this.addChild(this.healthBar);
    // }
    // p.addHealthBar = function () {
    //     var barXOffset = 10;
    //     var lifeBar = new createjs.Sprite(spritesheet, 'lifeBar');
    //     var lifeBarBounds = lifeBar.getBounds();
    //     var barBG = new createjs.Shape();
    //     barBG.graphics.beginFill('#b6b6b6').drawRect(0, 0, lifeBarBounds.width, lifeBarBounds.height);
    //     this.progressBar = new createjs.Shape();
    //     this.progressBar.graphics.beginFill('#c14545').drawRect(0, 0, lifeBarBounds.width - barXOffset, lifeBarBounds.height);
    //     this.progressBar.x = barXOffset;
    //     this.addChild(barBG, this.progressBar, lifeBar);
    // }
    // p.addHP = function () {
    //     var txtXOffset = 8;
    //     var yPOs = 13;
    //     this.hpTxt = new createjs.BitmapText(this.HP.toString(), spritesheet);
    //     this.hpTxt.letterSpacing = 2;
    //     this.hpTxt.x = this.getBounds().width / 2 - txtXOffset;
    //     this.hpTxt.y = yPOs;
    //     this.addChild(this.hpTxt);
    // }
    // p.updateHP = function (HP) {
    //     var perc;
    //     this.HP = this.HP - HP < 0 ? 0 : this.HP - HP;
    //     perc = this.HP / this.maxHP;
    //     this.removeChild(this.hpTxt);
    //     this.addHP();
    //     createjs.Tween.get(this.progressBar).to({scaleX:perc}, 400);
    // }
    window.game.SpaceShip = SpaceShip;

}());