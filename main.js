$(document).ready(function() {
    var video = document.getElementById('video-yucatan'),
        video_overlay = document.getElementById('video-overlay'),
        container = document.getElementById('container');

    var $window = $(window),
        $header = $('header'),
        $sub_header = $('#sub-header'),
        $sub_header_center = $('#sub-header-center'),
        $video = $('#video-yucatan'),
        $video_overlay = $('#video-overlay'),
        $container = $('#container');

    var repositionContainer = function() {
        $container.css(
            'top', $window.height()
        );
    };
    repositionContainer();

    var resizeElements = function() {
        var client_height = $window.height(),
            client_width = $window.width();

        if (client_width >= 600) { // Because video disappears under 600px
            $video.width(client_width);
            var additional_width = 0;
            while ($video.height() < client_height) {
                additional_width += 100;
                $video.width(client_width + additional_width);
            }

            $video_overlay.width(client_width);

            $header.height(client_height);
            $sub_header.height(client_height);

            // Vertically center #sub-header-center:
            var sub_header_center_height = $sub_header_center.height();
            $sub_header_center.css('marginTop', -sub_header_center_height / 2);
        }
    };
    resizeElements();

    window.onresize = function() {
        repositionContainer();
        resizeElements();

        // TODO: Investigate if this is necessary
        window.onscroll();
    }

    sub_header = document.getElementById('sub-header');

	var inView = function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

    window.onscroll = function() {
        var scroll_position = $window.scrollTop(),
            client_height = $window.height(),
            scroll_ratio = scroll_position / client_height; // A ratio of how far it has scrolled

        // Fade out video and #sub-header at certain thresholds:
        $('#video-yucatan').css('opacity', 1.2 - scroll_ratio);
        $('#sub-header').css('opacity', 2.8 - scroll_ratio);

        // The main header scrolls up faster:
        $('#video-overlay').css('bottom', scroll_position * 1.333);

        // Lock #sub-header into fixed position once it has scrolled into place:
        $('#sub-header').css(
            'position', (scroll_position >= client_height) ? 'fixed' : 'absolute'
        );

        $sub_header.css(
            'position', (scroll_position >= client_height) ? 'fixed' : 'absolute'
        );
        $sub_header.css('top', -75 * scroll_ratio);

		var mainOffset = $('#main').offset().top;
		var windowWidth = $(window).width();

		if( parseInt( $('#diver').css('top')) < -100 )
			$('#diver').hide();
		else
			$('#diver').fadeIn();

		$('#diver').css('margin-left', (windowWidth)/50);
		$('#diver').css('top', (scroll_position - mainOffset + 100) * 1.04);
    }

    // Call once to reposition stuff:
    window.onresize();
});
