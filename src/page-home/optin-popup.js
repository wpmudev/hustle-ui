import React, { Component } from 'react';

import Module from './../settings/containers/module';
import Optin from './../settings/containers/opt-in';
import Input from './../settings/components/input';

export default class OptinPopup extends Component {
	render() {
		const basic = {
			id: this.props.property ? this.props.property : '0',
			type: 'popup',
			layout: this.props.layout ? this.props.layout : 'default',
			palette: this.props.palette ? this.props.palette : 'gray-slate',
			delay: this.props.delay ? this.props.delay : '0',
			intro: this.props.intro ? this.props.intro : 'no_animation', // Pop-ups only
			outro: this.props.outro ? this.props.outro : 'no_animation', // Pop-ups only
			overlay: this.props.overlayCanClose ? '1' : '0'
		};

		const content = {
			title: 'Malesuada Parturient Tellus',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat ' +
				'porttitor ligula, eget lacinia odio sem nec elit.'
			),
			content: (
				<React.Fragment>

					<p>Cras mattis consectetur purus sit amet fermentum. <strong>Curabitur blandit tempus porttitor.</strong> Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum <a href="/" target="_blank">massa justo</a> sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

				</React.Fragment>
			),
			button: 'Call To Action'
		};

		const image = {
			source: 'horizontal.png',
			fitting: 'contain',
			position: 'left'
		};

		const form = {
			inputIcon: 'static',
			mailchimp: 'checkbox',
			mailchimpTitle: 'Options Group',
			gdpr: (
				'From time to time we would like to send you offers and ' +
				'information we think you would be interested in. If you ' +
				'do not want to receive these, please untick the box.'
			),
			success: (
				<p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
			)
		};

		return (
			<Module
				moduleId={ basic.id }
				type={ basic.type }
				palette={ basic.palette }
				delay={ basic.delay }
				intro={ basic.intro } // Pop-ups only
				outro={ basic.outro } // Pop-ups only
				overlayClose={ basic.overlay }
			>

				<Optin
					moduleId={ basic.id }
					type={ basic.type }
					layout={ basic.layout }
					palette={ basic.palette }
					title={ content.title }
					subtitle={ content.subtitle }
					content={ content.content }
					ctaButton={ content.button }
					image={ image.source }
					imageFit={ image.fitting }
					imagePosition={ image.position }
					fieldsIcon={ form.inputIcon }
					formOptions={ form.mailchimp }
					optionsLabel={ form.mailchimpTitle }
					fieldsGdpr={ form.gdpr }
					neverSeeLink="true"
					successMsg={ form.success }
				>
					<Input
						type="name"
						label="John Smith"
						icon={ form.inputIcon }
						property={ `hustle-module-${ basic.id }-field-name` }
						requiredField="false"
					/>
				</Optin>

			</Module>
		);
	}
}
