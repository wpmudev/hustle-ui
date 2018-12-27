import React, { Component } from 'react';

import Tabs from '../components/tabs';
import SampleInfoEmbed from '../containers/samples/info-embed';

export default class TabDefault extends Component {
	render() {
		const data = {
			layout: 'default',
			fitting: 'cover'
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
					property="11"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="left"
				/>

				<SampleInfoEmbed
					value="right"
					label="Right"
					property="12"
					layout={ data.layout }
					imageFit={ data.fitting }
					imagePosition="right"
				/>

			</Tabs>
		);
	}
}
