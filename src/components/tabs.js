import React, { Component } from 'react';

export default class Tab extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			active: this.props.default
		};
	}

	toggleActive( tab ) {
		this.setState({
			active: tab
		});
	}

	render() {
		let mainClass = 'sui-tabs';
		let extraClass = '';
		let fieldLabel = '';
		let fieldDescription = '';

		if ( this.props.sideClass && 'true' === this.props.sideClass ) {
			mainClass = 'sui-side-tabs';
		}

		if ( this.props.extraClass && '' !== this.props.extraClass ) {
			extraClass = ' ' + this.props.extraClass;
		}

		if ( this.props.label && '' !== this.props.label ) {
			fieldLabel = (
				<label className="sui-label">
					{ this.props.label }
				</label>
			);
		}

		if ( this.props.description && '' !== this.props.description ) {
			fieldDescription = (
				<span
					className="sui-description"
					style={{ marginBottom: '20px' }}
				>
					{ this.props.description }
				</span>
			);
		}

		const tabsMenu = React.Children.map( this.props.children, tab => {
			let label = tab.props.children;

			if ( tab.props.label ) {
				label = tab.props.label;
			}

			return (
				<div
					className={ `sui-tab-item${ tab.props.value === this.state.active ? ' active' : '' }` }
					onClick={ this.toggleActive.bind( this, tab.props.value ) }
				>
					{ label }
				</div>
			);
		});

		const tabsContent = React.Children.map( this.props.children, tab => {
			return (
				<div
					className={ `sui-tab-content${ tab.props.value === this.state.active ? ' active' : '' }` }
				>
					{ tab }
				</div>
			);
		});

		const tabsComponent = (
			<div className={ `${ mainClass }${ extraClass }` }>

				<div className="sui-tabs-menu">
					{ tabsMenu }
				</div>

				<div className="sui-tabs-content">
					{ tabsContent }
				</div>

			</div>
		);

		let getComponent = (
			<div className="sui-form-field">
				{ fieldLabel }
				{ fieldDescription }
				{ tabsComponent }
			</div>
		);

		if ( this.props.unWrap && 'true' === this.props.unWrap ) {
			getComponent = tabsComponent;
		}

		return getComponent;
	}
}
