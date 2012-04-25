var WeaponManager = Class.extend({
    __construct: function(){
        this.weapons = [];
        this.weaponsCount = 0;
    },

    register: function(weapon){
        for(var i=0; i < this.weapons.length; i++){
            if(this.weapons[i] == null){
                this.weapons[i] = weapon;
                return;
            }
        }

        this.weapons.push(weapon);
    },
    
    generateId: function(){
        return "weapon_" + this.weaponsCount++;
    },
    
    process: function(){
        for(var i=0; i < this.weapons.length; i++){
            if(this.weapons[i] != null && this.weapons[i].life > 0){
                this.weapons[i].computeMove();
            }
            else if(this.weapons[i] != null){
                this.weapons[i].isDead();
                this.weapons[i] = null;
            }
        }
    }
});

