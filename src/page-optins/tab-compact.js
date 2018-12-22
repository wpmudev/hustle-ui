import React, { Component } from 'react';

import ImagePosition from './tab-compact/image-position';
import ImageFitting from './tab-compact/image-fitting';

export default class TabCompact extends Component {
	render() {
		return (
			<React.Fragment>

				<ImagePosition />

				<ImageFitting />

			</React.Fragment>
		);
	}
}
