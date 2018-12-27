import React, { Component } from 'react';

import LayoutForm from '../layout-element/form';
import LayoutContent from '../layout-element/content';
import LayoutImage from '../layout-element/image';
import NeverSeeLink from '../never-see-link';

export default class LayoutFocusOptin extends Component {
	render() {
		let renderContent = '';
		let renderContentLeft = '';
		let renderContentRight = '';

		const imagePosition = this.props.imagePosition ? this.props.imagePosition : 'left';
		const imagePosClass = 'hustle-layout-position--' + imagePosition;

		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		if (
			'' !== this.props.image ||
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {
			renderContent = (
				<div className="hustle-layout-content">

					<LayoutImage
						image={ this.props.image ? this.props.image : '' }
						imageFit={ this.props.imageFit ? this.props.imageFit : 'none' }
						imagePosX={ this.props.imagePosX ? this.props.imagePosX : 'center' }
						imagePosY={ this.props.imagePosY ? this.props.imagePosY : 'center' }
					/>

					<LayoutContent
						title={ this.props.title ? this.props.title : '' }
						subtitle={ this.props.subtitle ? this.props.subtitle : '' }
						content={ this.props.content ? this.props.content : '' }
						ctaButton={ this.props.ctaButton ? this.props.ctaButton : '' }
					/>

				</div>
			);
		}

		if ( 'left' === imagePosition || 'above' === imagePosition ) {
			renderContentLeft = renderContent;
		}

		if ( 'right' === imagePosition || 'below' === imagePosition ) {
			renderContentRight = renderContent;
		}

		return (
			<div className="hustle-layout">

				<div className={ `hustle-layout-body ${ imagePosClass }` }>

					{ renderContentLeft }

					<LayoutForm
						moduleId={ this.props.moduleId ? this.props.moduleId : '' }
						icon={ this.props.fieldsIcon ? this.props.fieldsIcon : '' }
						proximity={ this.props.fieldsProximity ? this.props.fieldsProximity : '' }
						fieldsGdpr={ this.props.fieldsGdpr ? this.props.fieldsGdpr : '' }
						formOptions={ this.props.formOptions ? this.props.formOptions : '' }
						optionsLabel={ this.props.optionsLabel ? this.props.optionsLabel : '' }
					>

						{ formFields }

					</LayoutForm>

					{ renderContentRight }

				</div>

				<NeverSeeLink
					type={ this.props.type ? this.props.type : '' }
					NeverSeeLink={ this.props.neverSeeLink ? this.props.neverSeeLink : '' }
				/>

			</div>
		);
	}
}
