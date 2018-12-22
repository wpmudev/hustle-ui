import React, { Component } from 'react';

import ImagePosition from './tab-focus-optin/image-position';
import ImageFitting from './tab-focus-optin/image-fitting';

export default class TabFocusOptin extends Component {
	render() {
		return (
			<React.Fragment>

				<ImagePosition />

				<ImageFitting />

			</React.Fragment>
		);
	}
}
