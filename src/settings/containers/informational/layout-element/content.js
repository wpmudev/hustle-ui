import React, { Component } from 'react';
import Button from '../../../components/button';

export default class LayoutContent extends Component {
	render() {
		let title = '';
		let subtitle = '';
		let header = '';
		let content = '';
		let ctaButton = '';
		let renderContent = '';

		if ( this.props.title && '' !== this.props.title ) {
			title = (
				<span className="hustle-title">
					{ this.props.title }
				</span>
			);
		}

		if ( this.props.subtitle && '' !== this.props.subtitle ) {
			subtitle = (
				<span className="hustle-subtitle">
					{ this.props.subtitle }
				</span>
			);
		}

		if (
			'' !== this.props.title ||
			'' !== this.props.subtitle
		) {
			header = (
				<div className="hustle-group-title">
					{ title }
					{ subtitle }
				</div>
			);
		}

		if ( this.props.content && '' !== this.props.content ) {
			content = (
				<div className="hustle-group-content">
					{ this.props.content }
				</div>
			);
		}

		if ( this.props.ctaButton && '' !== this.props.ctaButton ) {
			ctaButton = (
				<Button
					label={ this.props.ctaButton }
					extraClass="hustle-button-cta"
				/>
			);
		}

		if (
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {
			renderContent = (
				<div className="hustle-content">

					<div className="hustle-content-wrap">

						{ header }
						{ content }
						{ ctaButton }

					</div>

				</div>
			);
		}

		return renderContent;
	}
}
