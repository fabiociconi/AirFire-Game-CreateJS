(function (window) {

    window.game = window.game || {}

    function Credits() {
        this.initialize();
    }
    var p = Credits.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.titleTxt1 = null;
    p.count = 0;


    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        this.addButton();
    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("Credits!", 'bold 40px Verdana', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
       // this.addChild(this.titleTxt);

        this.titleTxt1 = new createjs.Text("Andre\n" +
                                           "Fabio\n" +
                                           "Rodrigo\n"+
                                           "\n\n"+
                                           "\nThanks to: "+
                                           "Sprites:http://unluckystudio.com/", 
                                           'bold 40px News Gothic', 
                                           'yellow');
        this.titleTxt1.x = canvas.width / 2;;
        this.titleTxt1.y = 500;
        this.titleTxt1.textAlign = 'center';
       
        this.addChild(this.titleTxt1,this.titleTxt);
        // this.alpha = 0;
        //createjs.Tween.get(this.titleTxt1).to({ alpha: 1 }, 1000);



    }

    p.addBG = function () {
        //var imgBackground = 'images/BackGOver.jpg';
        //var background2 = new createjs.Bitmap(imgBackground);

        var bg = new createjs.Bitmap(game.assets.getAsset(game.assets.CREDITS_BG));
        bg.scaleX = bg.scaleY = 1.68;
        bg.x = bg.y = 0;


        //background2.scaleX = background2.scaleY = 1.68;
        //background2.x = background2.y = 0;

        this.addChild(bg);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('VOLTA');
        btn.on('click', this.mainMenu, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 400;
        btn.setButton({ upColor: 'FF0000', color: '#FFF', borderColor: '#F00', overColor: '#900' });
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    window.game.Credits = Credits;

}(window));