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
        //createjs.Ticker.setFPS(60);
        //createjs.Ticker.on('tick', this.onTick, this);
        this.preloadAssets();
        // this.changeState(game.GameStates.MAIN_MENU);
    }

    //chama preloader and carrega todos os assets do jogo
    p.preloadAssets = function () {

        this.loadTxt = new createjs.Text("Loading.....", '40px Verdana', 'red');
        this.loadTxt.x = canvas.width / 2;
        this.loadTxt.y = 500;
        this.loadTxt.textAlign = 'center';
        stage.addChild(this.loadTxt);

        game.assets = new game.AssetManager();
        this.preloader = new ui.Preloader('blue', 'red');
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
    //sprite sheets - paths
    p.createSpriteSheet = function () {
        var assets = game.assets;
        spritesheet = new createjs.SpriteSheet(assets.getAsset(assets.GAME_SPRITES_DATA));
        
    }

    ///inicia o game//
    p.gameReady = function () {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.onTick, this);
        this.changeState(game.GameStates.MAIN_MENU);
    }
    ///FABIO

    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case game.GameStates.GAME:
                this.currentGameStateFunction = this.gameStateGame;
                break;

            //fabio
            case game.GameStates.CREDITS:
                this.currentGameStateFunction = this.gameStateCredits;
                break;
            //fabio
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
        //fabio
        scene.on(game.GameStateEvents.CREDITS, this.onStateEvent, this, false, { state: game.GameStates.CREDITS });
        //fabio
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    //fabio//
    p.gameStateCredits = function () {
        var scene = new game.Credits();
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    //fabio//
    p.gameStateGame = function () {
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, { state: game.GameStates.GAME });
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
            // p.fpsTxt = new createjs.Text(" FPS : "+(createjs.Ticker.getMeasuredFPS() + 0.5 | 0), '30px Verdana', '#F00');
            // this.fpsTxt.x=440;
            // this.fpsTxt.y=0;
            // stage.addChild(this.fpsTxt);
            this.run();
            stage.update();
            

        }
    }

    window.game.AirFire = AirFire;

}(window));