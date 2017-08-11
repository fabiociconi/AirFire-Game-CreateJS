//************************************************************/
// GemeOver.js                                               */
//                                                           */
// Main Function : Show Game Over Screen                     */
//-----------------------------------------------------------*/
(function (window) {

    window.game = window.game || {}

    function GameOver() {
        this.initialize();
    }

    var p = GameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addMessage();
        this.addButton();
    }
    p.addBG = function () {
        var bg = new createjs.Bitmap(game.assets.getAsset(game.assets.GAMEOVER_BG));
        bg.scaleX = 0.32;
        bg.scaleY = 0.3;
        bg.x = bg.y = 0;

        this.addChild(bg); 
    }
    p.addMessage = function () {
        this.titleTxt = new createjs.Text("GAME OVER", 'bold 40px Calibri', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }

    p.addButton = function () {
        var btn;
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 280;
        btn.on('click', this.mainMenu, this);
        btn.setButton({upColor:'', color:'cyan', borderColor:'cyan', overColor:'blue'});
        this.addChild(btn);
        btn = new ui.SimpleButton('Play Again');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 350;
        btn.on('click', this.playGame, this);
        btn.setButton({upColor:'', color:'cyan', borderColor:'cyan', overColor:'blue'});
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    window.game.GameOver = GameOver;

}(window));