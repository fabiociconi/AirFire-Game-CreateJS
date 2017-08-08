//************************************************************/
// GameMenu.js                                               */
//                                                           */
// Main Function : Show menu to the user.                    */
//-----------------------------------------------------------*/
// Last Modification: 08/08/2017 - Fabio A. Ciconi           */
// - new background, buttons                                 */
// - Screen transition to game and Credits                   */
// - Added Music - Star Wars Theme (temporarilly)            */
//************************************************************/

(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.titleTxt = null;
    p.count = 0;
    p.som = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addTitle();
        this.playSound();
        this.addButtons();
    }

    p.playSound = function () {
        createjs.Sound.play(game.assets.SOUND_MENU);
    }

    p.addBackground = function () {
        var background = new createjs.Bitmap(game.assets.getAsset(game.assets.MENU_BG));
        background.x = background.y = 0;
        this.addChild(background);

    }

    p.addTitle = function () {
        this.titleTxt = new createjs.Text("AIR FIRE!", 'bold 40px Verdana', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center'

        //animations
        createjs.Tween.get(this.titleTxt, { loop: true })
            .to({ x: canvas.width / 2 - 30}, 1000).to({ x: canvas.width / 2 }, 1000);


        //animation mothership
        var motherShip = new createjs.Sprite(spritesheet, 'mother');
        motherShip.x = canvas.width / 2;
        motherShip.y = 450;
        motherShip.scaleX = .8;
        motherShip.scaleY = .8;
        createjs.Tween.get(motherShip, { loop: true })
            .to({ rotation: 360 }, 5000);

        this.addChild(this.titleTxt, motherShip);
    }

    p.addButtons = function () {

        this.playButton = new createjs.Sprite(spritesheet, 'butPlay');
        this.playButton.on('click', this.playGame, this);
        this.playButton.regX = this.playButton.width / 2;
        this.playButton.scaleX = 0.5;
        this.playButton.scaleY = 0.5;
        this.playButton.x = canvas.width / 2;
        this.playButton.y = 280;    

        this.optButton = new createjs.Sprite(spritesheet, 'butOptions');
        this.optButton.regX = this.optButton.width / 2;
        this.optButton.scaleX = 0.5;
        this.optButton.scaleY = 0.5;
        this.optButton.x = canvas.width / 2;
        this.optButton.y = 350;

        this.optCredits = new createjs.Sprite(spritesheet, 'butCredits');
        this.optCredits.on('click', this.credits, this);
        this.optCredits.regX = this.optCredits.width / 2;
        this.optCredits.scaleX = 0.5;
        this.optCredits.scaleY = 0.5;
        this.optCredits.x = canvas.width / 2;
        this.optCredits.y = 420;

        this.exitButton = new createjs.Sprite(spritesheet, 'butExit');
        this.exitButton.regX = this.exitButton.width / 2;
        this.exitButton.scaleX = 0.5;
        this.exitButton.scaleY = 0.5;
        this.exitButton.x = canvas.width / 2;
        this.exitButton.y = 490;

        this.addChild(this.playButton,
            this.optButton,
            this.optCredits,
            this.exitButton);
    }
    p.playGame = function (e) {
        createjs.Sound.removeSound(game.assets.SOUND_MENU);
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.credits = function (e) {
        this.dispatchEvent(game.GameStateEvents.CREDITS);
    }

    window.game.GameMenu = GameMenu;

}(window));