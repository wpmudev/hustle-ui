( function( $ ) {

	HUI.popupLoad = function( el, delay ) {

		const popup = $( el );
		const content = popup.find( '.hustle-popup-content' );
		const moduleTime = delay;
		const layoutTime = delay + 200;

		if ( ! popup.is( '.hustle-popup' ) ) {
			return;
		}

		function animation() {

			const checkIntro = popup.data( 'intro' );
			const checkOutro = popup.data( 'outro' );

			let animateIn = 'no_animation';
			let animateOut = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( '' !== checkOutro ) {
				animateOut = checkOutro;
			}

			if ( 'no_animation' !== animateIn || 'no_animation' !== animateOut ) {
				content.addClass( 'hustle-animate' );
			}

			if ( content.hasClass( 'hustle-animate' ) && 'no_animation' === animateIn ) {
				content.hide();
				content.css({
					opacity: 1
				});
			}
		}

		function animationIn() {

			const checkIntro = popup.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate-in--' + animateIn );
			} else {

				if ( content.hasClass( 'hustle-animate' ) ) {
					content.show();
				}
			}
		}

		function init() {

			popup.hide();
			animation();

			setTimeout( function() {
				popup.show();
			}, moduleTime );

			setTimeout( function() {
				animationIn();
			}, layoutTime );

		}

		init();

		return this;
	};

	$( 'body' ).ready( function() {

		$( '.hustle-popup' ).each( function() {

			const popup = $( this );
			const delay = $( this ).data( 'delay' );

			HUI.popupLoad( popup, delay );

		});

	});

}( jQuery ) );
