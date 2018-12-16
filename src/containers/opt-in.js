import React, { Component } from 'react';

import CloseButton from './opt-in/close-button';
import SuccessMessage from './opt-in/success-message';

import LayoutDefault from './opt-in/layout/default';

export default class Optin extends Component {
	render() {
		const layoutClass = this.props.layout;
		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		let moduleLayout = '';

		if ( 'default' === this.props.layout ) {
			moduleLayout = (
				<LayoutDefault
					property={ this.props.property ? this.props.property : '' }
					type={ this.props.type ? this.props.type : '' }
					title={ this.props.title ? this.props.title : '' }
					subtitle={ this.props.subtitle ? this.props.subtitle : '' }
					content={ this.props.contentLayout ? this.props.contentLayout : '' }
					image={ this.props.image ? this.props.image : '' }
					position={ this.props.position ? this.props.position : 'left' }
					positionX={ this.props.positionX ? this.props.positionX : 'left' }
					positionY={ this.props.positionY ? this.props.positionY : 'top' }
					fieldsIcon={ this.props.fieldsIcon ? this.props.fieldsIcon : '' }
					fieldsProximity={ this.props.fieldsProximity ? this.props.fieldsProximity : 'joined' }
					nsaLink={ this.props.nsaLink ? this.props.nsaLink : 'false' }
				>
					{ formFields }
				</LayoutDefault>
			);
		} else if ( 'compact' === this.props.layout ) {
			moduleLayout = (
				<p>Compact layout</p>
			);
		} else if ( 'focus-optin' === this.props.layout ) {
			moduleLayout = (
				<p>Opt-in focus layout</p>
			);
		} else if ( 'focus-content' === this.props.layout ) {
			moduleLayout = (
				<p>Content focus layout</p>
			);
		} else {
			moduleLayout = 'The layout you are requesting does not exist.';
		}

		let moduleType = '';

		if ( 'popup' === this.props.type ) {
			moduleType = (
				<React.Fragment>

					<CloseButton
						type={ this.props.type ? this.props.type : '' }
						property={ this.props.property ? this.props.property : '' }
					/>

					<div className="hustle-optin-content">

						<SuccessMessage
							content={ this.props.contentSuccess ? this.props.contentSuccess : '' }
						/>

						{ moduleLayout }

					</div>

				</React.Fragment>
			);
		} else if ( 'slidein' === this.props.type ) {
			moduleType = (
				<React.Fragment>

					<CloseButton
						type={ this.props.type ? this.props.type : '' }
						property={ this.props.property ? this.props.property : '' }
					/>

					<div className="hustle-optin-content">

						<SuccessMessage
							content={ this.props.contentSuccess ? this.props.contentSuccess : '' }
						/>

						{ moduleLayout }

					</div>

				</React.Fragment>
			);
		} else if (
			'widget' === this.props.type ||
			'embedded' === this.props.type ||
			'shortcode' === this.props.type
		) {
			moduleType = (
				<React.Fragment>

					<SuccessMessage
						content={ this.props.contentSuccess ? this.props.contentSuccess : '' }
					/>

					{ moduleLayout }

				</React.Fragment>
			);
		}

		return (
			<div
				id={ this.props.property ? 'hustle-module-' + this.props.property : '' }
				className={ `hustle-optin hustle-optin--${ layoutClass }` }
			>

				{ moduleType }

			</div>
		);
	}
}
