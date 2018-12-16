import React, { Component } from 'react';

export default class Checkbox extends Component {
	render() {
		const property = this.props.property ? 'hustle-' + this.props.property : '';

		return (
			<label
				htmlFor={ property }
				className="hustle-checkbox"
			>
				<input
					type="checkbox"
					id={ property }
				/>
				<span aria-hidden="true" />
				{ '' !== this.props.label &&
					<span>{ this.props.label }</span>
				}
			</label>
		);
	}
}
