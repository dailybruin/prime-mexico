window.onload = function() {
    var video = document.getElementById('video-yucatan'),
        container = document.getElementById('container');

    var repositionContainer = function() {
        container.style.top = video.offsetHeight + 'px';
    };
    repositionContainer();

    window.onresize = function() {
        repositionContainer();
    }

    var video_overlay = document.getElementById('video-overlay');
    window.onscroll = function() {
        var alpha = window.scrollY / video.offsetHeight; // A ratio of how far it has scrolled
        video_overlay.style.opacity = alpha;
    }
}
