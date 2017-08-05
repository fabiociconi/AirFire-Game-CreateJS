(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;
//fabio
         //var spritesheet = new createjs.SpriteSheet('images/spritesheet.png');
       
         var data1 = {
        "images": ["images/spritesheet.png"],
            "frames": [
                   [768,512,256,256],
                    [1280,512,256,256]],
                   //3328,"y":512,"w":256,"h":256 
                //[768,512,256,256]
                 //   [1280,512,256,256] ],                   
        "animations": {
            "but":{frames:[0,1],"speed":2.1}    
            //"but2":{frames:[1],"speed":2.1}
            //"playButton2":[2]
            //"x":0,"y":2176,"w":640,"h":640
        }
    };
     var data = 
        {
          
            "images": ["images/images.png"],
            "frames": [
                [0, 0, 512, 512],
                [512, 0, 512, 512],
                [1024, 0, 512, 512],
                [1536, 0, 512, 512],
                [0, 512, 256, 256],
                [256, 512, 256, 256],
                [512, 512, 256, 256],
                [768, 512, 256, 256],
                [1024, 512, 256, 256],
                [1280, 512, 256, 256],
                [1536, 512, 256, 256],
                [1792, 512, 256, 256]],
            "animations": 
            {
                "airship":{frames:[0,1,2,3],"speed":2.1},
                "playButton": {frames: [9,10],"speed":2.1},
                "creditsButton": { frames: [4,5],"speed":2.1 },
                "exitButton": { frames: [6, 7],"speed":2.1 }
                
            }
        
    };
 //fabio
    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        //this.addOrbs();
        //this.addButton();
        //fabio menu buttons
        this.addButtons()
        //fabio menu buttons
       
    }
    p.addBG = function () {

        var imgBackground = 'images/milkyway.jpg';
        
        var background2 = new createjs.Bitmap(imgBackground);
        background2.scaleX = background2.scaleY = 0.2;
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
    p.addOrbs = function () {

        var i, orb;
        var orbContainer = new createjs.Container();
        var numOrbs = 5;
        var orbSize = 20;
        var orbPadding = 10;
        var orbsPosition = 300;
        for (i = 0; i < numOrbs; i++) {
            orb = new PulsingOrb('#FFF', orbSize);
            orb.x = i * ((orbSize * 2) + orbPadding);
            orbContainer.addChild(orb);
        }
        orbContainer.x = orbContainer.y = orbsPosition;
        this.addChild(orbContainer);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('Play Game');
        btn.on('click',this.playGame,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 400;
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#F00', overColor:'#900'});
        this.addChild(btn);
    }
     p.addButtons = function () {
        var bounds;
        var yPos = 850;
        
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
        var ss = new createjs.SpriteSheet(data1);
        var playButton = new createjs.Sprite(ss,'but'); 
        //bounds = playButton.getBounds();
        playButton.on('click',this.playGame,this);
        playButton.regX = playButton.width / 2;
        playButton.scaleX =0.5;
        playButton.scaleY =0.5;
        playButton.x = 550;
        playButton.y = 280;
        //airplane.gotoAndStop("but") ;
        //airplane.x = 800 / 2;
        //airplane = yPos;

        //airplane.gotoAndStop("but2");
          this.addChild(playButton);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.run = function () {
        //this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.game.GameMenu = GameMenu;

}(window));