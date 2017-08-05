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
        //this.addOrbs();
        //this.addButton();

        //fabio menu buttons
        this.addButtons();
        //fabio menu buttons

    }
    p.addBG = function () {

        var imgBackground = 'images/milkyway.jpg';

        var background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 0.3;
        background2.x = background2.y = 0;

        this.addChild(background2);

    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("AIR FIRE!", 'bold 40px Verdana', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    // p.addOrbs = function () {

    //     var i, orb;
    //     var orbContainer = new createjs.Container();
    //     var numOrbs = 5;
    //     var orbSize = 20;
    //     var orbPadding = 10;
    //     var orbsPosition = 300;
    //     for (i = 0; i < numOrbs; i++) {
    //         orb = new PulsingOrb('#FFF', orbSize);
    //         orb.x = i * ((orbSize * 2) + orbPadding);
    //         orbContainer.addChild(orb);
    //     }
    //     orbContainer.x = orbContainer.y = orbsPosition;
    //     this.addChild(orbContainer);
    // }
    // p.addButton = function () {
    //     var btn, event;
    //     btn = new ui.SimpleButton('Play Game');
    //     btn.on('click',this.playGame,this);
    //     btn.regX = btn.width / 2;
    //     btn.x = canvas.width / 2;
    //     btn.y = 400;
    //     btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#F00', overColor:'#900'});
    //     this.addChild(btn);
    // }
    p.addButtons = function () {
        //var bounds;
        //var yPos = 850;

        //this.playButton = new createjs.Sprite(data, "airship");
        // bounds = this.playButton.getBounds();
        // this.playButton.regX = bounds.width / 2;
        // this.playButton.x = screen_width / 2;
        // this.playButton.y = yPos;
        // this.contBtn = this.playButton.clone();
        // this.contBtn.gotoAndStop("playButton2");
        // this.contBtn.y = (yPos + bounds.height * 1.5);
        //this.gameBtn.on('click', this.onButtonClick, this);
        // this.contBtn.on('click', this.onButtonClick, this);
        //this.addChild(this.gameBtn, this.contBtn);
        //this.addChild(this.playButton);
        this.ss = new createjs.SpriteSheet(data);


        this.playButton = new createjs.Sprite(this.ss, 'butPlay');
        //bounds = playButton.getBounds();
        this.playButton.on('click', this.playGame, this);
        this.playButton.regX = this.playButton.width / 2;
        this.playButton.scaleX = 0.5;
        this.playButton.scaleY = 0.5;
        this.playButton.x = 550;
        this.playButton.y = 280;

        // var slot = this.playButton;

        // var pt = slot.globalToLocal(stage.mouseX, stage.mouseY);

        // if (slot.hitTest(pt.x, pt.y)) {
        //     this.playButton = new createjs.Sprite(this.ss, 'butPlay2');
        //     console.log("TICK!!!");
        // }
        //cksfldkls


        this.optButton = new createjs.Sprite(this.ss, 'butOptions');
        // optButton.on('click',this.playGame,this);
        this.optButton.regX = this.optButton.width / 2;
        this.optButton.scaleX = 0.5;
        this.optButton.scaleY = 0.5;
        this.optButton.x = 550;
        this.optButton.y = 350;

        this.optCredits = new createjs.Sprite(this.ss, 'butCredits');
        this.optCredits.on('click',this.credits,this);
        this.optCredits.regX = this.optCredits.width / 2;
        this.optCredits.scaleX = 0.5;
        this.optCredits.scaleY = 0.5;
        this.optCredits.x = 550;
        this.optCredits.y = 420;


        this.exitButton = new createjs.Sprite(this.ss, 'butExit');
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
    // p.run = function () {
    //     //this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    // }
    window.game.GameMenu = GameMenu;

}(window));