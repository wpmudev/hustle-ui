import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const label = this.props.label ? this.props.label : 'Button';
		let extraClass = '';

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			extraClass = ' ' + this.props.extraClass;
		}

		return (
			<button className={ `hustle-button${ extraClass }` }>
				{ label }
			</button>
		);
	}
}
