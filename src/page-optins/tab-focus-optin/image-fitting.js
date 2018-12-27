import React, { Component } from 'react';

import Tabs from '../../components/tabs';
import SampleOptinEmbed from '../../containers/samples/optin-embed';

export default class ImageFitting extends Component {
	render() {
		const data = {
			layout: 'focus-optin'
		};

		return (
			<Tabs
				default="none"
				sideClass="false"
				label="2. Image Fitting"
				description={(
					'Module image can have 4 different sizes: none, contain, cover, and fill. ' +
					'In this example you can see a module with image positioned at left.'
				)}
			>

				<SampleOptinEmbed
					value="none"
					label="None"
					property="25"
					layout={ data.layout }
					imageFit="none"
				/>

				<SampleOptinEmbed
					value="contain"
					label="Contain"
					property="26"
					layout={ data.layout }
					imageFit="contain"
				/>

				<SampleOptinEmbed
					value="above"
					label="Cover"
					property="27"
					layout={ data.layout }
					imageFit="cover"
				/>

				<SampleOptinEmbed
					value="below"
					label="Fill"
					property="28"
					layout={ data.layout }
					imageFit="fill"
				/>

			</Tabs>
		);
	}
}