import React, { Component } from 'react';

export default class LayoutImage extends Component {
	render() {
		const fitting = this.props.fitting ? this.props.fitting : 'none';
		const positionX = this.props.imagePosX ? this.props.imagePosX : 'left';
		const positionY = this.props.imagePosY ? this.props.imagePosY : 'top';
		let imagePosition = 'hustle-image-position--' + positionX + positionY;

		if ( 'fill' === this.props.fitting ) {
			imagePosition = '';
		}

		if ( 'none' === this.props.fitting ) {
			imagePosition = '';
		}

		if ( '' !== this.props.image ) {

			return (
				<div
					className={ `hustle-image hustle-image-fit--${ fitting }` }
					aria-hidden="true"
				>

					<img
						src={ `assets/images/${ this.props.image }` }
						alt="Sample Image"
						className={ imagePosition }
						aria-hidden="true"
					/>

				</div>
			);
		} else {
			return '';
		}
	}
}
