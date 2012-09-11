var Entity = Movable.extend({
    __construct: function(id, angle, x, y, image, life){
        this.id = id;
        this.refreshSprite();
        this.life = life;
        this.maximumLife = life;
        this.orderList = [];
        this._super(id, angle, x, y, image);


        this.setRenderer('map', function(entity){
            var className = "";
            while(entity.flags.length > 0){
                className += entity.flags.pop() + " ";
            }
            
            var img = $('<img />')
                .attr('id', entity.id)
                .attr('src', entity.image)
                .addClass(className)
                .css('position', 'absolute')
                .css('left', entity.x + 'px')
                .css('top', entity.y + 'px')
                .load(function(){
                    $(this).data('binded-class').refreshSprite();
                });

            img.data('binded-class', entity);

            return img;
        });


        this.setRenderer('dock-single', function(entity){
            var container = $("<div/>", {
              'class' : "entityInDockContainer"
            });

            var leftsubcontainer = $("<div/>", {
              'class' : "entityInDockLeftSubContainer"
            }).appendTo(container);

            entity.draw('big-visual').appendTo(leftsubcontainer);

            var counters = $("<p/>", {
              'class' : "entityCountersInDockListDefault"
            }).appendTo(leftsubcontainer);

            var life = $("<h2/>", {
              'id' : 'unit_life',
              'text' : entity.getLife() + ' / ' + entity.getMaxLife()
            }).appendTo(counters);

            var rightsubcontainer = $("<div/>", {
              'class' : "entityInDockRightSubContainer"
            }).appendTo(container);

            var name = $("<h1/>", {
              'id' : 'unit_title',
              'text' : entity.getName()
            }).appendTo(rightsubcontainer);

            return container;
        });
        
        this.setRenderer('dock-multi', function(entity){
            var container = $('<div>', { 'class': 'entityInDockListDefault' });
            var img = $('<img>', {
                'src': entity.properties.image
            }).appendTo(container);

            return container; 
        });


        this.setRenderer('big-visual', function(entity){
            var visual = $("<div>", {
              'class' : "entityVisualInDockListDefault"
            });

            return visual;
        });

    },

    getName: function(){
        return this.properties.name;
    },
    
    getLife: function(){
        return this.life;
    },
    
    getMaximumLife: function(){
        return this.maximumLife;
    },

    getMaxLife: function(){
        return this.getMaximumLife();
    },
    
    getSide: function(){
        return this.getSprite().data('side');
    },
    
    inflictDamages: function(damage){
        this.life -= damage;
        if(this.life <= 0){
            this.die();
        }
        
        this.dispatch("jSpaceRuler:life-update");
    },
    
    isDead: function(){
        return this.life <= 0;  
    },
    
    die: function(){
        this.life = 0;
        this.dispatch("jSpaceRuler:die");
        this.getSprite().remove();
    },
    
    setOrder: function(order){
        for(var i in this.orderList){
            if(typeof(this.orderList[i].onCancel) != 'undefined'){
                this.orderList[i].onCancel();
            }
        }
        this.orderList = [];

        if(typeof(this.properties.actions[order.command]) != 'undefined'){
            this.addOrder(order);
        }
    },
    
    addOrder: function(order){
        if(typeof(this.properties.actions[order.command]) != 'undefined'){
            this.orderList.push(order);
        }
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
            this.processUnknown(order);
        }

  
    },

    processUnknown: function(order){
        console.log('Error: unknown order: ' + order.command)
        this.nextOrder();
    }
});