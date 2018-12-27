import React, { Component } from 'react';

import ButtonClose from '../components/button-close';
import NeverSeeLink from '../components/never-see-link';

import LayoutDefault from './informational/layout/default';
import LayoutCompact from './informational/layout/compact';
import LayoutStacked from './informational/layout/stacked';

export default class Informational extends Component {
	render() {
		const moduleId = this.props.moduleId ? this.props.moduleId : '0';
		const moduleTitle = this.props.title ? this.props.title : '';
		const moduleSubtitle = this.props.subtitle ? this.props.subtitle : '';
		const moduleContent = this.props.content ? this.props.content : '';
		const moduleImage = this.props.image ? this.props.image : '';
		const moduleImageFit = this.props.imageFit ? this.props.imageFit : 'none';
		const moduleImagePosX = this.props.imagePosX ? this.props.imagePosX : 'center';
		const moduleImagePosY = this.props.imagePosY ? this.props.imagePosY : 'center';
		const moduleImagePosition = this.props.imagePosition  ? this.props.imagePosition : 'left';
		const moduleGdpr = this.props.gdpr ? this.props.gdpr : '';
		const moduleCta = this.props.cta ? this.props.cta : '';

		let moduleType = '';
		let moduleClose = '';
		let layoutClass = 'default';
		let renderLayout = '';
		let neverSeeLink = this.props.neverSeeLink ? this.props.neverSeeLink : 'false';

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

		if ( this.props.layout && 'stacked' !== this.props.layout ) {

			if ( 'inline' !== moduleType ) {
				moduleClose = <ButtonClose />;
			}
		}

		if ( this.props.layout && '' !== this.props.layout ) {
			layoutClass = this.props.layout;
		}

		if ( 'default' === layoutClass ) {
			renderLayout = (
				<LayoutDefault
					property={ moduleId }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePos={ moduleImagePosition }
					gdpr={ moduleGdpr }
					cta={ moduleCta }
				/>
			);
		}

		if ( 'compact' === layoutClass ) {
			renderLayout = (
				<LayoutCompact
					property={ moduleId }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePos={ moduleImagePosition }
					gdpr={ moduleGdpr }
					cta={ moduleCta }
				/>
			);
		}

		if ( 'stacked' === layoutClass ) {
			renderLayout = (
				<LayoutStacked
					property={ moduleId }
					type={ moduleType }
					title={ moduleTitle }
					subtitle={ moduleSubtitle }
					content={ moduleContent }
					image={ moduleImage }
					imageFit={ moduleImageFit }
					imagePosX={ moduleImagePosX }
					imagePosY={ moduleImagePosY }
					imagePos={ moduleImagePosition }
					gdpr={ moduleGdpr }
					cta={ moduleCta }
				/>
			);
		}

		return (
			<div
				className={ `hustle-info hustle-info--${ layoutClass }` }
			>

				{ moduleClose }

				{ renderLayout }

				<NeverSeeLink
					type={ moduleType }
					neverSeeLink={ neverSeeLink }
				/>

			</div>
		);
	}
}
