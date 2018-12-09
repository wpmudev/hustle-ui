( function( $ ) {

	// Enable strict mode
	'use strict';

	// TEST: Success Message
	function successMessage() {

		$( 'body' ).on( 'click', '.submit-button', function() {

			const $button = $( this );
			const $body   = $button.closest( '.hustle-optin-body' );
			const $layout = $body.find( '.hustle-layout' );
			const $message = $body.find( '.hustle-success' );

			$layout.slideUp( 'slow' );

			setTimeout( () => {
				$message.slideDown( 'slow' );
			}, 800 );

		});
	}

	$( 'body' ).ready( function() {
		successMessage();
	});

}( jQuery ) );
