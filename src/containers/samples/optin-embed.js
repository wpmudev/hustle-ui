import React, { Component } from 'react';

import Module from '../../settings/containers/module';
import Optin from '../../settings/containers/opt-in';
import Input from '../../settings/components/input';

export default class SampleOptinEmbed extends Component {
	render() {
		const moduleId = this.props.property ? this.props.property : '0';
		const moduleLayout = this.props.layout ? this.props.layout : 'default';
		const moduleImageFit = this.props.imageFit ? this.props.imageFit : 'contain';
		const moduleImagePosition = this.props.imagePosition ? this.props.imagePosition : 'left';

		const modulx = {
			id: moduleId,
			type: 'embedded',
			layout: moduleLayout,
			title: 'Malesuada Parturient Tellus',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat ' +
				'porttitor ligula, eget lacinia odio sem nec elit.'
			),
			content: (
				<p>{(
					'Cras mattis consectetur purus sit amet fermentum. Curabitur ' +
					'blandit tempus porttitor. Etiam porta sem malesuada magna ' +
					'mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor ' +
					'mauris condimentum nibh, ut fermentum massa justo sit amet risus. ' +
					'Maecenas sed diam eget risus varius blandit sit amet non magna.'
				)}</p>
			),
			ctaButton: 'Call To Action',
			image: 'horizontal.png',
			imageFit: moduleImageFit,
			imagePosition: moduleImagePosition,
			fieldsIcon: 'animated',
			formOptions: 'checkbox',
			optionsLabel: 'Options Group',
			gdpr: (
				'From time to time we would like to send you offers and ' +
				'information we think you would be interested in. If you ' +
				'do not want to receive these, please untick the box.'
			)
		};

		return (
			<Module
				type={ modulx.type }
				moduleId={ modulx.id }
			>

				<Optin
					type={ modulx.type }
					moduleId={ modulx.id }
					layout={ modulx.layout }
					title={ modulx.title }
					subtitle={ modulx.subtitle }
					content={ modulx.content }
					ctaButton={ modulx.ctaButton }
					image={ modulx.image }
					imageFit={ modulx.imageFit }
					imagePosition={ modulx.imagePosition }
					fieldsIcon={ modulx.fieldsIcon }
					formOptions={ modulx.formOptions }
					optionsLabel={ modulx.optionsLabel }
					fieldsGdpr={ modulx.gdpr }
				>
					<Input
						type="name"
						label="John Smith"
						icon={ modulx.fieldsIcon }
						property={ `hustle-module-${ modulx.id }-field-name` }
					/>
				</Optin>

			</Module>
		);
	}
}
