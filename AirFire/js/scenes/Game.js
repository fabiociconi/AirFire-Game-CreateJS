(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    var background, background2;
    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.msgTxt = null;
    p.orbContainer = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBackground();
        this.addMessages();
        this.createOrbContainer();
        this.createOrbs();
    }
    p.addBackground = function () {

        var imgBackground = 'images/milkyway.jpg';

        background = new createjs.Bitmap(imgBackground);
        background.scaleX = background.scaleY = 0.2;
        this.addChild(background);  

        background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 0.2;
        background2.x = 1200;

        background.speed = background2.speed =  -2.9;

        this.addChild(background2);  


    }
    p.addMessages = function () {
        this.msgTxt = new createjs.Text("HELLO", '24px Arial', '#FFF');
        this.addChild(this.msgTxt);
    }
    p.createOrbContainer = function () {
        this.orbContainer = new createjs.Container();
        this.addChild(this.orbContainer);
    }
    p.createOrbs = function () {
        var i, orb, color;
        var orbs = this.orbContainer;
        var numOrbs = 12;
        var orbSize = 25;
        for (i = 0; i < numOrbs; i++) {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16)
            orb = new PulsingOrb(color, orbSize);
            orb.speed = Math.random() * 4;
            orb.size = orbSize;
            orb.x = orbSize;
            orb.y = orbSize + (i * orbSize * 2);
            orb.on('click', this.onOrbClick, this);
            orbs.addChild(orb);
        }
    }
    p.onOrbClick = function (e) {
        this.orbContainer.removeChild(e.target);
    }
    p.update = function () {

        //var i, orb, nextX;

        // var len = this.orbContainer.getNumChildren();
        // for (i = 0; i < len; i++) {
        //     orb = this.orbContainer.getChildAt(i);
        //     nextX = orb.x + orb.speed;
        //     if (nextX + orb.size > canvas.width) {
        //         nextX = canvas.width - orb.size;
        //         orb.speed *= -1;
        //     }
        //     else if (nextX - orb.size < 0) {
        //         nextX = orb.size;
        //         orb.speed *= -1;
        //     }
        //     orb.nextX = nextX;
        // }
        var bgMovement, bg1NextX, bg2NextX;

        bg1NextX = background.x + background.speed;
        bg2NextX = background2.x + background2.speed;

        background.x = bg1NextX;
        background2.x = bg2NextX;
        
        if (background.x <= -1200) {
            background.x = background2.x + 1200;            
        }
        if (background2.x <= -1200) {
            background2.x = background.x + 1200;            
        }



    }

    p.render = function () {
        var i, orb;
        var len = this.orbContainer.getNumChildren();
        for (i = 0; i < len; i++) {
            orb = this.orbContainer.getChildAt(i);
            orb.x = orb.nextX;
        }
        this.msgTxt.text = "ORBS LEFT: " + this.orbContainer.getNumChildren();
    }
    p.checkGame = function () {
        if (!this.orbContainer.getNumChildren()) {
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
    }
    p.run = function () {
        this.update();
        this.render();
        this.checkGame();
    }

    window.game.Game = Game;

}(window));