( function( $ ) {

	$( 'body' ).ready( function() {

		// Test render
		const render = function( template, node ) {
			node.innerHTML = template;
		};

		const template = $( '#sample-template' ).html();

		render( template, document.querySelector( '#main' ) );

		console.log( 'Is loading' );

	});

}( jQuery ) );
