window.onload = function() {
    var video = document.getElementById('video-yucatan'),
        video_overlay = document.getElementById('video-overlay'),
        container = document.getElementById('container');

    var repositionContainer = function() {
        container.style.top = video.offsetHeight + 'px';
    };
    repositionContainer();

    window.onresize = function() {
        repositionContainer();
    }

    window.onscroll = function() {
        var alpha = 1 - (window.scrollY / video.offsetHeight); // A ratio of how far it has scrolled
        video.style.opacity = alpha;

        video_overlay.style.bottom = window.scrollY;
    }
}
