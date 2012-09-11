
var Game = Class.extend({
    __construct: function(players){
        this.players = players;
    },

    loadMap: function(mapUrl){
        var __this = this;
        $.ajax({
            url: mapUrl,
            dataType: 'json',
            success: function(data){ 
                __this.start(data) 
            }
        });
    },

    getRaceStartingUnits: function(race){
        if(race == "terrestris"){
            return {
                miner: TerrestrisMiner,
                commandCenter: TerrestrisDock
            }
        }
        else if(race == "kriiv"){
            return {
                miner: KriivMiner,
                commandCenter: KriivNest
            }
        }
        else{
            return {
                miner: KriivMiner,
                commandCenter: KriivNest
            }
        }
    },

    start: function(data){
        GameGlobals.gui.menu.setDimensions();

        var sides = [];
        for(var i in this.players){
            sides[i] = new Side(this.players[i].id, this.players[i].color);
            if(this.players[i].type == "human"){
                GameGlobals.playerSide = sides[i];
            }
            sides[i].changeMinerals(data.startingRessources);
        }
        
        var i;
        
        $('#viewport').css('width', data.miscellaneous.width + 'px');
        $('#viewport').css('height', data.miscellaneous.height + 'px');

        // Parallax init
        $('#viewport').append('<div id="parallax" data-stellar-ratio="0.5" style="position: relative;">' + data.background + '</div>');
        $('#map').stellar();

        for(i=0; i<data.asteroids.length; i++){
            var asteroid = new Asteroid('asteroid_' + i, data.asteroids[i].x, data.asteroids[i].y);
            asteroid.draw('map').appendTo(GameGlobals.viewport);
        }
        
        for(i=0; i<data.spawns.length; i++){
            var units = this.getRaceStartingUnits(this.players[i].race);

            var nest = new units.commandCenter('building_' + i, data.spawns[i].x, data.spawns[i].y);
            nest.draw('map').appendTo(GameGlobals.viewport);

            if(i == 0){
                nest.flag('controllable');
                sides[i].add(nest);
            }
            else{
                sides[i].add(nest);
            }

            
            GameGlobals.shipManager.register(nest);
            
            for(var j=0; j < data.spawns[i].miners.length; j++){
                var miner = new units.miner('ship_' + i + '_' + j, data.spawns[i].miners[j].x, data.spawns[i].miners[j].y);
                miner.draw('map').appendTo(GameGlobals.viewport);

                if(GameGlobals.playerSide == sides[i]){
                    miner.flag('controllable');
                }

                if(i == 0){
                    sides[i].add(miner);
                }
                else{
                    sides[i].add(miner);
                }

                GameGlobals.shipManager.register(miner);
            }
            
        }

        
        GameGlobals.cursor.init();
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