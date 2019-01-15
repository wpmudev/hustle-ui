( function( $ ) {

	function randomSettings( items ) {
		return items[ Math.floor( Math.random() * items.length ) ];
	};

	function renderOptinPopup() {

		const container = $( '#showcase-popup-optin' );

		// Templates
		const renderPopup = 'templates/popup-container.html';
		const renderOptin = [
			'templates/opt-in/default.html',
			'templates/opt-in/compact.html',
			'templates/opt-in/focus-optin.html',
			'templates/opt-in/focus-content.html'
		];

		container.load( renderPopup, function() {

			// Render opt-in
			$( '.hustle-popup-mask' ).addClass( 'hustle-optin-mask' );
			$( '.hustle-popup-content' ).load( randomSettings( renderOptin ), function() {
				closeOptinPopup();
			});

			openOptinPopup();

		});
	};

	function openOptinPopup() {

		const button = $( '#showcase-show-optin-popup' );
		const sample = $( '#showcase-popup-optin' );
		const getModule = sample.find( '.hustle-popup' );

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

				$( '.hustle-popup.hustle-module-' + moduleId ).each( function() {

					const popup = $( this );
					const delay = $( this ).data( 'delay' );

					HUI.popupLoad( popup, delay );

				});
			}
		});
	}

	function resetOptinPopup() {

		const getModule = $( '#showcase-popup-optin' ).find( '.hustle-popup' );

		const moduleId = 0;
		const moduleAnimationIn = 'no_animation';
		const moduleAnimationOut = 'no_animation';

		/**
		 * Reset sample module settings
		 */

		// Unique ID
		getModule.attr( 'data-id', moduleId );
		getModule.removeClass ( function( index, className ) {
			return ( className.match ( /(^|\s)hustle-module-\S+/g ) || []).join( ' ' );
		});

		// Intro animation
		getModule.attr( 'data-intro', moduleAnimationIn );

		// Exit animation
		getModule.attr( 'data-outro', moduleAnimationOut );

		// Module palette
		getModule.removeClass ( function( index, className ) {
			return ( className.match ( /(^|\s)hustle-palette-\S+/g ) || []).join( ' ' );
		});
	}

	function closeOptinPopup() {

		$( '.hustle-button-close' ).each( function() {

			const close = $( this );
			const mask = close.find( '.hustle-popup-mask' );

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

			mask.on( 'click', function() {

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
	});

}( jQuery ) );
