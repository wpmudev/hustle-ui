/*!
 * WPMU DEV Hustle UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
/* global NodeList, Element, define */
( function( global ) {

	var FOCUSABLE_ELEMENTS = [
		'a[href]',
		'area[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'button:not([disabled])',
		'iframe',
		'object',
		'embed',
		'[contenteditable]',
		'[tabindex]:not([tabindex^="-"])'
	];
	var TAB_KEY = 9;
	var ESCAPE_KEY = 27;
	var focusedBeforeDialog;

	/**
	 * Define the constructor to instantiate a dialog
	 *
	 * @constructor
	 * @param {Element} node
	 * @param {(NodeList | Element | string)} targets
	 */
	function A11yDialog( node, targets ) {

		// Prebind the functions that will be bound in addEventListener and
		// removeEventListener to avoid losing references
		this._show = this.show.bind( this );
		this._hide = this.hide.bind( this );
		this._maintainFocus = this._maintainFocus.bind( this );
		this._bindKeypress = this._bindKeypress.bind( this );

		// Keep a reference of the node on the instance
		this.node = node;

		// Keep an object of listener types mapped to callback functions
		this._listeners = {};

		// Initialise everything needed for the dialog to work properly
		this.create( targets );

	}

	/**
	 * Set up everything necessary for the dialog to be functioning
	 *
	 * @param {(NodeList | Element | string)} targets
	 * @return {this}
	 */
	A11yDialog.prototype.create = function( targets ) {

		// Keep a collection of nodes to disable/enable when toggling the dialog
		this._targets = this._targets || collect( targets ) || getSiblings( this.node );

		// Make sure the dialog element is disabled on load, and that the `shown`
		// property is synced with its value
		this.node.setAttribute( 'aria-hidden', true );
		this.shown = false;

		// Keep a collection of dialog openers, each of which will be bound a click
		// event listener to open the dialog
		this._openers = $$( '[data-a11y-dialog-show="' + this.node.id + '"]' );
		this._openers.forEach( function( opener ) {
			opener.addEventListener( 'click', this._show );
		}.bind( this ) );

		// Keep a collection of dialog closers, each of which will be bound a click
		// event listener to close the dialog
		this._closers = $$( '[data-a11y-dialog-hide]', this.node )
		.concat( $$( '[data-a11y-dialog-hide="' + this.node.id + '"]' ) );

		this._closers.forEach( function( closer ) {
			closer.addEventListener( 'click', this._hide );
		}.bind( this ) );

		// Execute all callbacks registered for the `create` event
		this._fire( 'create' );

		return this;

	};

	/**
	 * Show the dialog element, disable all the targets (siblings), trap the
	 * current focus within it, listen for some specific key presses and fire all
	 * registered callbacks for `show` event
	 *
	 * @param {Event} event
	 * @return {this}
	 */
	A11yDialog.prototype.show = function( event ) {

		var overlay = this.node.getElementsByClassName( 'hustle-popup-mask' );
		var content = this.node.getElementsByClassName( 'hustle-popup-content' );

		// If the dialog is already open, abort
		if ( this.shown ) {
			return this;
		}

		content[0].className = 'hustle-popup-content sui-bounce-in';
		overlay[0].className = 'hustle-popup-mask sui-fade-in';

		this.shown = true;
		this.node.removeAttribute( 'aria-hidden' );

		// Iterate over the targets to disable them by setting their `aria-hidden`
		// attribute to `true`; in case they already have this attribute, keep a
		// reference of their original value to be able to restore it later
		this._targets.forEach( function( target ) {

			var original = target.getAttribute( 'aria-hidden' );

			if ( original ) {
				target.setAttribute( 'data-a11y-dialog-original', original );
			}

			target.setAttribute( 'aria-hidden', 'true' );

		});

		// Keep a reference to the currently focused element to be able to restore
		// it later, then set the focus to the first focusable child of the dialog
		// element
		focusedBeforeDialog = document.activeElement;
		setFocusToFirstItem( this.node );

		// Bind a focus event listener to the body element to make sure the focus
		// stays trapped inside the dialog while open, and start listening for some
		// specific key presses (TAB and ESC)
		document.body.addEventListener( 'focus', this._maintainFocus, true );
		document.addEventListener( 'keydown', this._bindKeypress );

		// Add overlay class to document body.
		document.getElementsByTagName( 'html' )[0].classList.add( 'hustle-has-overlay' );

		// Execute all callbacks registered for the `show` event
		this._fire( 'show', event );

		return this;

	};

	/**
	 * Hide the dialog element, enable all the targets (siblings), restore the
	 * focus to the previously active element, stop listening for some specific
	 * key presses and fire all registered callbacks for `hide` event
	 *
	 * @param {Event} event
	 * @return {this}
	 */
	A11yDialog.prototype.hide = function( event ) {

		var overlay = this.node.getElementsByClassName( 'hustle-popup-mask' );
		var content = this.node.getElementsByClassName( 'hustle-popup-content' );

		// If the dialog is already closed, abort
		if ( ! this.shown ) {
			return this;
		}

		content[0].className = 'hustle-popup-content sui-bounce-out';
		overlay[0].className = 'hustle-popup-mask sui-fade-out';

		this.shown = false;

		// This has been set so there is enough time for the animation to show
		const timeoutNode = this.node;

		setTimeout( function() {
			timeoutNode.setAttribute( 'aria-hidden', 'true' );
		}, 300 );

		// Iterate over the targets to enable them by remove their `aria-hidden`
		// attribute or resetting them to their initial value
		this._targets.forEach( function( target ) {

			var original = target.getAttribute( 'data-a11y-dialog-original' );

			if ( original ) {
				target.setAttribute( 'aria-hidden', original );
				target.removeAttribute( 'data-a11y-dialog-original' );
			} else {
				target.removeAttribute( 'aria-hidden' );
			}

		});

		// If their was a focused element before the dialog was opened, restore the
		// focus back to it
		if ( focusedBeforeDialog ) {
			focusedBeforeDialog.focus();
		}

		// Remove the focus event listener to the body element and stop listening
		// for specific key presses
		document.body.removeEventListener( 'focus', this._maintainFocus, true );
		document.removeEventListener( 'keydown', this._bindKeypress );

		// Remove overlay class to document body.
		document.getElementsByTagName( 'html' )[0].classList.remove( 'hustle-has-overlay' );

		// Execute all callbacks registered for the `hide` event
		this._fire( 'hide', event );

		return this;

	};

	/**
	 * Destroy the current instance (after making sure the dialog has been hidden)
	 * and remove all associated listeners from dialog openers and closers
	 *
	 * @return {this}
	 */
	A11yDialog.prototype.destroy = function() {

		// Hide the dialog to avoid destroying an open instance
		this.hide();

		// Remove the click event listener from all dialog openers
		this._openers.forEach( function( opener ) {
		opener.removeEventListener( 'click', this._show );
		}.bind( this ) );

		// Remove the click event listener from all dialog closers
		this._closers.forEach( function( closer ) {
			closer.removeEventListener( 'click', this._hide );
		}.bind( this ) );

		// Execute all callbacks registered for the `destroy` event
		this._fire( 'destroy' );

		// Keep an object of listener types mapped to callback functions
		this._listeners = {};

		return this;
	};

	/**
	 * Register a new callback for the given event type
	 *
	 * @param {string} type
	 * @param {Function} handler
	 */
	A11yDialog.prototype.on = function( type, handler ) {

		if ( 'undefined' === typeof this._listeners[type]) {
			this._listeners[type] = [];
		}

		this._listeners[type].push( handler );

		return this;

	};

	/**
	 * Unregister an existing callback for the given event type
	 *
	 * @param {string} type
	 * @param {Function} handler
	 */
	A11yDialog.prototype.off = function( type, handler ) {

		var index = this._listeners[type].indexOf( handler );

		if ( -1 > index ) {
			this._listeners[type].splice( index, 1 );
		}

		return this;

	};

	/**
	 * Iterate over all registered handlers for given type and call them all with
	 * the dialog element as first argument, event as second argument (if any).
	 *
	 * @access private
	 * @param {string} type
	 * @param {Event} event
	 */
	A11yDialog.prototype._fire = function( type, event ) {

		var listeners = this._listeners[type] || [];

		listeners.forEach( function( listener ) {
			listener( this.node, event );
		}.bind( this ) );

	};

	/**
	 * Private event handler used when listening to some specific key presses
	 * (namely ESCAPE and TAB)
	 *
	 * @access private
	 * @param {Event} event
	 */
	A11yDialog.prototype._bindKeypress = function( event ) {

		// If the dialog is shown and the ESCAPE key is being pressed, prevent any
		// further effects from the ESCAPE key and hide the dialog
		if ( this.shown && event.which === ESCAPE_KEY ) {
			event.preventDefault();
			this.hide();
		}

		// If the dialog is shown and the TAB key is being pressed, make sure the
		// focus stays trapped within the dialog element
		if ( this.shown && event.which === TAB_KEY ) {
			trapTabKey( this.node, event );
		}
	};

	/**
	 * Private event handler used when making sure the focus stays within the
	 * currently open dialog
	 *
	 * @access private
	 * @param {Event} event
	 */
	A11yDialog.prototype._maintainFocus = function( event ) {

		// If the dialog is shown and the focus is not within the dialog element,
		// move it back to its first focusable child
		if ( this.shown && ! this.node.contains( event.target ) ) {
			setFocusToFirstItem( this.node );
		}
	};

	/**
	 * Convert a NodeList into an array
	 *
	 * @param {NodeList} collection
	 * @return {Array<Element>}
	 */
	function toArray( collection ) {
		return Array.prototype.slice.call( collection );
	}

	/**
	 * Query the DOM for nodes matching the given selector, scoped to context (or
	 * the whole document)
	 *
	 * @param {String} selector
	 * @param {Element} [context = document]
	 * @return {Array<Element>}
	 */
	function $$( selector, context ) {
		return toArray( ( context || document ).querySelectorAll( selector ) );
	}

	/**
	 * Return an array of Element based on given argument (NodeList, Element or
	 * string representing a selector)
	 *
	 * @param {(NodeList | Element | string)} target
	 * @return {Array<Element>}
	 */
	function collect( target ) {

		if ( NodeList.prototype.isPrototypeOf( target ) ) {
			return toArray( target );
		}

		if ( Element.prototype.isPrototypeOf( target ) ) {
			return [ target ];
		}

		if ( 'string' === typeof target ) {
			return $$( target );
		}
	}

	/**
	 * Set the focus to the first focusable child of the given element
	 *
	 * @param {Element} node
	 */
	function setFocusToFirstItem( node ) {

		var focusableChildren = getFocusableChildren( node );

		if ( focusableChildren.length ) {
			focusableChildren[0].focus();
		}
	}

	/**
	 * Get the focusable children of the given element
	 *
	 * @param {Element} node
	 * @return {Array<Element>}
	 */
	function getFocusableChildren( node ) {
		return $$( FOCUSABLE_ELEMENTS.join( ',' ), node ).filter( function( child ) {
			return !! ( child.offsetWidth || child.offsetHeight || child.getClientRects().length );
		});
	}

	/**
	 * Trap the focus inside the given element
	 *
	 * @param {Element} node
	 * @param {Event} event
	 */
	function trapTabKey( node, event ) {

		var focusableChildren = getFocusableChildren( node );
		var focusedItemIndex = focusableChildren.indexOf( document.activeElement );

		// If the SHIFT key is being pressed while tabbing (moving backwards) and
		// the currently focused item is the first one, move the focus to the last
		// focusable item from the dialog element
		if ( event.shiftKey && 0 === focusedItemIndex ) {

			focusableChildren[focusableChildren.length - 1].focus();
			event.preventDefault();

			// If the SHIFT key is not being pressed (moving forwards) and the currently
			// focused item is the last one, move the focus to the first focusable item
			// from the dialog element

		} else if ( ! event.shiftKey && focusedItemIndex === focusableChildren.length - 1 ) {
			focusableChildren[0].focus();
			event.preventDefault();
		}
	}

	/**
	 * Retrieve siblings from given element
	 *
	 * @param {Element} node
	 * @return {Array<Element>}
	 */
	function getSiblings( node ) {
		var nodes = toArray( node.parentNode.childNodes );
		var siblings = nodes.filter( function( node ) {
			return 1 === node.nodeType;
		});

		siblings.splice( siblings.indexOf( node ), 1 );

		return siblings;

	}

	if ( 'undefined' !== typeof module && 'undefined' !== typeof module.exports ) {
		module.exports = A11yDialog;
	} else if ( 'function' === typeof define && define.amd ) {
		define( 'A11yDialog', [], function() {
			return A11yDialog;
		});
	} else if ( 'object' === typeof global ) {
		global.A11yDialog = A11yDialog;
	}

}( 'undefined' !== typeof global ? global : window ) );

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

			layout.slideUp( 800 );

			setTimeout( function() {
				success.slideDown();
			}, 800 );
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

( function( $ ) {

	HUI.checkboxGdpr = function() {

		$( '.hustle-ui .hustle-gdpr input' ).on( 'change', function( e ) {

			const checkbox = $( e.target );
			const label = checkbox.parent();

			if ( checkbox.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
			}
		});
	};

	HUI.checkboxGdpr();

}( jQuery ) );

( function( $ ) {

	HUI.inlineLoad = function( el ) {

		const element = $( el );
		const content = element.find( '.hustle-inline-content' );

		const windowHeight = $( window ).height();
		const elementPosition = element.offset().top;

		if ( ! element.is( '.hustle-inline' ) ) {
			return;
		}

		function reset() {
			element.removeClass( 'hustle-show' );
		}

		function animation() {

			const checkIntro = element.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate' );
			}
		}

		function animationIn() {

			const checkIntro = element.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate-in--' + animateIn );
			}
		}

		function load( delay ) {

			element.addClass( 'hustle-show' );

			setTimeout( function() {
				animationIn();
			}, delay );
		}

		function init() {

			reset();
			animation();

			if ( windowHeight > elementPosition ) {

				load( 200 );

			} else {

				$( window ).scroll( function() {

					const windowPosition = $( window ).scrollTop() + windowHeight;

					if ( windowPosition >= elementPosition ) {
						load( 100 );
					}
				});
			}
		}

		init();

		return this;
	};

	$( '.hustle-inline' ).each( function() {
		HUI.inlineLoad( this );
	});

}( jQuery ) );

( function( $ ) {

	HUI.inputFilled = function() {

		$( '.hustle-ui .hustle-input' ).blur( function() {

			const input = $( this );

			if ( '' !== input.val() ) {
				input.parent().addClass( 'hustle-field-filled' );
			} else {
				input.parent().removeClass( 'hustle-field-filled' );
			}

		});
	};

	HUI.inputFilled();

}( jQuery ) );

( function( $ ) {

	HUI.inputRequired = function() {

		$( '.hustle-ui .hustle-input' ).blur( function() {

			const input = $( this );
			const label = input.parent();

			if ( label.hasClass( 'hustle-field-required' ) ) {

				if ( '' === input.val() ) {
					label.addClass( 'hustle-field-error' );
				} else {
					label.removeClass( 'hustle-field-error' );
				}
			}

		});
	};

	HUI.inputRequired();

}( jQuery ) );

( function( $ ) {

	HUI.popupClose = function( el ) {

		const close = $( el );
		const popup = close.closest( '.hustle-ui' );
		const overlay = popup.find( '.hustle-popup-mask' );
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

		function closePopup() {

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
		}

		function init() {

			close.on( 'click', function( e ) {

				closePopup();

				e.preventDefault();
				e.stopPropagation();

			});

			if ( 1 === popup.data( 'overlay-close' ) ) {

				overlay.on( 'click', function( e ) {

					closePopup();

					e.preventDefault();
					e.stopPropagation();

				});
			}
		}

		init();

		return this;
	};

	$( '.hustle-button-close' ).each( function() {

		const close = $( this );

		HUI.popupClose( close );

	});

}( jQuery ) );

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

			popup.removeClass( 'hustle-show' );
			animation();

			setTimeout( function() {
				popup.addClass( 'hustle-show' );
			}, moduleTime );

			setTimeout( function() {
				animationIn();
			}, layoutTime );

		}

		init();

		return this;
	};

	$( '.hustle-popup' ).each( function() {

		const popup = $( this );
		const delay = $( this ).data( 'delay' );

		HUI.popupLoad( popup, delay );

	});

}( jQuery ) );

( function( $ ) {

	HUI.slideinClose = function( el ) {

		const close = $( el );
		const slidein = close.closest( '.hustle-ui' );
		const content = slidein.find( '.hustle-slidein-content' );

		if ( ! close.is( '.hustle-button-close' ) ) {
			return;
		}

		if ( ! slidein.hasClass( 'hustle-slidein' ) ) {
			return;
		}

		function animationOut() {
			content.addClass( 'hustle-animate-out' );
			content.removeClass( 'hustle-animate-in' );
		}

		function init() {

			close.on( 'click', function( e ) {

				animationOut();

				setTimeout( function() {
					slidein.removeClass( 'hustle-show' );
					content.removeClass( 'hustle-animate-out' );
				}, 1000 );

				e.preventDefault();

			});
		}

		init();

		return this;
	};

	$( '.hustle-button-close' ).each( function() {

		const close = $( this );

		HUI.slideinClose( close );

	});

}( jQuery ) );

( function( $ ) {

	HUI.slideinLoad = function( el, delay ) {

		const slidein = $( el );
		const content = slidein.find( '.hustle-slidein-content' );
		const moduleTime = delay - 200;
		const layoutTime = delay;

		if ( ! slidein.is( '.hustle-slidein' ) ) {
			return;
		}

		function reset() {
			slidein.removeClass( 'hustle-show' );
		}

		function show() {
			slidein.addClass( 'hustle-show' );
		}

		function position() {

			const checkPosition = slidein.data( 'position' );

			let positionX = '';
			let positionY = '';

			if ( checkPosition.charAt( 0 ).includes( 'n' ) ) {
				positionX = 'north';
			}

			if ( checkPosition.charAt( 0 ).includes( 's' ) ) {
				positionX = 'south';
			}

			if ( checkPosition.charAt( 0 ).includes( 'e' ) ) {
				positionX = 'east';
			}

			if ( checkPosition.charAt( 0 ).includes( 'w' ) ) {
				positionX = 'west';
			}

			if ( checkPosition.charAt( 1 ).includes( 'n' ) ) {
				positionY = 'north';
			}

			if ( checkPosition.charAt( 1 ).includes( 's' ) ) {
				positionY = 'south';
			}

			if ( checkPosition.charAt( 1 ).includes( 'e' ) ) {
				positionY = 'east';
			}

			if ( checkPosition.charAt( 1 ).includes( 'w' ) ) {
				positionY = 'west';
			}

			if ( 1 === checkPosition.length ) {
				slidein.addClass( 'hustle-slidein-position--' + positionX );
			} else {
				slidein.addClass( 'hustle-slidein-position--' + positionX + '-' + positionY );
			}

		}

		function animation() {
			content.addClass( 'hustle-animate-in' );
		}

		function init() {

			reset();
			position();

			setTimeout( function() {
				show();
			}, moduleTime );

			setTimeout( function() {
				animation();
			}, layoutTime );

		}

		init();

		return this;
	};

	$( '.hustle-slidein' ).each( function() {

		const slidein = $( this );
		const delay = $( this ).data( 'delay' );

		HUI.slideinLoad( slidein, delay );

	});

}( jQuery ) );
