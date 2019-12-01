$(document).ready( function(){


    $(window).resize(function(){
        if(window.innerHeight < window.innerWidth){
            location.reload();
        }else{
            location.reload();
        }
    })

    // Orientation landscape
    if(window.innerHeight < window.innerWidth){
        $('#game-one').click(function(){
            $('#match-two').css({
                'display': 'none'
            });
            $('#match-one').css({
                'display': 'block'
            });
        });
        $('#game-two').click(function(){
            $('#match-one').css({
                'display': 'none'
            });
            $('#match-two').css({
                'display': 'block'
            })
        });
    }else{

    //Orientation Portrait

    $('#game-one').click(function(){
        $('.game-details').slideUp(1, function(){
            $('.fa-filter').css({
                'display': 'none'
            });
            $('.fa-arrow-left').css({
                'display': 'block'
            })
            $('#match-one').slideDown();
        });
    });
    
    $('#game-two').click(function(){
        $('.game-details').slideUp(1, function(){
            $('.fa-filter').css({
                'display': 'none'
            });
            $('.fa-arrow-left').css({
                'display': 'block'
            });
            $('#match-two').slideDown();
        });
    });
    
    $('.fa-arrow-left').click(function(){
        $('.game-detail').hide(1, function(){
            $('.fa-arrow-left').css({
                'display': 'none'
            });
            $('.fa-filter').css({
                'display': 'block'
            });
            $('.game-details').slideDown();
        })
    });
    }
});