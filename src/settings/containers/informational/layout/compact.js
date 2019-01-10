import React, { Component } from 'react';

import LayoutImage from '../layout-element/image';

import Checkbox from '../../../components/checkbox';
import Button from '../../../components/button';

export default class LayoutCompact extends Component {
	render() {
		let moduleTitle = '';
		let moduleSubtitle = '';
		let moduleHeader = '';
		let moduleContent = '';
		let moduleCta = '';
		let moduleGdpr = '';

		let moduleImage = '';
		let modulePosition = this.props.imagePos ? this.props.imagePos : 'left';

		let renderImageLeft = '';
		let renderImageRight = '';
		let renderContent = '';

		if ( this.props.title && '' !== this.props.title ) {
			moduleTitle = (
				<span className="hustle-title">{ this.props.title }</span>
			);
		}

		if ( this.props.subtitle && '' !== this.props.subtitle ) {
			moduleSubtitle = (
				<span className="hustle-subtitle">{ this.props.subtitle }</span>
			);
		}

		if (
			( this.props.title && '' !== this.props.title ) ||
			( this.props.subtitle && '' !== this.props.subtitle )
		) {
			moduleHeader = (
				<div className="hustle-group-title">
					{ moduleTitle }
					{ moduleSubtitle }
				</div>
			);
		}

		if ( this.props.content && '' !== this.props.content ) {
			moduleContent = (
				<div className="hustle-group-content">
					{ this.props.content }
				</div>
			);
		}

		if ( this.props.cta && '' !== this.props.cta ) {
			moduleCta = (
				<Button
					label={ this.props.cta }
					extraClass="hustle-button-cta"
				/>
			);
		}

		if ( this.props.gdpr && '' !== this.props.gdpr ) {
			moduleGdpr = (
				<Checkbox
					property={ `hustle-module-${ this.props.property }-gdpr` }
					label={ this.props.gdpr }
				/>
			);
		}

		if ( this.props.image && '' !== this.props.image ) {
			moduleImage = (
				<LayoutImage
					image={ this.props.image ? this.props.image : '' }
					imageFit={ this.props.imageFit ? this.props.imageFit : 'none' }
					imagePosX={ this.props.imagePosX ? this.props.imagePosX : 'center' }
					imagePosY={ this.props.imagePosY ? this.props.imagePosY : 'center' }
				/>
			);
		}

		if ( 'left' === modulePosition ) {
			renderImageLeft = moduleImage;
		}

		if ( 'right' === modulePosition ) {
			renderImageRight = moduleImage;
		}

		if (
			( this.props.title && '' !== this.props.title ) ||
			( this.props.subtitle && '' !== this.props.subtitle ) ||
			( this.props.content && '' !== this.props.content ) ||
			( this.props.gdpr && '' !== this.props.gdpr ) ||
			( this.props.cta && '' !== this.props.cta )
		) {
			renderContent = (
				<div className="hustle-content">

					<div className="hustle-content-wrap">

						{ moduleHeader }

						{ moduleContent }

						{ moduleCta }

						{ moduleGdpr }

					</div>

				</div>
			);
		}

		return (
			<div className="hustle-layout">

				{ renderImageLeft }

				{ renderContent }

				{ renderImageRight }

			</div>
		);
	}
}
