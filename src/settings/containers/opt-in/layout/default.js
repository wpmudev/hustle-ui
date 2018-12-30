import React, { Component } from 'react';

import LayoutForm from '../layout-element/form';
import LayoutContent from '../layout-element/content';
import LayoutImage from '../layout-element/image';
import NeverSeeLink from '../never-see-link';

export default class LayoutDefault extends Component {
	render() {
		const imagePosition = this.props.imagePosition ? this.props.imagePosition : 'left';
		const imagePosClass = 'hustle-layout-position--' + imagePosition;

		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		const renderImage = (
			<LayoutImage
				image={ this.props.image ? this.props.image : '' }
				imageFit={ this.props.imageFit ? this.props.imageFit : 'none' }
				imagePosX={ this.props.imagePosX ? this.props.imagePosX : 'center' }
				imagePosY={ this.props.imagePosY ? this.props.imagePosY : 'center' }
			/>
		);

		let renderContent = '';
		let renderLeftImage = '';
		let renderRightImage = '';

		if ( 'left' === imagePosition || 'above' === imagePosition ) {
			renderLeftImage = renderImage;
		}

		if ( 'right' === imagePosition || 'below' === imagePosition ) {
			renderRightImage = renderImage;
		}

		if (
			'' !== this.props.image ||
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {
			renderContent = (
				<div className={ `hustle-layout-content ${ imagePosClass }` }>

					{ renderLeftImage }

					<LayoutContent
						title={ this.props.title ? this.props.title : '' }
						subtitle={ this.props.subtitle ? this.props.subtitle : '' }
						content={ this.props.content ? this.props.content : '' }
						ctaButton={ this.props.ctaButton ? this.props.ctaButton : '' }
					/>

					{ renderRightImage }

				</div>
			);
		}

		return (
			<div className="hustle-layout">

				<div className="hustle-layout-body">

					{ renderContent }

					<LayoutForm
						moduleId={ this.props.moduleId ? this.props.moduleId : '' }
						icon={ this.props.fieldsIcon ? this.props.fieldsIcon : '' }
						proximity={ this.props.fieldsProximity ? this.props.fieldsProximity : '' }
						fieldsGdpr={ this.props.fieldsGdpr ? this.props.fieldsGdpr : '' }
						formOptions={ this.props.formOptions ? this.props.formOptions : '' }
						optionsLabel={ this.props.optionsLabel ? this.props.optionsLabel : '' }
						fieldsInline="true"
					>

						{ formFields }

					</LayoutForm>

				</div>

				<NeverSeeLink
					type={ this.props.type ? this.props.type : '' }
					NeverSeeLink={ this.props.neverSeeLink ? this.props.neverSeeLink : '' }
				/>

			</div>
		);
	}
}
