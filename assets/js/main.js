$(function() {

    var $window = $(window);
    
    // Which elements to animate
    var animatedElements = $('.animate');
    
    animateElements();

    window.onscroll = function (e) {
        animateElements();
    };

    function animateElements() {
        if (animatedElements.length) {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_mid = window_top_position + $window.height() / 2;
            var window_bottom_position = (window_top_position + window_height);
            var window_top_offset = 0; //window_height * 0.25;
            var window_bottom_offset = window_height * 0.05;

            var i = 1;
            $.each(animatedElements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);
                
                if ((element_bottom_position >= window_top_position + window_top_offset) && (element_top_position <= window_bottom_position - window_bottom_offset)) {
                    $element.addClass('animate--in-view animate--animated');
                } else {
                    $element.removeClass('animate--in-view');
                }
                i++;
            });
        }
    }

});
