import React, { Component } from 'react';
import Checkbox from '../../../components/checkbox';

export default class OptionsGroup extends Component {
	render() {
		let groupTitle = '';
		let renderComponent = '';

		if ( this.props.label && '' !== this.props.label ) {
			groupTitle = (
				<span className="hustle-group-title">{ this.props.label }</span>
			);
		}

		if ( this.props.formOptions && 'checkbox' === this.props.formOptions ) {
			renderComponent = (
				<div className="hustle-form-options">
					{ groupTitle }
					<Checkbox
						label="Option 1"
						extraClass="hustle-checkbox-inline"
						property={ `hustle-module-${ this.props.moduleId }-option-1` }
					/>
					<Checkbox
						label="Option 2"
						extraClass="hustle-checkbox-inline"
						property={ `hustle-module-${ this.props.moduleId }-option-2` }
					/>
					<Checkbox
						label="Option 3"
						extraClass="hustle-checkbox-inline"
						property={ `hustle-module-${ this.props.moduleId }-option-3` }
					/>
				</div>
			);
		}

		return renderComponent;
	}
}
