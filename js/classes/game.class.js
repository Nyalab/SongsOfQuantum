
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

        side1.changeMinerals(50);
        
        
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
        
        $('.asteroid').live('mousedown', function(e) {
            e.stopPropagation();
            var asteroid = $(this).data('drawable');
            
            GameGlobals.shipManager.order(function(){
                var ship = $(this).data('drawable');
                ship.setOrder({
                    command: "GATHER", 
                    target: asteroid
                });
            });
        });
        
        $('.ship').live('mousedown', function(e) {
            e.stopPropagation();
            switch (e.which) {
                case 1:
                    if($(this).hasClass('controllable')){
                        GameGlobals.shipManager.pick($(this).data('drawable'));      
                    }
                    
                    break;
                case 2:
                    // middle
                    break;
                case 3:
                    var target = $(this).data('drawable');
                    if($(this).hasClass('controllable')){
                        GameGlobals.shipManager.order(function(){
                            var ship = $(this).data('drawable');
                            ship.setOrder({
                                command: "ATTACK",
                                target: target
                            });
                        });
                    }
                    break;
                default:
                    alert('You have a strange mouse');
            }
        });
        
        
        $('.building').live('mousedown', function(e) {
            e.stopPropagation();
            switch (e.which) {
                case 1:
                    if($(this).hasClass('controllable')){
                        GameGlobals.shipManager.pick($(this).data('drawable'));   
                        GameGlobals.gui.menu.applySelection($('.selected'));
                    }
                    
                    break;
                case 2:
                    // middle
                    break;
                case 3:
                    if($(this).hasClass('controllable')){
                        GameGlobals.shipManager.order(function(){
                            var ship = $(this).data('drawable');
                            ship.setOrder({
                                command: "BUILD_MINER"
                            });
                        });
                    }
                    break;
                default:
                    alert('You have a strange mouse');
            }
        });
        

        // Ship unselect or order
        $('#viewport').mousedown(function(e) {
            switch (e.which) {
                case 1:
                    Cursor.setNoCursor();
                    GameGlobals.shipManager.clearSelection();
                    GameGlobals.gui.menu.applySelection([]);
                    break;
                case 2:
                    // middle
                    break;
                case 3:
                    Cursor.clickEffect(e);
                    
                    var localX = e.pageX - $(GameGlobals.viewport).offset().left;
                    var localY = e.pageY - $(GameGlobals.viewport).offset().top;
                    
                    console.log($(GameGlobals.viewport).offset().left);
                    
                    GameGlobals.shipManager.order(function(){
                        var ship = $(this).data('drawable');
                        ship.setOrder({
                            command: "MOVE", 
                            target: Vector.create([localX, localY])
                        });
                    });
                    break;
                default:
                    alert('You have a strange mouse');
            }
        });
    }
});