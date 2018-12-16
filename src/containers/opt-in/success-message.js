import React, { Component } from 'react';

export default class SuccessMessage extends Component {
	render() {
		let content = '';

		if ( this.props.content ) {
			content = (
				<div
					className="hustle-success"
					style={{ display: 'none' }}
				>

					<i className="hustle-icon-check" aria-hidden="true"></i>

					<div className="hustle-success-content">{ this.props.content }</div>

				</div>
			);
		}

		return content;
	}
}
