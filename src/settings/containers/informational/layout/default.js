import React, { Component } from 'react';

import LayoutImage from '../layout-element/image';
import Checkbox from '../../../components/checkbox';
import Button from '../../../components/button';

export default class LayoutDefault extends Component {
	render() {
		let moduleTitle = '';
		let moduleSubtitle = '';
		let moduleImage = '';
		let modulePosition = this.props.imagePos ? this.props.imagePos : 'left';
		let moduleImageLeft = '';
		let moduleImageRight = '';
		let moduleContent = '';
		let moduleGdpr = '';
		let moduleCta = '';

		let renderHeader = '';
		let renderContent = '';
		let renderFooter = '';

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
			moduleImageLeft = moduleImage;
		}

		if ( 'right' === modulePosition ) {
			moduleImageRight = moduleImage;
		}

		if ( this.props.content && '' !== this.props.content ) {
			moduleContent = (
				<div className="hustle-content">

					<div className="hustle-content-wrap">

						<div className="hustle-group-content">

							{ this.props.content }

						</div>

					</div>

				</div>
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

		if ( this.props.cta && '' !== this.props.cta ) {
			moduleCta = (
				<Button
					label={ this.props.cta }
					extraClass="hustle-button-cta"
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
				</div>
			);
		}

		if (
			( this.props.image && '' !== this.props.image ) ||
			( this.props.content && '' !== this.props.content )
		) {
			renderContent = (
				<div className="hustle-layout-content">
					{ moduleImageLeft }
					{ moduleContent }
					{ moduleImageRight }
				</div>
			);
		}

		if (
			( this.props.gdpr && '' !== this.props.gdpr ) ||
			( this.props.cta && '' !== this.props.cta )
		) {
			renderFooter = (
				<div className="hustle-layout-footer">
					{ moduleGdpr }
					{ moduleCta }
				</div>
			);
		}

		return (
			<div className="hustle-layout">

				{ renderHeader }

				{ renderContent }

				{ renderFooter }

			</div>
		);
	}
}
