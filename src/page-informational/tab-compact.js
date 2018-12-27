import React, { Component } from 'react';

import Tabs from '../components/tabs';
import SampleInfoEmbed from '../containers/samples/info-embed';

export default class TabCompact extends Component {
	render() {
		const data = {
			layout: 'compact',
			fitting: 'none'
		};

		return (
			<Tabs
				default="left"
				sideClass="true"
				label="Position Image"
			>

				<SampleInfoEmbed
					value="left"
					label="Left"
					property="21"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="left"
				/>

				<SampleInfoEmbed
					value="right"
					label="Right"
					property="22"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="right"
				/>

			</Tabs>
		);
	}
}
