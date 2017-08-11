//************************************************************/
// GameMenu.js                                               */
//                                                           */
// Main Function : Show menu to the user.                    */
//-----------------------------------------------------------*/
// Last Modification: 08/08/2017 - Fabio A. Ciconi           */
// - new background, buttons                                 */
// - Screen transition to game and Credits                   */
// - Added Music - Star Wars Theme (temporarilly)            */
// ----------------------------------------------------------*/
//  09/09/2017 - Fabio A. Ciconi                             */
// Include boarder and animations                            */
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

    const BUTTON_POSITION_X = 550;
    const BUTTON_POSITION_Y = 200;

    const BUTTON_SCALE_X = .5;
    const BUTTON_SCALE_Y = .5;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addTitle();        
        this.addBoarder();
        this.addButtons();
        this.playSound();
    }

    p.playSound = function () {
        createjs.Sound.play(game.assets.SOUND_MENU);
    }

    p.addBackground = function () {
        var background = new createjs.Bitmap(game.assets.getAsset(game.assets.MENU_BG));
        background.x = background.y = 0;
        background.scaleX = .75;
        background.scaleY = .7;
        this.addChild(background);

    }

    p.addTitle = function () {
        this.titleTxt = new createjs.Text("AIR FIRE", 'bold 40px Cambria', 'red');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 150;
        this.titleTxt.textAlign = 'center'

        //animations
        createjs.Tween.get(this.titleTxt, { loop: true })        
            .to({ x: canvas.width / 2 + 20 }, 1000)
            .to({ x: canvas.width / 2 - 20 }, 2000)
            .to({ x: canvas.width / 2 }, 1000);


        //animation mothership
        var motherShip = new createjs.Sprite(spritesheet, 'mother');
        motherShip.x = canvas.width / 2;
        motherShip.y = 450;
        motherShip.scaleX = .8;
        motherShip.scaleY = .8;
        createjs.Tween.get(motherShip, { loop: true })
            .to({ rotation: 360 }, 7000);

        this.addChild(this.titleTxt, motherShip);
    }
    p.addBoarder = function () {
        this.boaderMenu = new createjs.Sprite(spritesheet, 'grade');
        this.boaderMenu.regX = this.boaderMenu.width / 2;
        this.boaderMenu.scaleX = 2.0;
        this.boaderMenu.scaleY = 2.0;
        this.boaderMenu.x = BUTTON_POSITION_X -40;
        this.boaderMenu.y = BUTTON_POSITION_Y;
        this.addChild(this.boaderMenu);
    }
    p.addButtons = function () {

        this.playButton = new createjs.Sprite(spritesheet, 'butPlay');
        this.playButton.on('click', this.playGame, this);
        //this.playButton.regX = this.playButton.width / 2;
        this.playButton.scaleX = BUTTON_SCALE_X;
        this.playButton.scaleY = BUTTON_SCALE_Y;
        this.playButton.x = BUTTON_POSITION_X;
        this.playButton.y = BUTTON_POSITION_Y;

        this.optOptions = new createjs.Sprite(spritesheet, 'butOptions');
        this.optOptions.on('click', this.optionsGame, this);
        //this.optButton.regX = this.optButton.width / 2;
        this.optOptions.scaleX = BUTTON_SCALE_X;
        this.optOptions.scaleY = BUTTON_SCALE_Y;
        this.optOptions.x = BUTTON_POSITION_X;
        this.optOptions.y = BUTTON_POSITION_Y + 70;

        this.optCredits = new createjs.Sprite(spritesheet, 'butCredits');
        this.optCredits.on('click', this.credits, this);
        //this.optCredits.regX = this.optCredits.width / 2;
        this.optCredits.scaleX = BUTTON_SCALE_X;
        this.optCredits.scaleY = BUTTON_SCALE_Y;
        this.optCredits.x = BUTTON_POSITION_X;
        this.optCredits.y = BUTTON_POSITION_Y + 140;

        this.exitButton = new createjs.Sprite(spritesheet, 'butExit');
        //this.exitButton.regX = this.exitButton.width / 2;
        this.exitButton.scaleX = BUTTON_SCALE_X;
        this.exitButton.scaleY = BUTTON_SCALE_Y;
        this.exitButton.x = BUTTON_POSITION_X;
        this.exitButton.y = BUTTON_POSITION_Y +210;

        this.addChild(this.playButton,
            this.optButton,
            this.optOptions,
            this.optCredits,
            this.exitButton);
    }
    p.playGame = function (e) {
        createjs.Sound.removeSound(game.assets.SOUND_MENU);
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    p.optionsGame = function (e) {
        createjs.Sound.removeSound(game.assets.SOUND_MENU);
        this.dispatchEvent(game.GameStateEvents.OPTIONS);
    }

    p.credits = function (e) {
        createjs.Sound.removeSound(game.assets.SOUND_MENU);
        this.dispatchEvent(game.GameStateEvents.CREDITS);
    }

    window.game.GameMenu = GameMenu;

}(window));