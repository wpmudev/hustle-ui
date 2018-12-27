import React, { Component } from 'react';

import ButtonClose from '../components/button-close';
import SuccessMessage from './opt-in/success-message';

import LayoutDefault from './opt-in/layout/default';
import LayoutCompact from './opt-in/layout/compact';
import LayoutFocusOptin from './opt-in/layout/focus-optin';
import LayoutFocusContent from './opt-in/layout/focus-content';

export default class Optin extends Component {
	render() {
		const moduleId = this.props.moduleId ? this.props.moduleId : '0';
		const moduleTitle = this.props.title ? this.props.title : '';
		const moduleSubtitle = this.props.subtitle ? this.props.subtitle : '';
		const moduleContent = this.props.content ? this.props.content : '';
		const moduleCtaButton = this.props.ctaButton ? this.props.ctaButton : '';
		const moduleImage = this.props.image ? this.props.image : '';
		const moduleImageFit = this.props.imageFit ? this.props.imageFit : 'none';
		const moduleImagePosX = this.props.imagePosX ? this.props.imagePosX : 'center';
		const moduleImagePosY = this.props.imagePosY ? this.props.imagePosY : 'center';
		const moduleImagePosition = this.props.imagePosition  ? this.props.imagePosition : 'left';
		const moduleFieldsIcon = this.props.fieldsIcon ? this.props.fieldsIcon : '';
		const moduleFieldsProxymity = this.props.fieldsProximity ? this.props.fieldsProximity : '';
		const moduleFieldsGdpr = this.props.fieldsGdpr ? this.props.fieldsGdpr : '';
		const moduleFormOptions = this.props.formOptions ? this.props.formOptions : '';
		const moduleOptionsLabel = this.props.optionsLabel ? this.props.optionsLabel : '';

		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		let moduleType = '';
		let neverSeeLink = this.props.neverSeeLink ? this.props.neverSeeLink : 'false';
		let layoutClass = 'default';
		let renderLayout = '';
		let renderModule = '';

		if ( this.props.type && '' !== this.props.type ) {

			if ( 'popup' === this.props.type ) {
				moduleType = this.props.type;
				neverSeeLink = this.props.neverSeeLink ? this.props.neverSeeLink : 'false';
			} else if ( 'slidein' === this.props.type ) {
				moduleType = this.props.type;
				neverSeeLink = this.props.neverSeeLink ? this.props.neverSeeLink : 'false';
			} else if (
				'widget' === this.props.type ||
				'embedded' === this.props.type ||
				'shortcode' === this.props.type
			) {
				moduleType = 'inline';
			} else {
				console.log( 'The module type you entered does not exist.' );
			}
		}

		if ( this.props.layout && '' !== this.props.layout ) {
			layoutClass = this.props.layout;
		}

		if ( 'default' === this.props.layout ) {
			renderLayout = (
				<LayoutDefault
					moduleId={ moduleId }
					type={ moduleType }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					ctaButton={ moduleCtaButton }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePosition={ moduleImagePosition }
					fieldsIcon={ moduleFieldsIcon }
					fieldsProximity={ moduleFieldsProxymity }
					formOptions={ moduleFormOptions }
					optionsLabel={ moduleOptionsLabel }
					fieldsGdpr={ moduleFieldsGdpr }
					neverSeeLink={ neverSeeLink }
				>
					{ formFields }
				</LayoutDefault>
			);
		}

		if ( 'compact' === this.props.layout ) {
			renderLayout = (
				<LayoutCompact
					moduleId={ moduleId }
					type={ moduleType }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					ctaButton={ moduleCtaButton }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePosition={ moduleImagePosition }
					fieldsIcon={ moduleFieldsIcon }
					fieldsProximity={ moduleFieldsProxymity }
					formOptions={ moduleFormOptions }
					optionsLabel={ moduleOptionsLabel }
					fieldsGdpr={ moduleFieldsGdpr }
					neverSeeLink={ neverSeeLink }
				>
					{ formFields }
				</LayoutCompact>
			);
		}

		if ( 'focus-optin' === this.props.layout ) {
			renderLayout = (
				<LayoutFocusOptin
					moduleId={ moduleId }
					type={ moduleType }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					ctaButton={ moduleCtaButton }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePosition={ moduleImagePosition }
					fieldsIcon={ moduleFieldsIcon }
					fieldsProximity={ moduleFieldsProxymity }
					formOptions={ moduleFormOptions }
					optionsLabel={ moduleOptionsLabel }
					fieldsGdpr={ moduleFieldsGdpr }
					neverSeeLink={ neverSeeLink }
				>
					{ formFields }
				</LayoutFocusOptin>
			);
		}

		if ( 'focus-content' === this.props.layout ) {
			renderLayout = (
				<LayoutFocusContent
					moduleId={ moduleId }
					type={ moduleType }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					ctaButton={ moduleCtaButton }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePosition={ moduleImagePosition }
					fieldsIcon={ moduleFieldsIcon }
					fieldsProximity={ moduleFieldsProxymity }
					formOptions={ moduleFormOptions }
					optionsLabel={ moduleOptionsLabel }
					fieldsGdpr={ moduleFieldsGdpr }
					neverSeeLink={ neverSeeLink }
				>
					{ formFields }
				</LayoutFocusContent>
			);
		}

		if ( 'popup' === moduleType ) {
			renderModule = (
				<React.Fragment>

					<ButtonClose />

					<div className="hustle-optin-content">

						<SuccessMessage
							successMsg={ this.props.successMsg ? this.props.successMsg : '' }
						/>

						{ renderLayout }

					</div>

				</React.Fragment>
			);
		}

		if ( 'slidein' === moduleType ) {
			renderModule = (
				<React.Fragment>

					<ButtonClose />

					<div className="hustle-optin-content">

						<SuccessMessage
							successMsg={ this.props.successMsg ? this.props.successMsg : '' }
						/>

						{ renderLayout }

					</div>

				</React.Fragment>
			);
		}

		if ( 'inline' === moduleType ) {
			renderModule = (
				<React.Fragment>

					<SuccessMessage
						successMsg={ this.props.successMsg ? this.props.successMsg : '' }
					/>

					{ renderLayout }

				</React.Fragment>
			);
		}

		return (
			<div
				className={ `hustle-optin hustle-optin--${ layoutClass }` }
			>

				{ renderModule }

			</div>
		);
	}
}
