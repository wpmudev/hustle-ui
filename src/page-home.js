import React, { Component } from 'react';

import SampleEmbed from './home/sample-embed';

export default class Home extends Component {
	render() {
		return (
			<React.Fragment>

				<section>

					<h1>Embedded Opt-in</h1>

					<h2>Sample #1</h2>

					<ul>
						<li><strong>Image Display:</strong> Left</li>
						<li><strong>Image Fitting:</strong> None</li>
					</ul>

					<SampleEmbed
						mode="optin"
						imageDisplay="left"
						imageFitting="none"
					/>

					<hr />

					<h2>Sample #2</h2>

					<ul>
						<li><strong>Image Display:</strong> Right</li>
						<li><strong>Image Fitting:</strong> None</li>
					</ul>

					<SampleEmbed
						mode="optin"
						imageDisplay="right"
						imageFitting="none"
					/>

					<hr />

					<h2>Sample #3</h2>

					<ul>
						<li><strong>Image Display:</strong> Above</li>
						<li><strong>Image Fitting:</strong> None</li>
					</ul>

					<SampleEmbed
						mode="optin"
						imageDisplay="above"
						imageFitting="none"
					/>

					<hr />

					<h2>Sample #4</h2>

					<ul>
						<li><strong>Image Display:</strong> Below</li>
						<li><strong>Image Fitting:</strong> None</li>
					</ul>

					<SampleEmbed
						mode="optin"
						imageDisplay="below"
						imageFitting="none"
					/>

				</section>

			</React.Fragment>
		);
	}
}
