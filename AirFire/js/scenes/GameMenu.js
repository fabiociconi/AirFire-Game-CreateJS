(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;
     
    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
   

        //fabio menu buttons
        this.addButtons();
        //fabio menu buttons

    }
    p.addBG = function () {
        var bg = new createjs.Bitmap(game.assets.getAsset(game.assets.MENU_BG));
        bg.scaleX = bg.scaleY = .8;
        bg.x = bg.y = 0;
        this.addChild(bg);
        //this.addChild(background2);

    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("AIR FIRE!", 'bold 40px Verdana', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addButtons = function () {
         
        this.playButton = new createjs.Sprite(spritesheet, 'butPlay');
        this.playButton.on('click', this.playGame, this);
        this.playButton.regX = this.playButton.width / 2;
        this.playButton.scaleX = 0.5;
        this.playButton.scaleY = 0.5;
        this.playButton.x = 550;
        this.playButton.y = 280;


        this.optButton = new createjs.Sprite(spritesheet, 'butOptions');
        // optButton.on('click',this.playGame,this);
        this.optButton.regX = this.optButton.width / 2;
        this.optButton.scaleX = 0.5;
        this.optButton.scaleY = 0.5;
        this.optButton.x = 550;
        this.optButton.y = 350;

        this.optCredits = new createjs.Sprite(spritesheet, 'butCredits');
        this.optCredits.on('click',this.credits,this);
        this.optCredits.regX = this.optCredits.width / 2;
        this.optCredits.scaleX = 0.5;
        this.optCredits.scaleY = 0.5;
        this.optCredits.x = 550;
        this.optCredits.y = 420;


        this.exitButton = new createjs.Sprite(spritesheet, 'butExit');
        // optButton.on('click',this.playGame,this);
        this.exitButton.regX = this.exitButton.width / 2;
        this.exitButton.scaleX = 0.5;
        this.exitButton.scaleY = 0.5;
        this.exitButton.x = 550;
        this.exitButton.y = 490;

        this.addChild(this.playButton,
            this.optButton,
            this.optCredits,
            this.exitButton);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.credits = function(e){
        this.dispatchEvent(game.GameStateEvents.CREDITS);
    }

    window.game.GameMenu = GameMenu;

}(window));