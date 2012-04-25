var Cursor = {
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
    }
};