//************************************************************/
// data.js                                                   */
//                                                           */
// Main Function : keep All character atributes              */
//-----------------------------------------------------------*/

(function () {

    window.data = window.data || {};

    var EnemyData = {};
    var GameData = {};
    var PlayerData = {};

   PlayerData = {
        frame:'SpaceShip',
        life:3,
        score:0
        //weakness:'',
        //power:2,
        //defense:0
    }
    EnemyData = {
        frame:'asteroides',
        life:3
    }

    /*GAME DATA*/
    //testar
    // GameData = {
    //     currentLevel:1
    // }
    // GameData.levelData = [
    //     {
    //         //type:'field',
    //         //enemies:['troll1', 'troll1', 'troll1'],
    //         enemiesSpeed: 2,
    //         enemyStreak:1,        
    //         defense:0,        
    //         scoreAwarded:100    
    //     },
    //             {
    //         type:'boss',
    //         boss:'octopus',
    //         enemyStreak:4,            
    //         enemiesSpeed:4,
    //         defense:10,
    //         scoreAwarded:300            
    //     }]
    window.data.EnemyData = EnemyData;
    window.data.GameData = GameData;
    window.data.PlayerData = PlayerData;

}());
