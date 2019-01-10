import React, { Component } from 'react';

import Button from '../../../components/button';
import ButtonClose from '../../../components/button-close';
import Checkbox from '../../../components/checkbox';
import LayoutImage from '../layout-element/image';

export default class LayoutStacked extends Component {
	render() {
		let moduleTitle = '';
		let moduleSubtitle = '';
		let moduleClose = '';
		let moduleContent = '';
		let moduleCta = '';
		let moduleGdpr = '';
		let moduleImage = '';
		let modulePosition = this.props.imagePos ? this.props.imagePos : 'left';

		let renderHeader = '';
		let renderBody = '';
		let renderContent = '';
		let renderImageLeft = '';
		let renderImageRight = '';

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

		if ( 'inline' !== this.props.type ) {
			moduleClose = <ButtonClose />;
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

		if (
			( this.props.title && '' !== this.props.title ) ||
			( this.props.subtitle && '' !== this.props.subtitle )
		) {
			renderHeader = (
				<div className="hustle-layout-header">
					{ moduleTitle }
					{ moduleSubtitle }
					{ moduleClose }
				</div>
			);
		}

		if (
			( this.props.content && '' !== this.props.content ) ||
			( this.props.cta && '' !== this.props.cta ) ||
			( this.props.gdpr && '' !== this.props.gdpr )
		) {
			renderContent = (
				<div className="hustle-content">

					<div className="hustle-content-wrap">

						{ moduleContent }
						{ moduleCta }
						{ moduleGdpr }

					</div>

				</div>
			);
		}

		if ( 'left' === modulePosition ) {
			renderImageLeft = moduleImage;
		}

		if ( 'right' === modulePosition ) {
			renderImageRight = moduleImage;
		}

		if (
			( this.props.image && '' !== this.props.image ) ||
			( this.props.content && '' !== this.props.content ) ||
			( this.props.cta && '' !== this.props.cta ) ||
			( this.props.gdpr && '' !== this.props.gdpr )
		) {
			renderBody = (
				<div className="hustle-layout-body">

					{ renderImageLeft }

					{ renderContent }

					{ renderImageRight }

				</div>
			);
		}

		return (
			<div className="hustle-layout">

				{ renderHeader }

				{ renderBody }

			</div>
		);
	}
}
