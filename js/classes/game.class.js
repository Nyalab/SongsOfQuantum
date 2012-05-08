
var Game = Class.extend({
    __construct: function(){

    },

    start: function(){

        var side1 = new Side('player1', '#8B8D28');
        var side2 = new Side('player2', '#550000');

        GameGlobals.playerSide = side1;

        side1.changeMinerals(500);
        
        var i;
        
        for(i=0; i<Map.asteroids.length; i++){
            var asteroid = new Asteroid('asteroid_' + i, Map.asteroids[i].x, Map.asteroids[i].y);
            asteroid.draw(GameGlobals.viewport);
        }
        
        for(i=0; i<Map.spawns.length; i++){
            var nest = new KriivNest('building_' + i, Map.spawns[i].x, Map.spawns[i].y);
            nest.draw(GameGlobals.viewport);
            nest.flag('controllable');
            side1.add(nest);
            GameGlobals.shipManager.register(nest);
            
            for(var j=0; j < Map.spawns[i].miners.length; j++){
                var miner = new KriivMiner('ship_' + j, Map.spawns[i].miners[j].x, Map.spawns[i].miners[j].y);
                miner.flag('controllable');
                miner.draw(GameGlobals.viewport);
                side1.add(miner);
                GameGlobals.shipManager.register(miner);
            }
            
        }

        
        Cursor.init();
    },

    loop: function(){
        setInterval(function(){
             GameGlobals.shipManager.process()
             GameGlobals.weaponManager.process()
        }, 20);
    },

    bindMouse: function(){
        GameGlobals.mouse.setState(null);
    }
});