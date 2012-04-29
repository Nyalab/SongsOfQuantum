var Building = Entity.extend({
    __construct: function(id, x, y){
        this.id = id;
        this.refreshSprite();
        this._super(id, 0, x, y, this.properties.image, this.properties.life);
        this.flag('building');
    },
    
    getName: function(){
        return this.properties.name;
    },
    
    processBuild: function (ship, cost, duration){
       if(this.getSide().hasEnoughtMinerals(-cost)){
           this.getSide().changeMinerals(-cost);
           
           var __this = this; 
           setTimeout(function(){
               __this.endBuild(ship);
           }, duration);
       }
       
       this.nextOrder();
    },
    
    endBuild: function(ship){
        var id = GameGlobals.shipManager.generateId();
        var miner = new ship('ship_' + id, this.x, this.y + 50);
        miner.flag('controllable');
        miner.draw(GameGlobals.viewport);
        this.getSide().add(miner);
        GameGlobals.shipManager.register(miner);
    }
});

