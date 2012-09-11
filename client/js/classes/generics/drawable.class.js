var Drawable = Class.extend({
    __construct: function(id, angle, x, y, image){
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.image = image;
        this.flags = [];

        this.renderers = [];
    },
    
    dispatch: function(name){
        var event = jQuery.Event(name);
        $(this.getSprite()).trigger(event);
    },
    
    getSprite: function(){
        return $('#' + this.id);
    },
    
    setSprite: function(sprite){
        $('#' + this.id).attr('src', sprite);
    },
    
    flag: function(flag){
        if(this.getSprite().size() == 1){
            // We wait till the sprite is drawn.
            this.getSprite().addClass(flag);
        }
        else{
            this.flags.push(flag);
        }
    },
    
    unflag: function(flag){
        this.getSprite().removeClass(flag);
    },
    
    setRenderer: function(contextName, renderer){
        this.renderers[contextName] = renderer;
    },

    draw : function(contextName){
        return this.renderers[contextName](this);
    },
    
    refreshSprite: function(){
        $('#' + this.id).css('left', this.x - $('#' + this.id).width()/2);
        $('#' + this.id).css('top', this.y - $('#' + this.id).height()/2);
        $('#' + this.id).rotate({
            angle: this.angle
        });
    },
    
    getPosition : function(){
        return Vector.create([this.x, this.y]);
    }
});