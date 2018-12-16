import React, { Component } from 'react';

import Button from '../../components/button';

export default class CloseButton extends Component {
	render() {
		let content = '';

		if (
			'popup' === this.props.type ||
			'slidein' === this.props.type
		) {
			content = (
				<div className="hustle-optin-close">

					<Button
						property={ this.props.property ? 'close-' + this.props.property : '' }
					/>

				</div>
			);
		}

		return content;
	}
}
