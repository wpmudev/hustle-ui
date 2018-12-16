import React, { Component } from 'react';

import Button from '../../../components/button';
import Input from '../../../components/input';

export default class LayoutForm extends Component {
	render() {
		const proximity = this.props.fieldsProximity ? this.props.fieldsProximity : '';
		const fields = React.Children.map( this.props.children, child => {
			return child;
		});

		let icon = 'none';

		if (
			'static' === this.props.fieldsIcon ||
			'animated' === this.props.fieldsIcon
		) {
			icon = this.props.fieldsIcon;
		}

		return (
			<form
				id={ this.props.property ?
					'hustle-optin-form-' + this.props.property :
					''
				}
				className="hustle-layout-form"
			>

				<div className="hustle-form">

					<div className={ `hustle-form-fields hustle-proximity-${ proximity }` }>

						{ fields }

						<Input
							type="email"
							icon={ icon }
							label="johnsmith@email.com"
							property={ this.props.property ? this.props.property : '' }
						/>

						<Button
							label="Submit"
							property={ this.props.property ?
								'form-submit-' + this.props.property :
								''
							}
						/>

					</div>

				</div>

			</form>
		);
	}
}
