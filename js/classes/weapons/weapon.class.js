var Weapon = Entity.extend({
    __construct: function(id, angle, x, y, properties){
        this.advanceSpeed = 2;
        this.properties = properties;
        this._super(id, angle, x, y, this.properties.image, this.properties.life);
        this.trackedTarget = null
    },
    
    setTrackedTarget: function(trackedTarget){
        this.trackedTarget = trackedTarget;
        this.updateTarget();
    },
    
    updateTarget: function(){
        this.setTarget(this.trackedTarget.getPosition());
    },
    
    computeMove: function(){
        this.inflictDamages(1);
        
        if(!this.hasTarget()){
            this.trackedTarget.inflictDamages(this.properties.damage);
            this.die();
            return;
        }
        this.updateTarget();
        this._super(this.properties.rotationSpeed, this.properties.advanceSpeed);
    }
});