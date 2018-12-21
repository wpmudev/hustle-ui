import React, { Component } from 'react';

export default class Checkbox extends Component {
	render() {
		let property = '';
		let extraClass = '';
		let label = '';

		if ( this.props.property && '' !== this.props.property ) {
			property = this.props.property;
		}

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			extraClass = ' ' + this.props.extraClass;
		}

		if ( this.props.label && '' !== this.props.label ) {
			label = (
				<span>{ this.props.label }</span>
			);
		}

		return (
			<label
				htmlFor={ property }
				className={ `hustle-checkbox${ extraClass }` }
			>
				<input
					type="checkbox"
					id={ property }
				/>
				<span aria-hidden="true" />
				{ label }
			</label>
		);
	}
}
