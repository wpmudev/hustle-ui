import React, { Component } from 'react';

import $ from 'jquery';

import Input from '../../../components/input';
import Button from '../../../components/button';
import Checkbox from '../../../components/checkbox';
import OptionsGroup from './options-group';

export default class LayoutForm extends Component {
	componentDidMount() {
		$( 'body' ).on( 'click', '.hustle-ui .hustle-button-submit', function( event ) {
			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const error = form.find( '.hustle-error-message' );

			if ( form.find( '.hustle-field-error' ).length ) {
				error.show();
			}

			event.preventDefault();

		});
	}

	render() {
		let extraClass = '';
		let fieldsIcon = 'none';
		let fieldsProximity = ' hustle-proximity-joined';
		let recaptcha = false;
		let renderCaptcha = '';
		let gdprLabel = '';
		let renderGdpr = '';
		let renderGroups = '';

		if ( this.props.fieldsInline && 'true' === this.props.fieldsInline ) {
			extraClass = ' hustle-form-inline';
		}

		if (
			'static' === this.props.icon ||
			'animated' === this.props.icon
		) {
			fieldsIcon = this.props.icon;
		}

		if ( 'joined' === this.props.proximity ) {
			fieldsProximity = ' hustle-proximity-' + this.props.proximity;
		}

		if ( 'separated' === this.props.proximity ) {
			fieldsProximity = ' hustle-proximity-' + this.props.proximity;
		}

		if ( this.props.fieldsGdpr && '' !== this.props.fieldsGdpr ) {
			gdprLabel = this.props.fieldsGdpr;
			renderGdpr = (
				<Checkbox
					property={ `hustle-module-${ this.props.moduleId }-gdpr` }
					extraClass="hustle-gdpr"
					label={ gdprLabel }
				/>
			);
		}

		if ( this.props.formOptions && '' !== this.props.formOptions ) {
			renderGroups = (
				<OptionsGroup
					moduleId={ this.props.moduleId ? this.props.moduleId : '' }
					label={ this.props.optionsLabel ? this.props.optionsLabel : '' }
					formOptions={ this.props.formOptions ? this.props.formOptions : '' }
				/>
			);
		}

		if ( this.props.recaptcha && 'true' === this.props.recaptcha ) {
			recaptcha = true;
		}

		if ( true === recaptcha ) {
			renderCaptcha = (
				<div
					className="g-recaptcha"
					data-size="normal"
					data-sitekey="6LcTMoUUAAAAABxzuye_lXVH7mjg5rWdCYBJjQ5r"
					style={ {
						transform: 'scale(0.77)',
						transformOrigin: '0 0'
					} }
				/>
			);
		}

		const formFields = React.Children.map( this.props.children, child => {
			return child;
		});

		const errorMessage = (
			<div
				className="hustle-error-message"
				style={{ display: 'none' }}
			>
				<p>Woops, something went wrong when we tried to submit this form. Please, review required fields are correctly filled or checked. In case this persist, please contact website owner.</p>
			</div>
		);

		return (
			<form className="hustle-layout-form">

				<div className={ `hustle-form${ extraClass }` }>

					<div className={ `hustle-form-fields${ fieldsProximity }` }>

						{ formFields }

						<Input
							type="email"
							icon={ fieldsIcon }
							label="johnsmith@email.com"
							property={ `hustle-module-${ this.props.moduleId }-field-email` }
						/>

						<Button
							label="Submit"
							extraClass="hustle-button-submit"
							onClick={ this.handleChildClick }
						/>

					</div>

					{ renderGroups }

				</div>

				{ renderGdpr }

				{ renderCaptcha }

				{ errorMessage }

			</form>
		);
	}
}
