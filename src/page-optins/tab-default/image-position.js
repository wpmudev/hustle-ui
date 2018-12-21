import React, { Component } from 'react';

import Tabs from '../../components/tabs';
import SampleOptinEmbed from '../../containers/samples/optin-embed';

export default class ImagePosition extends Component {
	render() {
		const data = {
			layout: 'default'
		};

		return (
			<Tabs
				default="left"
				sideClass="false"
				label="1. Image Position"
				description={(
					'One of the variations opt-in modules have is the position ' +
					'of the image. Images on all layouts can be positioned at ' +
					'left or right of the module, but only "Default Layout" have ' +
					'the ability to place image at top or bottom of the module.'
				)}
			>

				<SampleOptinEmbed
					value="left"
					label="Image Left"
					property="1"
					layout={ data.layout }
					imagePosition="left"
				/>

				<SampleOptinEmbed
					value="right"
					label="Image Right"
					property="2"
					layout={ data.layout }
					imagePosition="right"
				/>

				<SampleOptinEmbed
					value="above"
					label="Image Above"
					property="3"
					layout={ data.layout }
					imagePosition="above"
				/>

				<SampleOptinEmbed
					value="below"
					label="Image Below"
					property="4"
					layout={ data.layout }
					imagePosition="below"
				/>

			</Tabs>
		);
	}
}
