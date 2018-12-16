import React, { Component } from 'react';

export default class LayoutImage extends Component {
	render() {
		const fitting = this.props.fitting ? this.props.fitting : 'none';
		const positionX = this.props.positionX ? this.props.positionX : 'left';
		const positionY = this.props.positionY ? this.props.positionY : 'top';

		if ( '' !== this.props.image ) {

			return (
				<div
					className={ `hustle-image hustle-image-fit--${ fitting }` }
					aria-hidden="true"
				>

					<img
						src="https://www.ngenespanol.com/wp-content/uploads/2018/08/%C2%BFEs-m%C3%A1s-sano-desayunar-pizza-o-cereal.png"
						alt="Sample Image"
						className={ `hustle-image-position--${ positionX }-${ positionY }` }
						aria-hidden="true"
					/>

				</div>
			);
		} else {
			return '';
		}
	}
}
