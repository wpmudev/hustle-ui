import React, { Component } from 'react';

export default class ButtonClose extends Component {
	render() {
		return (
			<button className="hustle-button-icon">
				<i className="hustle-icon-close" aria-hidden="true" />
				<span className="hustle-screen-reader">Close this module</span>
			</button>
		);
	}
}
