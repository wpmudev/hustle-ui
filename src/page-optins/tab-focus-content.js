import React, { Component } from 'react';

import ImagePosition from './tab-focus-content/image-position';
import ImageFitting from './tab-focus-content/image-fitting';

export default class TabFocusContent extends Component {
	render() {
		return (
			<React.Fragment>

				<ImagePosition />

				<ImageFitting />

			</React.Fragment>
		);
	}
}
