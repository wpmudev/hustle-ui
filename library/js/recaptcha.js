( function() {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.maybeRenderRecaptcha = function( $module, self ) {

		const { renderId, id: moduleId } = $module.data(),
		$recaptchaContainer = $module.find( '#hustle-modal-recaptcha-' + moduleId + '-' + renderId );

		// If there's no recaptcha field, nothing to do here.
		if ( ! $recaptchaContainer.length ) {
			return;
		}

		// The data for rendering the recaptcha is in the container.
		const { sitekey, version, theme, size, badge } = $recaptchaContainer.data();

		// Use a wrapper to be removed and added again on re-render. Required for preview in admin's settings page.
		let $wrapper = $recaptchaContainer.find( '.hustle-recaptcha-badge' );

		if ( $wrapper.length ) {
			const captchaId = $recaptchaContainer.attr( 'recaptcha-id' );

			$wrapper.remove();
			grecaptcha.reset( captchaId );
		}
		$recaptchaContainer.append( '<div class="hustle-recaptcha-badge"></div>' );
		$wrapper = $recaptchaContainer.find( '.hustle-recaptcha-badge' );

		const data = {
			sitekey,
			theme,
			size,
			badge,
			'expired-callback': () => grecaptcha.reset( $recaptchaContainer.attr( 'recaptcha-id' ) )
		};

		if ( 'v2_checkbox' === version ) {
			$module.find( '.hustle-modal-body button' ).prop( 'disabled', true );

			data.callback = function( token ) {
				$module.find( 'input[name="recaptcha-response"]' ).val( token );
				$module.find( '.hustle-layout-body button' ).removeProp( 'disabled' );
			};

		} else {
			data.callback = function( token ) {
				$module.find( 'input[name="recaptcha-response"]' ).val( token );

				// Callback for when recaptcha has been executed. Triggers the form submission on frontend.
				if ( self ) {
					self.doSubmit( $recaptchaContainer.closest( '.hustle-layout-form' ) );
				}
			};
		}

		if ( 'undefined' !== typeof grecaptcha ) {

			// Do render the recaptcha. Keep the recaptcha's ID in the container for later use.
			grecaptcha.ready( function() {
				const recaptchaId = grecaptcha.render( $wrapper[0], data );
				$recaptchaContainer.attr( 'recaptcha-id', recaptchaId );
			});
		}

	};

}() );
