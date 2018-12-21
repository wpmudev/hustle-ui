import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const label = this.props.label ? this.props.label : 'Button';

		return (
			<button className="hustle-button">
				{ label }
			</button>
		);
	}
}
