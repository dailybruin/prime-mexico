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
        $container = $('#container'),
        $diver = $('#diver');

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
            $sub_header_center.css('margin-top', -sub_header_center_height / 2);
        }
    };
    resizeElements();

    window.onresize = function() {
        repositionContainer();
        resizeElements();

        window.onscroll();
    }

    sub_header = document.getElementById('sub-header');

    window.onscroll = function() {
        var scroll_position = $window.scrollTop(),
            client_height = $window.height(),
            scroll_ratio = scroll_position / client_height; // A ratio of how far it has scrolled

        // The main header scrolls up faster:
        $video_overlay.css('top', scroll_position * -1.333);

        // Fade out video and #sub-header at certain thresholds:
        $video.css('opacity', 1.2 - scroll_ratio);
        $sub_header.css('opacity', 2.5 - scroll_ratio);

        // Lock #sub-header into fixed position once it has scrolled into place:
        $sub_header.css(
            'position', (scroll_position >= client_height) ? 'fixed' : 'absolute'
        );
        $sub_header.css('top', -75 * scroll_ratio);

		var main_offset = $('#main').offset().top;
			client_width = $(window).width();
		
		if( parseInt( $('#diver').css('top')) < - 550 ) {
			$('#diver').hide();
			$('.reef').hide();
		}
		else {
			$('#diver').fadeIn();
			$('.reef').show();
		}

		$('#diver').css('margin-left', client_width/60);		
		$('#diver').css('top', (scroll_position-main_offset-400)*1.02 + 'px');
			
		$('.reef').each( function( i, obj) {
			var prevTop = parseInt( $(this).css('top'), 10);
			if( prevTop < -500 )
				$(this).css('top', client_height+500 + 'px');
			else
				$(this).css('top', prevTop-4 + 'px');
		});	
    }

    // Call once to reposition stuff:
    window.onresize();
});
