( function( $ ) {

	function randomSettings( items ) {
		return items[ Math.floor( Math.random() * items.length ) ];
	};

	function renderOptinPopup() {

		// Templates
		const renderPopup = $( 'script[data-template="popup-container"]' ).text().split( /\$\{(.+?)\}/g );
		const renderOptin = $( 'script[data-template="optin-content"]' ).text().split( /\$\{(.+?)\}/g );

		$( 'body' ).append( renderPopup );

		$( '.hustle-popup' ).each( function() {

			const popup = $( this );

			if ( ! popup.hasClass( 'showcase-informational-popup' ) ) {
				popup.addClass( 'showcase-optin-popup' );
				popup.find( '.hustle-popup-content' ).append( renderOptin );
			}
		});
	};

	function openOptinPopup() {

		const button = $( '#showcase-show-optin-popup' );
		const getModule = $( '.showcase-optin-popup' );

		// Module settings
		let moduleId = 0;
		const moduleAnimationIn = [
			'no_animation',
			'bounceIn',
			'bounceInUp',
			'bounceInDown',
			'bounceInLeft',
			'bounceInRight',
			'fadeIn',
			'fadeInUp',
			'fadeInDown',
			'fadeInLeft',
			'fadeInRight',
			'fadeInUpBig',
			'fadeInDownBig',
			'fadeInLeftBig',
			'fadeInRightBig',
			'lightSpeedIn',
			'newspaperIn',
			'rollIn',
			'rotateIn',
			'rotateInUpLeft',
			'rotateInUpRight',
			'rotateInDownLeft',
			'rotateInDownRight',
			'slideInUp',
			'slideInDown',
			'slideInLeft',
			'slideInRight',
			'zoomIn',
			'zoomInUp',
			'zoomInDown',
			'zoomInLeft',
			'zoomInRight'
		];
		const moduleAnimationOut = [
			'no_animation',
			'bounceOut',
			'bounceOutUp',
			'bounceOutDown',
			'bounceOutLeft',
			'bounceOutRight',
			'fadeOut',
			'fadeOutUp',
			'fadeOutDown',
			'fadeOutLeft',
			'fadeOutRight',
			'fadeOutUpBig',
			'fadeOutDownBig',
			'fadeOutLeftBig',
			'fadeOutRightBig',
			'lightSpeedOut',
			'newspaperOut',
			'rollOut',
			'rotateOut',
			'rotateOutUpLeft',
			'rotateOutUpRight',
			'rotateOutDownLeft',
			'rotateOutDownRight',
			'slideOutUp',
			'slideOutDown',
			'slideOutLeft',
			'slideOutRight',
			'zoomOut',
			'zoomOutUp',
			'zoomOutDown',
			'zoomOutLeft',
			'zoomOutRight'
		];
		const modulePalette = [
			'gray-slate',
			'coffee',
			'ectoplasm',
			'blue',
			'sunrise',
			'midnight'
		];
		const moduleCloseOverlay = 1;

		button.on( 'click', function() {

			moduleId = Math.floor( ( Math.random() * 100 ) + 1 );

			if ( getModule.length ) {

				/**
				 * Assign new settings to sample module
				 */

				// Unique ID
				getModule.attr( 'data-id', moduleId );
				getModule.addClass( 'hustle-module-' + moduleId );

				// Intro animation
				getModule.attr( 'data-intro', randomSettings( moduleAnimationIn ) );

				// Exit animation
				getModule.attr( 'data-outro', randomSettings( moduleAnimationOut ) );

				// Module palette
				getModule.addClass( 'hustle-palette--' + randomSettings( modulePalette ) );

				// Overlay mask behaviour
				getModule.attr( 'data-overlay-close', moduleCloseOverlay );
				getModule.find( '.hustle-popup-mask' ).addClass( 'hustle-optin-mask' );

				$( '.hustle-popup.hustle-module-' + moduleId ).each( function() {

					const popup = $( this );
					const delay = $( this ).data( 'delay' );

					HUI.popupLoad( popup, delay );

				});
			}
		});
	}

	function resetOptinPopup() {

		const getModule = $( '.showcase-optin-popup' );

		const moduleId = 0;
		const moduleAnimationIn = 'no_animation';
		const moduleAnimationOut = 'no_animation';
		const moduleCloseOverlay = 0;

		/**
		 * Reset sample module settings
		 */

		// Unique ID
		getModule.attr( 'data-id', moduleId );
		getModule.removeClass ( function( index, className ) {
			return ( className.match ( /(^|\s)hustle-module-\S+/g ) || []).join( ' ' );
		});

		// Intro animation
		getModule.attr( 'data-intro', randomSettings( moduleAnimationIn ) );

		// Exit animation
		getModule.attr( 'data-outro', randomSettings( moduleAnimationOut ) );

		// Overlay mask behaviour
		getModule.attr( 'data-overlay-close', moduleCloseOverlay );
		getModule.find( '.hustle-popup-mask' ).addClass( 'hustle-optin-mask' );

		// Module palette
		getModule.removeClass ( function( index, className ) {
			return ( className.match ( /(^|\s)hustle-palette-\S+/g ) || []).join( ' ' );
		});
	}

	function closeOptinPopup() {

		$( '.hustle-button-close' ).each( function() {

			const close = $( this );

			HUI.popupClose( close );

			close.on( 'click', function() {

				const popup = $( this ).closest( '.hustle-popup' );
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

				setTimeout( function() {
					resetOptinPopup();
				}, delay );
			});

		});

	};

	$( window ).on( 'load', function() {

		renderOptinPopup();
		openOptinPopup();
		closeOptinPopup();

	});

}( jQuery ) );
