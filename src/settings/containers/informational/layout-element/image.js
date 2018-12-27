import React, { Component } from 'react';

import Image from '../../../components/image';

export default class LayoutImage extends Component {
	render() {
		let imageSource = '';
		let imageAltText = 'Sample image';
		let positionX = 'center';
		let positionY = 'center';
		let position = 'hustle-image-position--' + positionX + '-' + positionY;
		let fitting = this.props.imageFit ? this.props.imageFit : 'none';
		let renderElement = '';

		if ( this.props.image && '' !== this.props.image ) {
			imageSource = this.props.image;
		}

		if ( this.props.imagePosX && '' !== this.props.imagePosX ) {

			if ( 'left' === this.props.imagePosX ) {
				positionX = this.props.imagePosX;
			}

			if ( 'center' === this.props.imagePosX ) {
				positionX = this.props.imagePosX;
			}

			if ( 'right' === this.props.imagePosX ) {
				positionX = this.props.imagePosX;
			}
		}

		if ( this.props.imagePosY && '' !== this.props.imagePosY ) {

			if ( 'top' === this.props.imagePosY ) {
				positionX = this.props.imagePosY;
			}

			if ( 'center' === this.props.imagePosY ) {
				positionX = this.props.imagePosY;
			}

			if ( 'bottom' === this.props.imagePosY ) {
				positionX = this.props.imagePosY;
			}
		}

		if ( 'fill' !== this.props.imageFit ) {
			position = '';
		}

		if ( 'none' !== this.props.imageFit ) {
			position = '';
		}

		if ( this.props.imageText && '' !== this.props.imageText ) {
			imageAltText = this.props.imageText;
		}

		if ( this.props.image && '' !== this.props.image ) {
			renderElement = (
				<div
					className={ `hustle-image hustle-image-fit--${ fitting }` }
					aria-hidden="true"
				>

					<Image
						source={ imageSource }
						altText={ imageAltText }
						extraClass={ position }
					/>

				</div>
			);
		}

		return renderElement;
	}
}
