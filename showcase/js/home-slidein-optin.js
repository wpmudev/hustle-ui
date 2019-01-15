( function( $ ) {

	function randomSettings( items ) {
		return items[ Math.floor( Math.random() * items.length ) ];
	};

	function disableButton( element ) {
		element.prop( 'disabled', true );
	}

	function enableButton( element ) {
		element.prop( 'disabled', false );
	}

	function getSlideinSettings( element, moduleId ) {

		const slidein = element;

		// Module settings
		const position = [
			'n',
			's',
			'e',
			'w',
			'ne',
			'nw',
			'se',
			'sw'
		];
		const modulePalette = [
			'gray-slate',
			'coffee',
			'ectoplasm',
			'blue',
			'sunrise',
			'midnight'
		];

		/**
		 * Assign new settings to sample module
		 */

		// Unique ID
		slidein.attr( 'data-id', moduleId );
		slidein.addClass( 'hustle-module-' + moduleId );

		// Position
		slidein.attr( 'data-position', randomSettings( position ) );

		// Module palette
		slidein.addClass( 'hustle-palette--' + randomSettings( modulePalette ) );

	}

	function renderSlidein( moduleId ) {

		const container = $( '#showcase-slidein-optin' );

		// Templates
		const renderSlidein = 'templates/slidein-container.html';
		const renderOptin = [
			'templates/opt-in/default.html',
			'templates/opt-in/compact.html',
			'templates/opt-in/focus-optin.html',
			'templates/opt-in/focus-content.html'
		];

		if ( ! $.trim( container.html() ).length ) {

			container.load( renderSlidein, function() {

				const slideinWrapper = $( this );
				const slideinContainer = slideinWrapper.find( '.hustle-slidein' );
				const slideinContent = slideinContainer.find( '.hustle-slidein-content' );

				// Get slide-in settings
				getSlideinSettings( slideinContainer, moduleId );

				// Render opt-in
				slideinContent.load( randomSettings( renderOptin ), function() {

					$( '.hustle-button-close' ).each( function() {

						const close = $( this );

						HUI.slideinClose( close );

					});

					$( '.hustle-button-submit' ).each( function() {

						const button = $( this );
						const delay = 1000;

						HUI.buttonSubmit( button, delay );

					});
				});

				// Open slide-in
				HUI.slideinLoad( slideinContainer, 0 );

			});
		}
	}

	$( window ).on( 'load', function() {

		let moduleId = 0;

		const btnOpen = $( '#showcase-show-optin-slidein' );
		const btnClose = $( '.hustle-button-close' );
		const container = $( '#showcase-slidein-optin' );

		btnOpen.on( 'click', function() {

			moduleId = Math.floor( ( Math.random() * 100 ) + 1 );

			renderSlidein( moduleId );
			disableButton( $( this ) );

		});

		container.on( 'click', btnClose, function( e ) {

			enableButton( btnOpen );

            setTimeout( function() {
				container.empty();
            }, 1000 );
		});
	});

}( jQuery ) );
