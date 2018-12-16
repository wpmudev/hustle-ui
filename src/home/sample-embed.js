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
			icon: 'none',
			proximity: 'joined',
			title: 'Malesuada Parturient Tellus',
			image: 'horizontal.png',
			position: 'left',
			positionX: 'left',
			positionY: 'top',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, ' +
				'eget lacinia odio sem nec elit.'
			),
			content: (
				<p>{(
					'Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus ' +
					'porttitor. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, ' +
					'tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa ' +
					'justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet ' +
					'non magna.'
				)}</p>
			),
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
					position={ optin.position }
					positionX={ optin.positionX }
					positionY={ optin.positionY }
					title={ optin.title }
					subtitle={ optin.subtitle }
					contentLayout={ optin.content }
					fieldsIcon={ optin.icon }
					fieldsProximity={ optin.proximity }
					contentSuccess={ optin.success }
				>
					<Input
						property={ optin.id }
						type="name"
						icon={ optin.icon }
						label="John Smith"
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
