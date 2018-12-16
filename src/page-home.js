import React, { Component } from 'react';

import SampleEmbed from './home/sample-embed';

export default class Home extends Component {
	render() {
		return (
			<React.Fragment>

				<section>

					<SampleEmbed mode="optin" />

					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

					<p>Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.</p>

					<p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor.</p>

					{/**
					<Module type="embedded">
						<Optin
							type="embedded"
							layout="compact"
							property="sample-embed"
							title="Malesuada Parturient Tellus"
							subtitle="Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
							content={(
								'Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. ' +
								'Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, ' +
								'tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam ' +
								'eget risus varius blandit sit amet non magna.'
							)}
							ctaButton="Call To Action"
							success="true"
							proximity="joined"
							icon="animated"
						/>
					</Module>
					*/}

					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

					<SampleEmbed mode="optin" />

				</section>

			</React.Fragment>
		);
	}
}
