//************************************************************/
// Credits.js                                                */
//                                                           */
// Main Function :  Credits Screen                           */
//-----------------------------------------------------------*/

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
        this.titleTxt = new createjs.Text("CREDITS!", 'bold 40px Cambria', '#F00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 150;
        this.titleTxt.textAlign = 'center';
       // this.addChild(this.titleTxt);

        this.titleTxt1 = new createjs.Text("Andre Lemos\n" +
                                           "Fabio Ciconi\n" +
                                           "Rodrigo Geronimo\n"+
                                           "\n"+
                                           "\nThanks to: "+
                                           "Sprites: http://unluckystudio.com/", 
                                           '40px Cambria', 
                                           'yellow');
        this.titleTxt1.x = canvas.width / 2;;
        this.titleTxt1.y = canvas.height / 2 - 50;
        this.titleTxt1.textAlign = 'center';
       
        this.addChild(this.titleTxt1,this.titleTxt);
        // this.alpha = 0;
        //createjs.Tween.get(this.titleTxt1).to({ alpha: 1 }, 1000);



    }

    p.addBG = function () {
        //var imgBackground = 'images/BackGOver.jpg';
        //var background2 = new createjs.Bitmap(imgBackground);

        var bg = new createjs.Bitmap(game.assets.getAsset(game.assets.CREDITS_BG));
        bg.scaleX = .35;
        bg.scaleY = .32;
        bg.x = bg.y = 0;


        //background2.scaleX = background2.scaleY = 1.68;
        //background2.x = background2.y = 0;

        this.addChild(bg);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('BACK');
        btn.on('click', this.mainMenu, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = canvas.height - 75;
        btn.setButton({ upColor: 'FF0000', color: '#FFF', borderColor: '#F00', overColor: '#900' });
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    window.game.Credits = Credits;

}(window));