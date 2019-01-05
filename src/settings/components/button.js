import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const label = this.props.label ? this.props.label : 'Button';
		let extraClass = '';
		let renderLabel = label;

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			extraClass = ' ' + this.props.extraClass;
		}

		if ( this.props.onLoad && "true" === this.props.onLoad ) {
			renderLabel = (
				<React.Fragment>
					<span className="hustle-button-text">{ label }</span>
					<span className="hustle-loading-text">Form is being submitted. Please, wait a bit...</span>
					<i className="hustle-icon-loader hustle-loading-icon" aria-hidden="true" />
				</React.Fragment>
			);
		}

		let renderButton = (
			<button className={ `hustle-button${ extraClass }` }>
				{ renderLabel }
			</button>
		);

		if ( this.props.href && '' !== this.props.href ) {
			renderButton = (
				<a
					href={ this.props.href ? this.props.href : '/' }
					target={ this.props.target ? this.props.target : '_blank' }
					className={ `hustle-button${ extraClass }` }
				>
					{ renderLabel }
				</a>
			);
		}

		return renderButton;
	}
}
