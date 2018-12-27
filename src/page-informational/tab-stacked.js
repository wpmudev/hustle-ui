import React, { Component } from 'react';

import Tabs from '../components/tabs';
import SampleInfoEmbed from '../containers/samples/info-embed';

export default class TabStacked extends Component {
	render() {
		const data = {
			layout: 'stacked',
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
					property="31"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="left"
				/>

				<SampleInfoEmbed
					value="right"
					label="Right"
					property="32"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="right"
				/>

			</Tabs>
		);
	}
}
