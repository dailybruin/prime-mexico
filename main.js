window.onload = function() {
    var video = document.getElementById('video-yucatan'),
        video_overlay = document.getElementById('video-overlay'),
        container = document.getElementById('container');

    var repositionContainer = function() {
        container.style.top = video.offsetHeight + 'px';
    };
    repositionContainer();

    var resizePanes = function() {
        var client_height = document.body.clientHeight;
        $('.pane').height(client_height);

        // Recenter .pane-centers if necessary:
        var $pane_centers = $('.pane').children('.pane-center');
            height = $pane_centers.height();
        $pane_centers.css('marginTop', -height / 2);
    };
    resizePanes();

    window.onresize = function() {
        repositionContainer();
        resizePanes();
    }

    sub_header = document.getElementById('sub-header');
    window.onscroll = function() {
        var alpha = 1.1 - (window.scrollY / video.offsetHeight); // A ratio of how far it has scrolled
        video.style.opacity = alpha;

        video_overlay.style.bottom = window.scrollY * 1.5;

        if (window.scrollY >= video.offsetHeight) {
            sub_header.style.position = 'fixed';
        }
        else {
            sub_header.style.position = 'absolute';
        }
    }
    // Call once to reposition stuff:
    window.onscroll();
}
