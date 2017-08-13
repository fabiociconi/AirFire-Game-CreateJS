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
        this.titleTxt = new createjs.Text("GAME OVER", 'bold 150px Cambria', 'red');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 10;
        this.titleTxt.shadow = new createjs.Shadow("cyan", 5, 5, 10);
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }

    p.playSound = function () {
            createjs.Sound.play(game.assets.SOUND_MENU);
    }



    p.addButton = function () {


        var btn1;
        var btn2;
        btn = new ui.SimpleButton('Main Menu');
        btn.on('click', this.mainMenu, this);
        btn.regX = btn.width / 2;        
        btn.x = canvas.width / 2;
        btn.y = canvas.height -260;      
        btn.setButton({upColor:'#000000', color: 'cyan', borderColor: 'cyan', overColor: '#900' });
        this.addChild(btn);

        btn2 = new ui.SimpleButton('Play Again');
        btn2.on('click', this.playGame, this);
        btn2.regX = btn.width / 2;
        btn2.x = canvas.width / 2;
        btn2.y = canvas.height -340;   
        
        btn2.setButton({upColor:'#000000', color: 'cyan', borderColor: 'cyan', overColor: '#900' });
        this.addChild(btn2);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
        this.playSound();
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    window.game.GameOver = GameOver;

}(window));