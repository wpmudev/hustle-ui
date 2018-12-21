import React, { Component } from 'react';

import Tabs from '../components/tabs';
import SampleOptinEmbed from '../containers/samples/optin-embed';

export default class TabCompact extends Component {
	render() {
		return (
			<Tabs
				default="left"
				sideClass="false"
			>

				<SampleOptinEmbed
					value="left"
					label="Image Left"
					layout="compact"
				/>

				<SampleOptinEmbed
					value="right"
					label="Image Right"
					layout="compact"
				/>

			</Tabs>
		);
	}
}
