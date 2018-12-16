import React, { Component } from 'react';

export default class Module extends Component {
	render() {
		const children = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		let moduleType = '';

		if (
			'popup' === this.props.type ||
			'widget' === this.props.type ||
			'slidein' === this.props.type ||
			'embedded' === this.props.type ||
			'shortcode' === this.props.type
		) {
			if (
				'popup' === this.props.type ||
				'slidein' === this.props.type
			) {
				moduleType = ' hustle-' + this.props.type;
			} else {
				moduleType = ' hustle-inline';
			}
		} else {
			console.log(
				'ERROR: Hustle module type invalid!'
			);
		}

		let moduleLayout = '';

		if ( 'popup' === this.props.type ) {
			moduleLayout = (
				<React.Fragment>
					<div className={ `hustle-${ this.props.type }-mask` }></div>
					<div className={ `hustle-${ this.props.type }-content` }>
						{ children }
					</div>
				</React.Fragment>
			);
		} else if ( 'slidein' === this.props.type ) {
			moduleLayout = (
				<React.Fragment>
					<div className={ `hustle-${ this.props.type }-content` }>
						{ children }
					</div>
				</React.Fragment>
			);
		} else if (
			'widget' === this.props.type ||
			'embedded' === this.props.type ||
			'shortcode' === this.props.type
		) {
			moduleLayout = children;
		} else {
			moduleLayout = (
				<p><strong>ERROR:</strong> Hustle module type invalid!</p>
			);
		}

		return (
			<div className={ `hustle-ui${ moduleType }` }>
				{ moduleLayout }
			</div>
		);
	}
}
