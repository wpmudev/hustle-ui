import React, { Component } from 'react';

import Tabs from './components/tabs';
import TabDefault from './page-informational/tab-default';
import TabCompact from './page-informational/tab-compact';
import TabStacked from './page-informational/tab-stacked';

export default class PageInfo extends Component {
	render() {
		return (
			<div className="showcase-content">

				<h1 style={{ marginBottom: '30px' }}>Informational Modules</h1>

				<Tabs
					default="default"
					sideClass="true"
					label="Choose Layout"
				>

					<TabDefault
						value="default"
						label="Default"
					/>

					<TabCompact
						value="compact"
						label="Compact"
					/>

					<TabStacked
						value="stacked"
						label="Stacked"
					/>

				</Tabs>

			</div>
		);
	}
}
