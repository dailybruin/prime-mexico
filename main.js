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
}
