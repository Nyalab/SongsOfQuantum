var Cursor = {

    selectionId: "mouseSelection",
    selectionLoop: false, // to know if we are currently doing a selection
    originalSelectionX: 0,
    originalSelectionY: 0,
    lastKnownX: 0,
    lastKnownY: 0,

    mouseX: 0,
    mouseY: 0,

    init: function(){
      
        $('body').append('<img style="position:absolute;display:none;" id="cursor_move" class="cursor" src="images/cursor/move.png" />');
        $('body').append('<img style="position:absolute;display:none;" id="cursor_attack" class="cursor" src="images/cursor/attack.png" />');
        $('body').append('<img style="position:absolute;display:none;" id="cursor_click_effect" class="cursor" src="images/cursor/click.png" />');
    
        $('body').mousemove(function(e){
            $('#cursor_move').css('left', e.pageX + 9).css('top', e.pageY + 12);
            $('#cursor_attack').css('left', e.pageX + 9).css('top', e.pageY + 12);
        });
    },
  
    clickEffect: function(e){
        $('#cursor_click_effect').css('left', e.pageX - 5).css('top', e.pageY - 5);
        $('#cursor_click_effect').fadeIn(75, function(){
            $(this).fadeOut(200);
        });
    },
  
    setNoCursor: function(){
        $('.cursor').hide();
    },
  
    setMoveCursor: function(){
        $('.cursor').hide();
        $('#cursor_move').show();
    },
  
    setAttackCursor: function(){
        $('.cursor').hide();
        $('#cursor_attack').show();
    },

    beginSelection: function(x, y) {
        this.originalSelectionX = x;
        this.originalSelectionY = y;
        this.lastKnownX = x;
        this.lastKnownY = y;
        $("<div/>", {
            id: this.selectionId,
            style: "position: absolute; top: " + this.originalSelectionY + "px; left: " + this.originalSelectionX + "px; " + this.selectionStyle + " width: 1px; height: 1px;"
        }).appendTo($('#viewport'));
        this.selectionLoop = setInterval(this.loopSelection, 50);
    },

    endSelection: function(){
        var colliders_selector = "#mouseSelection";
        var obstacles_selector = ".ship";
        var hits = $(colliders_selector).collision(obstacles_selector);
        console.log(hits);
        clearInterval(this.selectionLoop);
        $("#" + this.selectionId).remove();
    },

    loopSelection: function() {
        if((Cursor.lastKnownX == Cursor.mouseX) && (Cursor.lastKnownY == Cursor.mouseY))
            return false;

        var Xdiff = Cursor.mouseX - Cursor.originalSelectionX;
        var Ydiff = Cursor.mouseY - Cursor.originalSelectionY;
        
        if(Xdiff > 0)
        {
            $("#" + Cursor.selectionId).css('width', Xdiff + "px");
        }
        else
        {
            $("#" + Cursor.selectionId).css('left', parseInt(Cursor.originalSelectionX) + parseInt(Xdiff));
            $("#" + Cursor.selectionId).css('width', parseInt(Xdiff*-1) + "px");
        }

        if(Ydiff > 0)
        {
            $("#" + Cursor.selectionId).css('height', Ydiff + "px");
        }
        else
        {
            $("#" + Cursor.selectionId).css('top', parseInt(Cursor.originalSelectionY) + parseInt(Ydiff));
            $("#" + Cursor.selectionId).css('height', parseInt(Ydiff*-1) + "px");
        }
        Cursor.lastKnownX = Cursor.mouseX;
        Cursor.lastKnownY = Cursor.mouseY;

        $('document').disableSelection();
    }
};