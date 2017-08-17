(function (window) {

    window.game = window.game || {}

    function Options() {
        this.initialize();
    }
    var p = Options.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.titleTxt1 = null;
    p.count = 0;


    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        this.addImageArrow();
        this.addImageSpace();
        

        this.addButton();
      
    }

        
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("OPTIONS", 'bold 40px Agency FB', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 40;
        this.titleTxt.textAlign = 'center';
        this.titleTxt1 = new createjs.Text("CONTROLS", 'bold 40px Agency FB', '#F00');
        this.titleTxt1.x = canvas.width / 2;
        this.titleTxt1.y = 100;
        this.titleTxt1.textAlign = 'center';

        this.titleTxt2 = new createjs.Text("Spaceship Navigation Controls", 'bold 28px Agency FB', 'cyan');
        this.titleTxt2.x = 400;
        this.titleTxt2.y = 300;
        this.titleTxt2.textAlign = 'center';

        this.titleTxt3 = new createjs.Text("Spaceship Shoot Control", 'bold 28px Agency FB', 'cyan');
        this.titleTxt3.x = 810;
        this.titleTxt3.y = 300;
        this.titleTxt3.textAlign = 'center';
       // this.addChild(this.titleTxt);

      
       
       
        this.addChild(this.titleTxt, this.titleTxt1,this.titleTxt2,this.titleTxt3);
        // this.alpha = 0;
        //createjs.Tween.get(this.titleTxt1).to({ alpha: 1 }, 1000);
    }

    p.addImageArrow = function () {
        var img = 'assets/arrow.png';
        var img2 = new createjs.Bitmap(img);


        img2.scaleX = img2.scaleY = .7;
        img2.x = 200;
        img2.y = 250;

        this.addChild(img2);
    }

    p.addImageSpace = function () {
        var imgBar = 'assets/spacebar.png';
        var imgBar2 = new createjs.Bitmap(imgBar);
        imgBar2.scaleX = imgBar2.scaleY = 1.2;
        imgBar2.x = 650;
        imgBar2.y = 385;

        this.addChild(imgBar2);
    }

    p.addBG = function () {

        var bg = new createjs.Bitmap(game.assets.getAsset(game.assets.CREDITS_BG));
        bg.scaleX = .35;
        bg.scaleY = .32;
        bg.x = bg.y = 0;


        this.addChild(bg);
    }


    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('BACK');
        btn.on('click', this.mainMenu, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = canvas.height - 75;
        btn.setButton({ upColor: '#000000', color: 'cyan', borderColor: 'cyan', overColor: '#900' });
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    window.game.Options = Options;

}(window));