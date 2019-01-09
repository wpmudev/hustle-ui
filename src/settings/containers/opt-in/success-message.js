import React, { Component } from 'react';

export default class SuccessMessage extends Component {
	render() {
		let renderElement = '';

		if ( this.props.successMsg ) {
			renderElement = (
				<div className="hustle-success">

					<i className="hustle-icon-check" aria-hidden="true" />

					<div className="hustle-success-content">{ this.props.successMsg }</div>

				</div>
			);
		}

		return renderElement;
	}
}
