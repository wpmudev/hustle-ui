import React, { Component } from 'react';

export default class NeverSeeLink extends Component {
	render() {
		let renderElement = '';

		if ( 'true' === this.props.neverSeeLink ) {

			if (
				'popup' === this.props.type ||
				'slidein' === this.props.type
			) {

				renderElement = (
					<div className="hustle-layout-footer">

						<p className="hustle-nsa-link"><a href="/">Never see this message again</a></p>

					</div>
				);
			}
		}

		return renderElement;
	}
}
