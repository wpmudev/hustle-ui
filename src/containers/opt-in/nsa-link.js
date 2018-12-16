import React, { Component } from 'react';

export default class NeverSeeLink extends Component {
	render() {
		let content = '';

		if ( 'true' === this.props.nsaLink ) {

			if (
				'popup' === this.props.type ||
				'slidein' === this.props.type
			) {

				content = (
					<div className="hustle-layout-footer">
						<p><a href="/">Never see this message again</a></p>
					</div>
				);
			}
		}

		return (
			<React.Fragment>
				{ content }
			</React.Fragment>
		);
	}
}
