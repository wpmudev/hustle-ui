import React, { Component } from 'react';

import Module from './../settings/containers/module';
import Informational from './../settings/containers/informational';

export default class InfoEmbedded extends Component {
	render() {
		const basic = {
			id: this.props.property ? this.props.property : '0',
			type: 'embedded',
			mode: 'info',
			layout: this.props.layout ? this.props.layout : 'default',
			palette: this.props.palette ? this.props.palette : 'gray-slate',
			intro: this.props.intro ? this.props.intro : 'no_animation' // Inline only
		};

		const content = {
			title: 'Malesuada Parturient Tellus',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat ' +
				'porttitor ligula, eget lacinia odio sem nec elit.'
			),
			content: (
				<p>Cras mattis consectetur purus sit amet fermentum. <strong>Curabitur blandit tempus porttitor.</strong> Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum <a href="/" target="_blank">massa justo</a> sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
			),
			button: 'Call To Action',
			gdpr: (
				'From time to time we would like to send you offers and ' +
				'information we think you would be interested in. If you ' +
				'do not want to receive these, please untick the box.'
			)
		};

		const image = {
			source: 'horizontal.png',
			fitting: 'contain',
			position: 'left'
		};

		return (
			<Module
				moduleId={ basic.id }
				type={ basic.type }
				mode={ basic.mode }
				palette={ basic.palette }
				delay={ basic.delay }
				intro={ basic.intro } // Inline only
			>

				<Informational
					moduleId={ basic.id }
					type={ basic.type }
					layout={ basic.layout }
					title={ content.title }
					subtitle={ content.subtitle }
					content={ content.content }
					image={ image.source }
					imageFit={ image.fitting }
					imagePosition={ image.position }
					gdpr={ content.gdpr }
					cta={ content.button }
				/>

			</Module>
		);
	}
}
