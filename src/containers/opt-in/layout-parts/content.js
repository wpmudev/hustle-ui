import React, { Component } from 'react';

import Button from '../../../components/button';

export default class LayoutContent extends Component {
	render() {
		let contentHeader = '';

		if (
			'' !== this.props.title ||
			'' !== this.props.subtitle
		) {
			contentHeader = (
				<div className="hustle-group-title">

					{ ( '' !== this.props.title ) ?
						( <h1 className="hustle-title">{ this.props.title }</h1> ) :
						''
					}

					{ ( '' !== this.props.subtitle ) ?
						( <h2 className="hustle-subtitle">{ this.props.subtitle }</h2> ) :
						''
					}

				</div>
			);
		}

		let contentText = '';

		if ( '' !== this.props.content ) {
			contentText = (
				<div className="hustle-group-content">
					{ this.props.content }
				</div>
			);
		}

		let contentCta = '';

		if ( '' !== this.props.ctaButton ) {
			contentCta = (
				<Button
					label={ this.props.ctaButton }
				/>
			);
		}

		if (
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {

			return (
				<div className="hustle-content">

					<div className="hustle-content-wrap">

						{ contentHeader }
						{ contentText }
						{ contentCta }

					</div>

				</div>
			);
		} else {
			return '';
		}
	}
}
