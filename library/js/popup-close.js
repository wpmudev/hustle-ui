( function( $ ) {

	HUI.popupClose = function( el ) {

		const close = $( el );
		const popup = close.closest( '.hustle-ui' );
		const content = popup.find( '.hustle-popup-content' );

		if ( ! close.is( '.hustle-button-close' ) ) {
			return;
		}

		if ( ! popup.hasClass( 'hustle-popup' ) ) {
			return;
		}

		function removeIntro() {

			const checkIntro = popup.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.removeClass( 'hustle-animate-in--' + animateIn );
			}
		}

		function animationOut() {

			const checkOutro = popup.data( 'outro' );

			let animateOut = 'no_animation';

			if ( '' !== checkOutro ) {
				animateOut = checkOutro;
			}

			if ( 'no_animation' !== animateOut ) {
				content.addClass( 'hustle-animate-out--' + animateOut );
			}
		}

		function init() {

			close.on( 'click', function( e ) {

				const checkOutro = popup.data( 'outro' );

				let delay = 1000;
				let animateOut = 'no_animation';

				if ( '' !== checkOutro ) {
					animateOut = checkOutro;
				}

				if ( 'no_animation' === animateOut ) {
					delay = 0;
				}

				if ( 'fadeOut' === animateOut ) {
					delay = 305;
				}

				if ( 'newspaperOut' === animateOut ) {
					delay = 505;
				}

				if ( 'bounceOut' === animateOut ) {
					delay = 755;
				}

				animationOut();
				removeIntro();

				setTimeout( function() {
					popup.removeClass( 'hustle-show' );
					content.removeClass( 'hustle-animate-out--' + animateOut );
				}, delay );

				e.preventDefault();

			});

		}

		init();

		return this;
	};

	$( 'body' ).ready( function() {

		$( '.hustle-button-close' ).each( function() {

			const close = $( this );

			HUI.popupClose( close );

		});
	});

}( jQuery ) );
