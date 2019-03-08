$(function () {
    var $window = $(window);

    // Window scroll data
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_mid = window_top_position + $window.height() / 2;
    var window_bottom_position = (window_top_position + window_height);

    // Which elements to animate
    var animatedElements = $('.animate');

    // Photo gallery camera shutter audio on/off
    var photoCameraShutterAudio = true;

    // Checking if camera shutter sound is set by cookie
    // var photoCameraShutterAudioCookie = getCookie('camera-shutter-sound');
    // if (photoCameraShutterAudioCookie) {
    //     if (photoCameraShutterAudioCookie == 'on') {
    //         $('#shutter-sound-toggle-wrapper .switch').addClass('checked');
    //         $('#shutter-sound-toggle').attr('checked', true);
    //         photoCameraShutterAudio = true;
    //     }
    // }

    // Back button
    $('.back-button').on('click', function (event) {
        event.preventDefault();
        history.back(-1);
    });

    // Showing photo data
    $('.photo__data-trigger').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (event.altKey || event.shiftKey) {
            // Showing info of all photos
            $.each($('.photo'), function (key, value) {
                $(this).addClass('info');
            });
        } else {
            // Showing just the selected photo info
            $(this).closest('.photo').addClass('info');
        }
    });

    // When clicking photo data area it closes
    $('.photo__data').on('click', function () {
        if (event.altKey || event.shiftKey) {
            // Hiding info of all photos
            $.each($('.photo'), function (key, value) {
                $(this).removeClass('info');
            });
        } else {
            // Hiding just the selected photo info
            $(this).closest('.photo').removeClass('info');
        }
    });

    // Toggle the camera shutter sound
    // $('.switch').change(function () {
    //     $(this).toggleClass('checked');
    //     toggleCameraShutterSound($('#shutter-sound-toggle').is(':checked'));
    // });

    // Toggles the mobile menu
    $('.navigation-button').on('click', function () {
        $(this).toggleClass('active');
        $('.mobile-navigation').slideToggle('fast');
    });

    if (animatedElements.length) {
        animateElements(window_height, window_top_position, window_mid, window_bottom_position);
    }

    window.onscroll = function (e) {
        updateScrollData();

        if (animatedElements.length) {
            animateElements(window_height, window_top_position, window_mid, window_bottom_position);
        }
    };

    var lb_defaults = {
        // Enable infinite gallery navigation
        loop: false,

        // Should display counter at the top left corner
        infobar: true,

        // Should display close button (using `btnTpl.smallBtn` template) over the content
        // Can be true, false, "auto"
        // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
        // smallBtn: "true",

        // Should display toolbar (buttons at the top)
        // Can be true, false, "auto"
        // If "auto" - will be automatically hidden if "smallBtn" is enabled
        toolbar: "auto",

        // Horizontal space between slides
        gutter: 50,

        // Disable right-click and use simple image protection for images
        protect: false,

        // Should display navigation arrows at the screen edges
        arrows: true,

        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons: [
            "zoom",
            // "share",
            "slideShow",
            "fullScreen",
            // "download",
            // "thumbs",
            "close"
        ],

        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect: "fade",

        // Duration in ms for open/close animation
        animationDuration: 500,

        zoomOpacity: "auto",

        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect: "fade",

        // Duration in ms for transition animation
        transitionDuration: 500,

        slideShow: {
            autoStart: false,
            speed: 5000
        },

        // After image has loaded
        afterLoad: function (instance, current) {
            var pixelRatio = window.devicePixelRatio || 1;

            if (pixelRatio > 1.5) {
                current.width = current.width / (pixelRatio / 1.2);
                current.height = current.height / (pixelRatio / 1.2);
            }
        },

        // After image has loaded and animated
        afterShow: function () {
            // Camera shutter audio
            if (photoCameraShutterAudio) {
                playAudio('audio-camera-shutter');
            }
        },

        lang: "sv",
        i18n: {
            en: {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                PLAY_START: "Start slideshow",
                PLAY_STOP: "Pause slideshow",
                FULL_SCREEN: "Full screen",
                THUMBS: "Thumbnails",
                DOWNLOAD: "Download",
                SHARE: "Share",
                ZOOM: "Zoom"
            },
            sv: {
                CLOSE: "Stäng",
                NEXT: "Nästa",
                PREV: "Föregående",
                ERROR: "Innehållet kunde inte laddas. <br/> Försök igen senare.",
                PLAY_START: "Starta bildspel",
                PLAY_STOP: "Pausa bildspel",
                FULL_SCREEN: "Fullskärm",
                THUMBS: "Tumnaglar",
                DOWNLOAD: "Ladda ner",
                SHARE: "Dela",
                ZOOM: "Zooma"
            },
        }
    };

    // Initializing fancybox
    $('[data-fancybox').fancybox(lb_defaults);

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

    function playAudio(audioID) {
        var audio = document.getElementById(audioID);
        audio.play();
    }

    // function toggleCameraShutterSound(enabled) {
    //     if (enabled) {
    //         // Enables the shutter sound
    //         setCookie('camera-shutter-sound', 'on', 365);
    //         photoCameraShutterAudio = true;
    //     } else {
    //         // Disabling the shutter sound
    //         setCookie('camera-shutter-sound', 'off', 365);
    //         photoCameraShutterAudio = false;
    //     }
    // }

    function setCookie(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    function eraseCookie(name) {
        setCookie(name, '', -1);
    }

});
