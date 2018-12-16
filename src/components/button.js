import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const property = this.props.property ? this.props.property : '';
		const label = this.props.label ? this.props.label : 'Button';

		return (
			<button
				id={ `hustle-${ property }` }
				className="hustle-button"
			>
				{ label }
			</button>
		);
	}
}
