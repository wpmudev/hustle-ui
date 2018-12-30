import React, { Component } from 'react';

import Module from './settings/containers/module';
import Optin from './settings/containers/opt-in';
import Input from './settings/components/input';

export default class PageHome extends Component {
	render() {
		const basic = {
			id: '9',
			type: 'embedded',
			layout: 'default',
			palette: 'ectoplasm'
		};

		const content = {
			title: 'Malesuada Parturient Tellus',
			subtitle: (
				'Duis mollis, est non commodo luctus, nisi erat ' +
				'porttitor ligula, eget lacinia odio sem nec elit.'
			),
			content: (
				<React.Fragment>
					<h1>Heading 1 - <a href="/">Link</a></h1>
					<h2>Heading 2 - <a href="/">Link</a></h2>
					<h3>Heading 3 - <a href="/">Link</a></h3>
					<h4>Heading 4 - <a href="/">Link</a></h4>
					<h5>Heading 5 - <a href="/">Link</a></h5>
					<h6>Heading 6 - <a href="/">Link</a></h6>
					<p>Cras mattis consectetur purus sit amet fermentum. <strong>Curabitur blandit tempus porttitor.</strong> Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum <a href="/" target="_blank">massa justo</a> sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
					<ul>
						<li>List one</li>
						<li>List two</li>
						<li>List three</li>
					</ul>
					<ol>
						<li>Item one</li>
						<li>Item two</li>
						<li>Item three</li>
					</ol>
					<blockquote>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
					</blockquote>
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
			)
		};

		return (
			<div className="showcase-content">

				<h1>Hustle UI</h1>

				<p>Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

				<p>Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui.</p>

				<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>

				<Module
					moduleId={ basic.id }
					type={ basic.type }
					palette={ basic.palette }
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
					>
						<Input
							type="name"
							label="John Smith"
							icon={ form.inputIcon }
							property={ `hustle-module-${ basic.id }-field-name` }
						/>
					</Optin>

				</Module>

				<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo.</p>

				<p>Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

				<p>Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>

			</div>
		);
	}
}
