//************************************************************/
// Nave.js                                                   */
//                                                           */
// Main Function :  player data                              */
//-----------------------------------------------------------*/
(function () {

    window.game = window.game || {}

    function Nave() {
        this.data = data.PlayerData;
        this.initialize();
    }

    var p = Nave.prototype = new createjs.Container();

    p.data = null;
    p.naveSprite = null;
    //p.targetSprite = null;
    //p.magicSprite = null;
    //p.healthBar = null;

    //p.targetTween = null;
    //p.targetable = false;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.createNaveSprite();

    }
    p.createNaveSprite = function () {
        this.naveSprite = new createjs.Sprite(spritesheet, this.data.frame);
        this.addChild(this.naveSprite);
    }
    
    window.game.Nave = Nave;

}());