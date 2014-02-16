// TODO: redo all this with jQuery

window.onload = function() {
    var video = document.getElementById('video-yucatan'),
        video_overlay = document.getElementById('video-overlay'),
        container = document.getElementById('container');

    var ratio = 1280 / 720; // video size

    var repositionContainer = function() {
        container.style.top = video.offsetHeight;
    };
    repositionContainer();

    var resizeElements = function() {
        var client_height = document.body.clientHeight,
            client_width = document.body.clientWidth;

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

        video_overlay.style.bottom = window.scrollY * 1.333;

        if (window.scrollY >= $('header').height()) {
            sub_header.style.position = 'fixed';
        }
        else {
            sub_header.style.position = 'absolute';
        }
    }

    // Call once to reposition stuff:
    window.onscroll();
    window.onresize();
}
