import React, { Component } from 'react';

import OptinEmbedded from './page-home/optin-embedded';
import OptinSlidein from './page-home/optin-slidein';
import OptinPopup from './page-home/optin-popup';
import InfoPopup from './page-home/info-popup';
import InfoSlidein from './page-home/info-slidein';
import InfoEmbedded from './page-home/info-embedded';

export default class PageHome extends Component {
	render() {
		return (
			<React.Fragment>

				<div className="showcase-content">

					<h1>Hustle UI</h1>

					<p>Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

					<p>Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui.</p>

					<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>

					<p>Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue.</p>

					<p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

					<OptinEmbedded
						property="10"
						layout="default"
						palette="gray-slate"
						intro="slideInUp"
					/>

					<InfoEmbedded
						property="20"
						layout="default"
						palette="sunrise"
						intro="rollIn"
					/>

					<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo.</p>

					<p>Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

					<p>Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>

				</div>

				<OptinPopup
					property="11"
					layout="compact"
					palette="ectoplasm"
					intro="rollIn"
					outro="fadeOutDown"
					delay="1000"
					overlayCanClose
				/>

				<OptinSlidein
					property="12"
					layout="focus-optin"
					palette="midnight"
					position="se"
					delay="1000"
				/>

				<InfoPopup
					property="21"
					layout="stacked"
					palette="gray-slate"
					intro="newspaperIn"
					outro="rollOut"
					delay="1000"
				/>

				<InfoSlidein
					property="22"
					layout="default"
					palette="ectoplasm"
					position="sw"
					delay="1000"
				/>

			</React.Fragment>
		);
	}
}
