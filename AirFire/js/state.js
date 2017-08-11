//************************************************************/
// state.js                                                  */
//                                                           */
// Main Function : Keep Game states - Scenes                 */
//-----------------------------------------------------------*/
(function () {

    window.game = window.game || {};

    var GameStates = {
        RUN_SCENE:0,
        MAIN_MENU:1,
        GAME:10,
        SCORE_SCREEN:11,
        GAME_OVER:20,
        CREDITS:25,
        OPTIONS:30
        
    }

    var GameStateEvents = {
        MAIN_MENU:'main menu event',
        GAME_OVER:'game over event',
        MAIN_MENU_SELECT:'game menu select event',
        GAME:'game event',
        SCORE_SCREEN:'score screen event',
        CREDITS: 'screen credits',
        OPTIONS: 'option control'
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
