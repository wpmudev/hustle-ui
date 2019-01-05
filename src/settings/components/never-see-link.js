import React, { Component } from 'react';

export default class NeverSeeLink extends Component {
	render() {
		let renderElement = '';

		if ( 'true' === this.props.neverSeeLink ) {

			if ( 'inline' !== this.props.type ) {

				renderElement = (
					<div className="hustle-layout-footer">

						<p class="hustle-nsa-link"><a href="/">Never see this message again</a></p>

					</div>
				);
			}
		}

		return renderElement;
	}
}
