var WeaponGenerator = Class.extend({
    
    __construct: function(ship, reloadTime, range){
        this.ship = ship;
        this.reloadTime = reloadTime;
        this.cooldown = 0;
        this.range = range;
    },
    
    isCloseEnought: function(target){
        return this.ship.getPosition().distanceFrom(target.getPosition()) < this.range;
    },
    
    fire: function(target){
        if(this.cooldown < 0){    
            var id = Guid.generate();
            var weapon = new Weapon(id, this.ship.angle, this.ship.x, this.ship.y, this.ship.properties.weapon);
            weapon.draw(GameGlobals.viewport);
            weapon.setTrackedTarget(target);
            
            GameGlobals.weaponManager.register(weapon);
            this.cooldown = this.reloadTime;
        }
        else{
            this.cooldown--;
        }
    }
    
});
