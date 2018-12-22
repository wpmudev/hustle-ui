import React, { Component } from 'react';

import Tabs from '../../components/tabs';
import SampleOptinEmbed from '../../containers/samples/optin-embed';

export default class ImageFitting extends Component {
	render() {
		const data = {
			layout: 'compact'
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
					property="15"
					layout={ data.layout }
					imageFit="none"
				/>

				<SampleOptinEmbed
					value="contain"
					label="Contain"
					property="16"
					layout={ data.layout }
					imageFit="contain"
				/>

				<SampleOptinEmbed
					value="above"
					label="Cover"
					property="17"
					layout={ data.layout }
					imageFit="cover"
				/>

				<SampleOptinEmbed
					value="below"
					label="Fill"
					property="18"
					layout={ data.layout }
					imageFit="fill"
				/>

			</Tabs>
		);
	}
}