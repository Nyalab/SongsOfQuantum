var Entity = Movable.extend({
    __construct: function(id, angle, x, y, image, life){
        this.id = id;
        this.refreshSprite();
        this.life = life;
        this.maximumLife = life;
        this.orderList = [];
        this._super(id, angle, x, y, image);
    },
    
    getLife: function(){
        return this.life;
    },
    
    getMaximumLife: function(){
        return this.maximumLife;
    },
    
    getSide: function(){
        return this.getSprite().data('side');
    },
    
    inflictDamages: function(damage){
        this.life -= damage;
        if(this.life <= 0){
            this.die();
        }
    },
    
    isDead: function(){
        return this.life <= 0;  
    },
    
    die: function(){
        this.life = 0;
        this.getSprite().remove();
    },
    
    setOrder: function(order){
        this.orderList = [];
        this.addOrder(order);
    },
    
    addOrder: function(order){
        this.orderList.push(order);
    },
    
    getCurrentOrder: function(){
        return this.orderList[0];
    },
    
    nextOrder: function(){
        this.orderList.shift();
    },
    
    process: function(){
        var order = this.getCurrentOrder();
        
        if(typeof(order) == 'undefined'){
            // Idling
            return;
        }
        else if(typeof(this.properties.actions[order.command]) != 'undefined'){
            this.properties.actions[order.command].apply(this, [order]);
        }
        else{
            this.processUnknown();
        }

  
    },

    processUnknown: function(){
        console.log('Error: unknown order.')
        this.nextOrder();
    }
});