import React, { Component } from 'react';

export default class Input extends Component {
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
