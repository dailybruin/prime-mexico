// TODO: redo all this with jQuery (no, seriously, please clean this garbage up)

window.onload = function() {
    var video = document.getElementById('video-yucatan'),
        video_overlay = document.getElementById('video-overlay'),
        container = document.getElementById('container');

    var repositionContainer = function() {
        if ($('video').css('display') !== 'none') {
            container.style.top = video.offsetHeight;
        }
    };
    repositionContainer();

    var resizeElements = function() {
        var client_height = document.body.clientHeight,
            client_width = document.body.clientWidth;

        if (client_width >= 600) { // Because video disappears under 600px
            $('.pane').height(client_height);

            // Recenter .pane-centers if necessary:
            var $pane_centers = $('.pane').children('.pane-center');
                height = $pane_centers.height();
            $pane_centers.css('marginTop', -height / 2);

            video.style.width = client_width;
            var additional_width = 0;
            while (video.offsetHeight < client_height) {
                additional_width += 100;
                video.style.width = client_width + additional_width;
            }

            $('header').height(client_height);
        }

        video_overlay.style.width = client_width;
    };
    resizeElements();

    window.onresize = function() {
        repositionContainer();
        resizeElements();
    }

    sub_header = document.getElementById('sub-header');
    window.onscroll = function() {
        var alpha = 1.2 - (window.scrollY / video.offsetHeight); // A ratio of how far it has scrolled
        video.style.opacity = alpha;

        if ($(window).width() >= 600) {
            video_overlay.style.bottom = window.scrollY * 1.333;

            if (window.scrollY >= $('header').height()) {
                sub_header.style.position = 'fixed';

                alpha = 2.8 - (window.scrollY / $(window).height());
                $('#sub-header').css('opacity', alpha);
            }
            else {
                sub_header.style.position = 'absolute';
            }
        }
    }

    // Call once to reposition stuff:
    window.onscroll();
    window.onresize();
}
