import React, { Component } from 'react';

import LayoutForm from '../layout-element/form';
import LayoutContent from '../layout-element/content';
import LayoutImage from '../layout-element/image';
import NeverSeeLink from '../never-see-link';

export default class LayoutFocusContent extends Component {
	render() {
		let renderContent = '';
		let renderSidebarLeft = '';
		let renderSidebarRight = '';

		const imagePosition = this.props.imagePosition ? this.props.imagePosition : 'left';

		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		const renderSidebar = (
			<div className="hustle-layout-sidebar">

				<LayoutImage
					image={ this.props.image ? this.props.image : '' }
					imageFit={ this.props.imageFit ? this.props.imageFit : 'none' }
					imagePosX={ this.props.imagePosX ? this.props.imagePosX : 'center' }
					imagePosY={ this.props.imagePosY ? this.props.imagePosY : 'center' }
				/>

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

			</div>
		);

		if (
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {
			renderContent = (
				<div className="hustle-layout-content">

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
			renderSidebarLeft = renderSidebar;
		}

		if ( 'right' === imagePosition || 'below' === imagePosition ) {
			renderSidebarRight = renderSidebar;
		}

		return (
			<div className="hustle-layout">

				<div className="hustle-layout-body">

					{ renderSidebarLeft }

					{ renderContent }

					{ renderSidebarRight }

				</div>

				<NeverSeeLink
					type={ this.props.type ? this.props.type : '' }
					NeverSeeLink={ this.props.neverSeeLink ? this.props.neverSeeLink : '' }
				/>

			</div>
		);
	}
}
