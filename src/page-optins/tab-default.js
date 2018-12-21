import React, { Component } from 'react';

import ImagePosition from './tab-default/image-position';
import ImageFitting from './tab-default/image-fitting';

export default class TabDefault extends Component {
	render() {
		return (
			<React.Fragment>

				<ImagePosition />

				<ImageFitting />

			</React.Fragment>
		);
	}
}
