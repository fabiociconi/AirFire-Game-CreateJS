//************************************************************/
// AssestManager.js                                          */
//                                                           */
// Main Function : Control every Asset of the game           */
//-----------------------------------------------------------*/
(function () {

    window.game = window.game || {};

    var AssetManager = function () {
        this.initialize();
    }
    var p = AssetManager.prototype = new createjs.EventDispatcher();

    p.EventDispatcher_initialize = p.initialize;

    //sounds
    p.SOUND_MENU = 'menu sound';
    p.SOUND_GAME = 'game sound';
    p.SOUND_SHOOT = 'game shoot';
    p.SOUND_ASTEROID_EXPLOSION = 'game asteroid explosion';
    p.SOUND_SHIP_EXPLOSION = 'game ship explosion';
    p.SOUND_COLLISION = 'game collision';
    
    


    //graphics
    p.GAME_SPRITES = 'game sprites';
    p.GAME_SPRITES_2 = 'game sprites 2';
    p.GAME_SPRITES_3 = 'game sprites 3';
    p.GAME_SPRITES_4 = 'game sprites 4';
    //p.FONT_SPRITES = 'font sprites';
    p.BATTLE_BG = 'game bg';
    p.MENU_BG = 'menu bg';
    p.CREDITS_BG = 'credits bg';
    p.GAMEOVER_BG = 'game over bg';
   

    //data
    p.GAME_SPRITES_DATA = 'game sprites data';
    //p.FONT_SHEET_DATA = 'font sheet data';

    //events
    p.ASSETS_PROGRESS = 'assets progress';
    p.ASSETS_COMPLETE = 'assets complete';

    p.assetsPath = 'assets/';

    p.loadManifest = null;
    p.queue = null;
    p.loadProgress = 0;


    p.initialize = function () {
        this.EventDispatcher_initialize();
        this.loadManifest = [
           
            //sprites
            {id:this.GAME_SPRITES_DATA, src:this.assetsPath + 'spritesheet.json'},
            {id:this.GAME_SPRITES, src:this.assetsPath    + 'spritesheet-part1.png'},
            {id:this.GAME_SPRITES_2, src:this.assetsPath + 'spritesheet-part2.png'},
            {id:this.GAME_SPRITES_3, src:this.assetsPath + 'spritesheet-part3.png'},
            {id:this.GAME_SPRITES_4, src:this.assetsPath + 'spritesheet-part4.png'},
            //backgrounds
            {id:this.BATTLE_BG, src:this.assetsPath +  'Level1BG.jpg'},
            {id:this.MENU_BG, src:this.assetsPath    + 'MenuBG.jpg'},
            {id:this.GAMEOVER_BG, src:this.assetsPath + 'GameOverBG.jpg'},
            {id:this.CREDITS_BG, src:this.assetsPath + 'CreditsBG.jpg'},
            
            //sound
            {id:this.SOUND_MENU,src:this.assetsPath +'Theme - Star Wars.ogg'},
            {id:this.SOUND_SHOOT,src:this.assetsPath +'laser.wav'},
            {id:this.SOUND_GAME,src:this.assetsPath +'highway-star.mp3'},
            {id:this.SOUND_ASTEROID_EXPLOSION,src:this.assetsPath +'asteroid_explosion.wav'},
            {id:this.SOUND_SHIP_EXPLOSION,src:this.assetsPath +'spaceship_explosion.wav'},
            {id:this.SOUND_COLLISION,src:this.assetsPath +'metal_collision.wav'}


        ];
    }
    p.preloadAssets = function () {
        createjs.Sound.initializeDefaultPlugins();
        this.queue = new createjs.LoadQueue();
        this.queue.installPlugin(createjs.Sound);
        this.queue.on('progress',this.assetsProgress,this);
        this.queue.on('complete',this.assetsLoaded,this);
        this.queue.loadManifest(this.loadManifest);
    }
    p.assetsProgress = function (e) {
        this.loadProgress = e.progress;
        var event = new createjs.Event(this.ASSETS_PROGRESS);
        this.dispatchEvent(event);
    }
    p.assetsLoaded = function (e) {
        var event = new createjs.Event(this.ASSETS_COMPLETE);
        this.dispatchEvent(event);
    }
    p.getAsset = function (asset) {
        return this.queue.getResult(asset);
    }

    window.game.AssetManager = AssetManager;

}());
