/*
 * In jSpaceRuler, a building is a static unit which can produce other units.
 * Its behavior extends the one of the Entity class.
 * 
 * Special behavior:
 * Unit production is different from the other type of orders. Read
 * carefully the processAddBuild, processBuild and endBuild methods 
 * documentation.
 */
var Building = Entity.extend({
    __construct: function(id, x, y){
        this.id = id;
        this.refreshSprite();
        this._super(id, 0, x, y, this.properties.image, this.properties.life);
        this.flag('building');
        this.productionQueue = [];
        this.isBuilding = false;
    },

    disable: function(){
      if(this.getSprite().hasClass('controllable')){
        this.getSprite().removeClass('controllable');
        this.getSprite().addClass('controllable-disabled');
      }
      this.getSprite().css('opacity', '0.1');
    },

    enable: function(){
      if(this.getSprite().hasClass('controllable-disabled')){
        this.getSprite().removeClass('controllable-disabled');
        this.getSprite().addClass('controllable');
      }
      this.getSprite().css('opacity', '1');
    },

    getName: function(){
        return this.properties.name;
    },
    
    /*
     * Adds an unit to the production queue.
     */
    processAddBuild: function(ship, cost, duration){
       // Check if the side owning the building can afford the production order.
       if(this.getSide().hasEnoughtMinerals(-cost)){
           // If it cans, the resources needed are taken from it.
           this.getSide().changeMinerals(-cost);
           
           // The unit to build is pushed into the queue.
           this.productionQueue.push({
               unit: new ship('none', 0, 0),
               unitClass: ship,
               duration: duration
           });
           this.dispatch("jSpaceRuler:production-update");
       }
       
       // A "build" order is added to the order queue of the building.
       this.addOrder({
           command: "BUILD"
       });
       
       // The "AddBuild" order is completed, we can process to the "Build" order itself.
       this.nextOrder();
    },
    
    /*
     * Handles the build progress of the queued units.
     */
    processBuild: function (){
       this.dispatch("jSpaceRuler:production-update");
       
       // If the production waiting queue is empty, the order is completed.
       if(this.productionQueue.length == 0){
           this.nextOrder();
           return;
       }
       
       // If the unit is still building it don't do anything.
       if(this.isBuilding){
           return;
       }
       // Else, the unit has to build something and is not currently building
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

