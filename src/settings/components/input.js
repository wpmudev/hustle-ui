import React, { Component } from 'react';
import $ from 'jquery';

export default class Input extends Component {
	componentDidMount() {
		$( '.hustle-ui .hustle-input' ).blur( function() {
			const input = $( this );
			const label = input.parent();

			if ( '' === input.val() ) {
				label.removeClass( 'hustle-status--filled' );
			} else {
				label.addClass( 'hustle-status--filled' );
			}
		});

		if ( 'email' === this.props.type ) {
			const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			const validNet = /@.*\./;

			$( '.hustle-ui .hustle-input' ).on( 'change', function() {
				const input = $( this );
				const label = input.parent();

				const isValid = input.val().match( validEmail );
				const isNet = input.val().match( validNet );

				if ( ( null === isValid ) || ( null === isNet ) ) {
					label.addClass( 'hustle-field-error' );
				} else {
					label.removeClass( 'hustle-field-error' );
				}
			});
		}
	}

	render() {
		let type = '';
		let icon = '';
		let iconClass = '';
		let placeholder = '';
		let property = this.props.property;

		if ( this.props.type ) {

			if ( 'name' === this.props.type ) {
				type = 'text';
			} else if ( 'phone' === this.props.type ) {
				type = 'number';
			} else if ( 'address' === this.props.type ) {
				type = 'text';
			} else if ( 'website' === this.props.type ) {
				type = 'url';
			} else if ( 'datepicker' === this.props.type ) {
				type = 'text';
			} else if ( 'timepicker' === this.props.type ) {
				type = 'text';
			} else {
				type = this.props.type;
			}
		}

		if (
			'static' === this.props.icon ||
			'animated' === this.props.icon
		) {
			icon = (
				<i
					className={ `hustle-icon-${ this.props.type }` }
					aria-hidden="true"
				/>
			);

			iconClass = ` hustle-field-icon--${ this.props.icon }`;
		}

		if (
			'' !== this.props.label ||
			'static' === this.props.icon ||
			'animated' === this.props.icon
		) {
			placeholder = (
				<span className="hustle-input-label">

					{ icon }

					{ '' !== this.props.label && (
						<span>{ this.props.label }</span>
					) }

				</span>
			);
		}

		if ( this.props.property && '' !== this.props.property ) {
			property = this.props.property;
		}

		return (
			<label
				htmlFor={ property }
				className={ `hustle-field${ iconClass }` }
			>

				<input
					type={ type }
					id={ property }
					className="hustle-input"
				/>

				{ placeholder }

			</label>
		);
	}
}
