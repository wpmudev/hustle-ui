import React, { Component } from 'react';

import Input from '../components/input';

import Module from '../containers/module';
import Optin from '../containers/opt-in';
import Informational from '../containers/informational';

export default class SampleEmbed extends Component {
	render() {
		const optin = {
			id: 'sample-embed',
			type: 'embedded',
			layout: 'default',
			title: 'Malesuada Parturient Tellus',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, ' +
				'eget lacinia odio sem nec elit.'
			),
			ctaButton: 'Call To Action',
			content: (
				<p>{(
					'Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus ' +
					'porttitor. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, ' +
					'tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa ' +
					'justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet ' +
					'non magna.'
				)}</p>
			),
			position: 'below',
			image: 'horizontal.png',
			fitting: 'cover',
			imagePosX: 'center',
			imagePosY: 'center',
			icon: 'static',
			proximity: 'joined',
			nsaLink: 'true',
			success: (
				<p>{(
					'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras ' +
					'mattis consectetur purus sit amet fermentum.'
				)}</p>
			)
		};

		const info = {
			id: 'sample-embed',
			type: 'embedded',
			layout: 'default'
		};

		let moduleMode = '';

		if ( 'optin' === this.props.mode ) {
			moduleMode = (
				<Optin
					property={ optin.id }
					type={ optin.type }
					layout={ optin.layout }
					image={ optin.image }
					fitting={ optin.fitting }
					position={ optin.position }
					imagePosX={ optin.imagePosX }
					imagePosY={ optin.imagePosY }
					title={ optin.title }
					subtitle={ optin.subtitle }
					ctaButton={ optin.ctaButton }
					contentLayout={ optin.content }
					fieldsIcon={ optin.icon }
					fieldsProximity={ optin.proximity }
					contentSuccess={ optin.success }
					nsaLink={ optin.nsaLink }
				>
					<Input
						property={ `${ optin.id }-fname` }
						type="name"
						icon={ optin.icon }
						label="E.g. John"
					/>
					<Input
						property={ `${ optin.id }-lname` }
						type="name"
						icon={ optin.icon }
						label="E.g. Smith"
					/>
				</Optin>
			);
		}

		if ( 'informational' === this.props.mode ) {
			moduleMode = (
				<Informational
					property={ optin.id }
					type={ info.type }
					layout={ info.layout }
				/>
			);
		}
		return (
			<Module type="embedded">
				{ moduleMode }
			</Module>
		);
	}
}
