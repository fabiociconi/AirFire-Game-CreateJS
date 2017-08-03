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
        var imgBackground = 'images/BackGOver.jpg';

        var background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 1.19;
        background2.x = background2.y = 0;

        this.addChild(background2); 
    }
    p.addMessage = function () {
        this.titleTxt = new createjs.Text("GAME OVER", '40px Space Mono', '#FFF');
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
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
        this.addChild(btn);
        btn = new ui.SimpleButton('Play Again');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 350;
        btn.on('click', this.playGame, this);
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
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