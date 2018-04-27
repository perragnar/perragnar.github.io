var $window = $(window);

// Window scroll data
var window_height = $window.height();
var window_top_position = $window.scrollTop();
var window_mid = window_top_position + $window.height() / 2;
var window_bottom_position = (window_top_position + window_height);

// Which elements to animate
var animatedElements = $('.animate');
var galleryPhotos = $('.photo-gallery .photo');

animateElements(window_height, window_top_position, window_mid, window_bottom_position);

window.onscroll = function (e) {
    updateScrollData();

    if(animatedElements.length) {
        animateElements(window_height, window_top_position, window_mid, window_bottom_position);
    }
};

$('.photo__data-trigger').on('click', function() {
    $(this).closest('.photo').addClass('info');
});

$('.photo__data').on('click', function() {
    $(this).closest('.photo').removeClass('info');
});

function updateScrollData() {
    window_height = $window.height();
    window_top_position = $window.scrollTop();
    window_mid = window_top_position + $window.height() / 2;
    window_bottom_position = (window_top_position + window_height);
}

function animateElements(window_height, window_top_position, window_mid, window_bottom_position) {
    if (animatedElements.length) {
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
