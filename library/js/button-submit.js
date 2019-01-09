( function( $ ) {

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof HUI ) {
		window.HUI = {};
	}

	HUI.buttonSubmit = function( el, delay ) {

		const button = $( el );
		const module = button.closest( '.hustle-ui' );
		const optin = module.find( '.hustle-optin' );
		const success = optin.find( '.hustle-success' );
		const layout = optin.find( '.hustle-layout' );
		const form = layout.find( '.hustle-layout-form' );
		const error = form.find( '.hustle-error-message' );

		if ( ! optin.is( '.hustle-optin' ) ) {
			return;
		}

		function resetOnLoad() {
			success.hide();
			error.hide();
		}

		function resetOnClick() {

			const input = form.find( '.hustle-field' );
			const checkbox = form.find( '.hustle-checkbox' );

			input.removeClass( 'hustle-field-error' );
			checkbox.removeClass( 'hustle-field-error' );
			error.hide();

		}

		function animateButton() {
			button.addClass( 'hustle-button-onload' );
		}

		function staticButton() {
			button.removeClass( 'hustle-button-onload' );
		}

		function checkGdpr() {

			const label = form.find( '.hustle-gdpr' );
			const input = label.find( 'input' );

			if ( input.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
			}
		}

		function checkRequired() {

			const input = form.find( '.hustle-input' );
			const label = input.parent();

			label.each( function() {

				const field = $( this );

				if ( field.hasClass( 'hustle-field-required' ) ) {

					if ( '' === field.find( 'input' ).val() ) {
						field.addClass( 'hustle-field-error' );
					} else {
						field.removeClass( 'hustle-field-error' );
					}
				}
			});

		}

		function errorMessage() {
			error.show();
		}

		function successMessage() {

			layout.slideUp( delay );

			setTimeout( function() {
				success.slideDown();
			}, delay );
		}

		function init() {

			resetOnLoad();

			button.on( 'click', function( e ) {

				resetOnClick();
				animateButton();

				setTimeout( function() {

					checkGdpr();
					checkRequired();

					if ( form.find( '.hustle-field-error' ).length ) {
						errorMessage();
					} else {
						successMessage();
					}

					staticButton();

				}, delay );

				e.preventDefault();
				e.stopPropagation();

			});
		}

		init();

		return this;
	};

	$( '.hustle-button-submit' ).each( function() {

		const button = $( this );
		const delay = 1000;

		HUI.buttonSubmit( button, delay );

	});

}( jQuery ) );
