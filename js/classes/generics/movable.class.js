
var Movable = Drawable.extend({
    __construct: function(id, angle, x, y, image){
        this._super(id, angle, x, y, image);
        this.target = [];
    },
    
    addTarget: function(target){
        this.target.push(target);
    },

    setTarget: function(target){
        this.target = [ target ];
    },

    getCurrentTarget : function(){
        return this.target[0];
    },

    nextTarget : function(){
        this.target.shift();
    },
    
    hasTarget: function(){
        return typeof(this.target[0]) != 'undefined';
    },
    
    computeMove : function(rotationSpeed, advanceSpeed){
        if(!this.hasTarget()){
            return;
        }

        var position = this.getPosition();
  
        var angleRequired = Angle.getAngle(this.getPosition().elements[0], this.getPosition().elements[1], this.target[0].elements[0], this.target[0].elements[1]);
        angleRequired = Angle.toDegrees(angleRequired);
  
        var angularDistance = Angle.getDistance(this.angle, angleRequired);

        if(angularDistance < 0){
            this.angle -= rotationSpeed > Math.abs(angularDistance) ? Math.abs(angularDistance) : rotationSpeed;
        }
        else if(angularDistance > 0){
            this.angle += rotationSpeed > Math.abs(angularDistance) ? Math.abs(angularDistance) : rotationSpeed;
        }
  
        if(position.distanceFrom(this.target[0]) > advanceSpeed){
            this.x = this.x + Math.cos(Angle.toRadians(this.angle)) * advanceSpeed;
            this.y = this.y + Math.sin(Angle.toRadians(this.angle)) * advanceSpeed;
            this.refreshSprite();
        }
        else{
            this.nextTarget();
        }
    }
});