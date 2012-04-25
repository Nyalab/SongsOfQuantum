var Drawable = Class.extend({
    __construct: function(id, angle, x, y, image){
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.image = image;
        this.flags = [];
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
    
    draw : function(view){
        
        var className = "";
        while(this.flags.length > 0){
            className += this.flags.pop() + " ";
        }
        
        var img = $('<img />')
            .attr('id', this.id)
            .attr('src', this.image)
            .addClass(className)
            .css('position', 'absolute')
            .css('left', this.x + 'px')
            .css('top', this.y + 'px')
            .load(function(){
                $(this).data('drawable').refreshSprite();
            });
        
        $(view).append(img);
        $('#' + this.id).data('drawable', this);
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