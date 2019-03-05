( function( $ ) {

	'use strict';

	// Define global DEMO object if it doesn't exist.
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.openRandomOptin = function( moduleType, moduleMode ) {

		const button = $( '#show-sample-' + moduleType + '-' + moduleMode );
		const showcase = $( '#sample-' + moduleType + '-' + moduleMode );

		function getRandom( items ) {
			return items[ Math.floor( Math.random() * items.length ) ];
		}

		function popupSettings( element, moduleId ) {

			const popup = element;

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

			/**
			 * Assign new settings to sample module
			 */

			// Unique ID
			popup.attr( 'data-id', moduleId );
			popup.addClass( 'hustle-module-' + moduleId );

			// Intro animation
			popup.attr( 'data-intro', getRandom( moduleAnimationIn ) );

			// Exit animation
			popup.attr( 'data-outro', getRandom( moduleAnimationOut ) );

			// Module palette
			popup.attr( 'data-calendar-palette', getRandom( modulePalette ) );
			popup.addClass( 'hustle-palette--' + popup.data( 'calendar-palette' ) );

			// Module mask
			popup.find( '.hustle-popup-mask' ).addClass( 'hustle-' + moduleMode + '-mask' );

		}

		function slideinSettings( element, moduleId ) {

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
			slidein.attr( 'data-position', getRandom( position ) );

			// Module palette
			slidein.addClass( 'hustle-palette--' + getRandom( modulePalette ) );

		}

		function inlineSettings( element, moduleId, moduleMode ) {

			const inline = element;

			// Module palettes
			const modulePalette = [
				'gray-slate',
				'coffee',
				'ectoplasm',
				'blue',
				'sunrise',
				'midnight'
			];

			// Module alignment
			const moduleAlignment = [
				'left',
				'center',
				'right'
			];

			/**
			 * Assign new settings to sample module
			 */

			// Unique ID
			inline.attr( 'data-id', moduleId );
			inline.addClass( 'hustle-module-' + moduleId );

			if ( 'social' === moduleMode ) {

				// Module alignment
				inline.attr( 'data-alignment', getRandom( moduleAlignment ) );
			} else {

				// Module palette
				inline.addClass( 'hustle-palette--' + getRandom( modulePalette ) );
			}

		}

		function floatSettings( element ) {

			const float = element;

			const posHorizontal = [
				'left',
				'right',
				'center'
			];

			const posVertical = [
				'top',
				'bottom'
			];

			const desktopHorizontal = getRandom( posHorizontal );
			const desktopVertical = getRandom( posVertical );

			const mobilesHorizontal = getRandom( posHorizontal );
			const mobilesVertical = getRandom( posVertical );

			/**
			 * Assign new settings to sample module
			 */

			// Desktop position
			float.attr( 'data-position-horizontal-desktop', desktopHorizontal );
			float.attr( 'data-position-vertical-desktop', desktopVertical );

			// Mobiles position
			float.attr( 'data-position-horizontal-mobiles', mobilesHorizontal );
			float.attr( 'data-position-vertical-mobiles', mobilesVertical );
		}

		function floatGrid( element ) {

			const breakpoint = 783;

			const container = element; // .hustle-social
			const list = container.find( 'ul' );
			const parent = container.closest( '.hustle-ui' );

			const dataGridDesktop = 'data-grid-desktop';
			const dataGridMobiles = 'data-grid-mobiles';

			if ( 'float' === moduleType ) {

				if ( parent.width() < breakpoint ) {

					if ( 'center' === parent.attr( 'data-position-horizontal-mobiles' ) ) {
						container.attr( dataGridMobiles, 'inline' );
					} else {
						container.attr( dataGridMobiles, 'stacked' );
					}
				} else {

					if ( 'center' === parent.attr( 'data-position-horizontal-desktop' ) ) {
						container.attr( dataGridDesktop, 'inline' );
					} else {
						container.attr( dataGridDesktop, 'stacked' );
					}
				}
			}
		}

		function socialSettings( element, moduleType ) {

			const container = element;
			const list = container.find( 'ul' );
			const parent = container.closest( '.hustle-float' );

			const dataGridDesktop = 'data-grid-desktop';
			const dataGridMobiles = 'data-grid-mobiles';

			const counter = [
				'none',
				'stacked',
				'inline'
			];

			function resetCounter() {

				$.each( counter, function( i, item ) {
					list.removeClass( 'hustle-counter--' + item );
				});
			}

			if ( 'inline' === moduleType ) {

				// Module grid
				container.attr( dataGridDesktop, 'inline' );
				container.attr( dataGridMobiles, 'inline' );

			}

			// Module icons style
			resetCounter();
			list.addClass( 'hustle-counter--' + getRandom( counter ) );
		}

		function closesModule( element ) {

			element.find( '.hustle-button-close' ).each( function() {

				const close = $( this );
				const popup = $( this ).closest( '.hustle-popup' );
				const module = $( this ).closest( '.hustle-ui' );
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

				if ( 'popup' === moduleType ) {
					HUI.popupClose( module );
				}

				if ( 'slidein' === moduleType ) {
					HUI.slideinClose( module );
				}

				close.on( 'click', function() {

					setTimeout( function() {
						$( '#sample-' + moduleType + '-' + moduleMode ).empty();
						$( '#show-sample-' + moduleType + '-' + moduleMode ).prop( 'disabled', false );
					}, delay );
				});

				close.closest( '.hustle-ui' ).find( '.hustle-popup-mask' ).on( 'click', function() {

					setTimeout( function() {
						$( '#sample-' + moduleType + '-' + moduleMode ).empty();
						$( '#show-sample-' + moduleType + '-' + moduleMode ).prop( 'disabled', false );
					}, delay );
				});
			});
		}

		function render( moduleId ) {

			const renderModuleType = 'templates/' + moduleType + '-container.html';
			let renderModuleMode = '';

			if ( 'optin' === moduleMode ) {

				renderModuleMode = [
					'templates/opt-in/default.html',
					'templates/opt-in/compact.html',
					'templates/opt-in/focus-optin.html',
					'templates/opt-in/focus-content.html'
				];
			}

			if ( 'info' === moduleMode ) {

				renderModuleMode = [
					'templates/informational/default.html',
					'templates/informational/compact.html',
					'templates/informational/stacked.html'
				];
			}

			if ( 'social' === moduleMode ) {

				renderModuleMode = [
					'templates/social/default.html',
					'templates/social/outlined.html',
					'templates/social/rounded.html',
					'templates/social/squared.html'
				];
			}

			showcase.load( renderModuleType, function() {

				const container = $( this ).find( '.hustle-' + moduleType );
				const content = container.find( '.hustle-' + moduleType + '-content' );

				if ( 'popup' === moduleType ) {
					popupSettings( container, moduleId );
				}

				if ( 'slidein' === moduleType ) {
					slideinSettings( container, moduleId );
				}

				if ( 'inline' === moduleType ) {
					inlineSettings( container, moduleId, moduleMode );
				}

				if ( 'float' === moduleType ) {
					floatSettings( container );
				}

				content.load( getRandom( renderModuleMode ), function() {

					if ( 'optin' === moduleMode ) {

						HUI.inputFilled();
						HUI.inputRequired();
						HUI.checkboxGdpr();
						HUI.select2();
						HUI.timepicker( '.hustle-time' );
						HUI.datepicker( '.hustle-date' );

						const module = $( this ).closest( '.hustle-ui' ),
							cta = module.find( '.hustle-button-cta' );

						HUI.nonSharingSimulation( module );

						// The simulation prevents the CTA from working,
						// so adding the functionality here instead.
						cta.on( 'click', function( e ) {
							const url = cta.attr( 'href' ),
								target = cta.attr( 'target' );

							window.open( url, target );
						});
					}

					const social = $( this ).find( '.hustle-social' );

					if ( 'social' === moduleMode ) {

						socialSettings( social, moduleType );
						floatGrid( social, moduleType );

						setTimeout( function() {
							HUI.floatResize( social );
						}, 200 );

						$( window ).on( 'resize', function() {
							floatGrid( social, moduleType );
							HUI.floatResize( social );
						});
					}

					closesModule( $( this ) );

				});

				if ( 'popup' === moduleType ) {
					HUI.popupLoad( container );
				}

				if ( 'slidein' === moduleType ) {
					HUI.slideinLoad( container );
				}

				if ( 'inline' === moduleType ) {

					if ( 'social' !== moduleMode ) {
						HUI.inlineResize( container );
					}

					HUI.inlineLoad( container );

				}

				if ( 'float' === moduleType ) {
					HUI.floatLoad( container );
				}
			});

		}

		function init() {

			let moduleId = 0;

			button.on( 'click', function() {

				moduleId = Math.floor( ( Math.random() * 100 ) + 1 );

				render( moduleId );

				$( this ).prop( 'disabled', true );

			});
		}

		init();

		return this;
	};

	$( window ).on( 'load', function() {

		$( '.showcase-button-sample' ).each( function() {

			const moduleType = $( this ).data( 'module-type' );
			const moduleMode = $( this ).data( 'module-mode' );

			DEMO.openRandomOptin( moduleType, moduleMode );

		});

	});
}( jQuery ) );
