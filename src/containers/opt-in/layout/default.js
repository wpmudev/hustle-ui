import React, { Component } from 'react';

import LayoutImage from '../layout-parts/image';
import LayoutContent from '../layout-parts/content';
import LayoutForm from '../layout-parts/form';
import NeverSeeLink from '../nsa-link';

export default class LayoutDefault extends Component {
	render() {
		const formFields = React.Children.map(
			this.props.children,
			child => {
				return child;
			}
		);

		let layoutContent = '';
		const imagePosition = this.props.position ? this.props.position : 'left';

		if (
			'' !== this.props.image ||
			'' !== this.props.title ||
			'' !== this.props.subtitle ||
			'' !== this.props.content ||
			'' !== this.props.ctaButton
		) {
			layoutContent = (
				<div className={ `hustle-layout-content hustle-layout-position--${ imagePosition }` }>

					<LayoutImage
						image={ this.props.image ? this.props.image : '' }
						position={ this.props.position ? this.props.position : 'left' }
						positionX={ this.props.positionX ? this.props.positionX : 'left' }
						positionY={ this.props.positionY ? this.props.positionY : 'top' }
					/>

					<LayoutContent
						title={ this.props.title ? this.props.title : '' }
						subtitle={ this.props.subtitle ? this.props.subtitle : '' }
						content={ this.props.content ? this.props.content : '' }
					/>

				</div>
			);
		}

		return (
			<div className="hustle-layout">

				<div className="hustle-layout-body">

					{ layoutContent }

					<LayoutForm
						property={ this.props.property ? this.props.property : '' }
						fieldsIcon={ this.props.fieldsIcon ? this.props.fieldsIcon : '' }
						fieldsProximity={ this.props.fieldsProximity ? this.props.fieldsProximity : 'joined' }
					>

						{ formFields }

					</LayoutForm>

				</div>

				<NeverSeeLink
					type={ this.props.type ? this.props.type : '' }
					nsaLink={ this.props.nsaLink ? this.props.nsaLink : '' }
				/>

			</div>
		);
	}
}
