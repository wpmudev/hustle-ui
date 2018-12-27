import React, { Component } from 'react';

import Tabs from './components/tabs';
import TabDefault from './page-optins/tab-default';
import TabCompact from './page-optins/tab-compact';
import TabFocusOptin from './page-optins/tab-focus-optin';
import TabFocusContent from './page-optins/tab-focus-content';

export default class PageOptin extends Component {
	render() {
		return (
			<div className="showcase-content">

				<h1 style={{ marginBottom: '30px' }}>Opt-in Modules</h1>

				<Tabs
					default="default"
					sideClass="true"
				>

					<TabDefault
						value="default"
						label="Default"
					/>

					<TabCompact
						value="compact"
						label="Compact"
					/>

					<TabFocusOptin
						value="focus-optin"
						label="Opt-in Focus"
					/>

					<TabFocusContent
						value="focus-content"
						label="Content Focus"
					/>

				</Tabs>

			</div>
		);
	}
}
