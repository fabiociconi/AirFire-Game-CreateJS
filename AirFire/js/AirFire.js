//************************************************************/
// AirFire.js                                                */
//                                                           */
// Main Function : Controls Scenes, preload assets           */
//                                                           */
//-----------------------------------------------------------*/
// Last Modification: 08/08/2017 - Fabio A. Ciconi           */
// - Preload                                                 */
//************************************************************/

(function (window) {

    window.game = window.game || {}

    function AirFire() {
        this.initialize();
    }

    var p = AirFire.prototype;

    p.currentGameStateFunction;
    p.currentGameState;
    p.currentScene;
    p.loadTxt =null;
    p.initialize = function () {
        canvas = document.getElementById('canvas');
        stage = new createjs.Stage(canvas);
        this.preloadAssets();
    }

    //Call Preloader and load all game assets
    p.preloadAssets = function () {

        this.loadTxt = new createjs.Text("Loading...", '40px Calibri', 'cyan');
        this.loadTxt.x = canvas.width / 2;
        this.loadTxt.y = (canvas.height / 2) + 50;
        this.loadTxt.textAlign = 'center';
        stage.addChild(this.loadTxt);

        game.assets = new game.AssetManager();
        this.preloader = new ui.Preloader('red', 'cyan');
        this.preloader.x = (canvas.width / 2) - (this.preloader.width / 2);
        this.preloader.y = (canvas.height / 2) - (this.preloader.height / 2);
        stage.addChild(this.preloader);
        game.assets.on(game.assets.ASSETS_PROGRESS, this.onAssetsProgress, this);
        game.assets.on(game.assets.ASSETS_COMPLETE, this.assetsReady, this);
        game.assets.preloadAssets();
    }
    
    p.onAssetsProgress = function () {
        this.preloader.update(game.assets.loadProgress);
        stage.update();
    }
    p.assetsReady = function () {
        stage.removeChild(this.preloader);
        this.createSpriteSheet();
        this.gameReady();
    }

    //Sprite Sheets - Paths
    p.createSpriteSheet = function () {
        var assets = game.assets;
        spritesheet = new createjs.SpriteSheet(assets.getAsset(assets.GAME_SPRITES_DATA));        
    }

    //Start the Game
    p.gameReady = function () {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.onTick, this);
        this.changeState(game.GameStates.MAIN_MENU);
    }

    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case game.GameStates.GAME:
                this.currentGameStateFunction = this.gameStateGame;
                break;
           
            case game.GameStates.CREDITS:
                this.currentGameStateFunction = this.gameStateCredits;
                break;
            
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameStates.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
                break;
        }
    }

    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    }

    p.gameStateMainMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, { state: game.GameStates.GAME });        
        scene.on(game.GameStateEvents.CREDITS, this.onStateEvent, this, false, { state: game.GameStates.CREDITS });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateCredits = function () {
        var scene = new game.Credits();
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGame = function () {
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameOver = function () {
        var scene = new game.GameOver();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, { state: game.GameStates.GAME });
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateRunScene = function () {
        if (this.currentScene.run) {
            this.currentScene.run();
        }
    }

    p.run = function () {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction();
        }
    }

    p.onTick = function (e) {
        if (!e.paused) {
            this.run();
            stage.update();
        }
    }

    window.game.AirFire = AirFire;

}(window));