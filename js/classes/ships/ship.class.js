var Ship = Entity.extend({
    __construct: function(id, x, y){
        this.id = id;
        this.refreshSprite();
        this.weaponCouldown = 0;
        this.weaponGenerator = new WeaponGenerator(this, this.properties.weapon.reloadTime, this.properties.weapon.range);
        this._super(id, 0, x, y, this.properties.image, this.properties.life);
        this.flag('ship');
    },
    
   findNearest: function(selector){
       var _this = this;
       var selected = null;
       $(selector).each(function(){
           
           if(selected == null){
               selected = $(this).data('drawable');
           }
           else{
               var tested = $(this).data('drawable').getPosition();
               var current = selected.getPosition();

               if(_this.getPosition().distanceFrom(tested) < _this.getPosition().distanceFrom(current)){
                   selected = $(this).data('drawable');
               }
           }
       });
       
       return selected;
   },
    
    processAttack: function(order){
        if(order.target.isDead()){
            this.nextOrder();
            return;
        }
        
        if(!this.weaponGenerator.isCloseEnought(order.target)){
            this.setTarget(order.target.getPosition());
            this.computeMove();
        }
        else{
            this.weaponGenerator.fire(order.target);
        }
    },
    
    processMove: function(order){
        this.setTarget(order.target);
        this.computeMove();
    },
    
    computeMove: function(){
        this._super(this.properties.rotationSpeed, this.properties.advanceSpeed);
    },
    
    setSprite: function(sprite){
        this._super(sprite);
        console.log('change');
        this.getSide().colorize(this);
        processFilters();
    }
});