var Building = Entity.extend({
    __construct: function(id, x, y){
        this.id = id;
        this.refreshSprite();
        this._super(id, 0, x, y, this.properties.image, this.properties.life);
        this.flag('building');
        this.productionQueue = [];
        this.isBuilding = false;
    },
    
    getName: function(){
        return this.properties.name;
    },
    
    /*
     * Adds an unit to the production queue.
     */
    processAddBuild: function(ship, cost, duration){
       if(this.getSide().hasEnoughtMinerals(-cost)){
           this.getSide().changeMinerals(-cost);

           this.productionQueue.push({
               unit: new ship('none', 0, 0),
               unitClass: ship,
               duration: duration
           });
           this.dispatch("jSpaceRuler:production-update");
       }
       
       this.addOrder({
           command: "BUILD"
       });
       this.nextOrder();
    },
    
    /*
     * Handles the build progress of an unit.
     */
    processBuild: function (){
       this.dispatch("jSpaceRuler:production-update");
       if(this.productionQueue.length == 0){
           this.nextOrder();
           return;
       }
       
       if(this.isBuilding){
           return;
       }
       else{
           this.productionQueue[0].startTime = (new Date()).getTime();
           var __this = this; 
           setTimeout(function(){
               __this.endBuild(__this.productionQueue[0].unitClass);
           }, this.productionQueue[0].duration);
       }
       
       this.isBuilding = true;
    },
    
    /*
     * Handles the end of production of an unit.
     */
    endBuild: function(ship){
        var id = GameGlobals.shipManager.generateId();
        var unit = new ship('ship_' + id, this.x, this.y + 50);
        unit.flag('controllable');
        unit.draw(GameGlobals.viewport);
        this.getSide().add(unit);
        GameGlobals.shipManager.register(unit);
        
        this.productionQueue.splice(0,1);
        this.isBuilding = false;
        this.dispatch("jSpaceRuler:production-update");
    }
});

