import React, { Component } from 'react';

export default class Image extends Component {
	render() {
		let source = '';
		let altText = 'Image';
		let classImg = '';

		if ( this.props.source && '' !== this.props.source ) {
			source = window.location.origin + '/assets/images/' + this.props.source;
		}

		if ( this.props.altText && '' !== this.props.altText ) {
			altText = this.props.altText;
		}

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			classImg = this.props.extraClass;
		}

		return (
			<img
				src={ source }
				alt={ altText }
				className={ classImg }
				aria-hidden="true"
			/>
		);
	}
}
