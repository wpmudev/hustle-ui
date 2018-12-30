import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const label = this.props.label ? this.props.label : 'Button';
		let extraClass = '';

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			extraClass = ' ' + this.props.extraClass;
		}

		let renderButton = (
			<button className={ `hustle-button${ extraClass }` }>
				{ label }
			</button>
		);

		if ( this.props.href && '' !== this.props.href ) {
			renderButton = (
				<a
					href={ this.props.href ? this.props.href : '/' }
					target={ this.props.target ? this.props.target : '_blank' }
					className={ `hustle-button${ extraClass }` }
				>
					{ label }
				</a>
			);
		}

		return renderButton;
	}
}
