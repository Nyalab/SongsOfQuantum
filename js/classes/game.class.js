
var Game = Class.extend({
    __construct: function(){

    },

    start: function(){
        // Disable context menu
        $(document).bind("contextmenu",function(e){
            return false;
        });

        var side1 = new Side('player1', '#005500');
        var side2 = new Side('player2', '#550000');

        GameGlobals.playerSide = side1;

        side1.changeMinerals(500);
        
        /*
        for(var i=1; i < 5; i++){
            var ship = new VrenrHive("ship_" + i, i*100, i*100);
            ship.draw(GameGlobals.viewport);
            
            if(i%2 == 0){
                side2.add(ship);
            }
            else{
                side2.add(ship);
                ship.flag('controllable');
            }
            
            GameGlobals.shipManager.register(ship);
        }
        */
        
        var i;
        
        for(i=0; i<Map.asteroids.length; i++){
            var asteroid = new Asteroid('asteroid_' + i, Map.asteroids[i].x, Map.asteroids[i].y);
            asteroid.draw(GameGlobals.viewport);
        }
        
        for(i=0; i<Map.spawns.length; i++){
            var nest = new VrenrNest('building_' + i, Map.spawns[i].x, Map.spawns[i].y);
            nest.draw(GameGlobals.viewport);
            nest.flag('controllable');
            side1.add(nest);
            GameGlobals.shipManager.register(nest);
            
            for(var j=0; j < Map.spawns[i].miners; j++){
                var miner = new VrenrMiner('ship_' + j, Map.spawns[i].x + j*20, Map.spawns[i].y + j*20);
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