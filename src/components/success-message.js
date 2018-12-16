import React, { Component } from 'react';

export default class Success extends Component {
	render() {
		return (
			<div
				className="hustle-success"
				style={{ display: 'none' }}
			>

				<i className="hustle-icon-check" aria-hidden="true"></i>

				<div className="hustle-success-content">

					<p>
						Maecenas sed diam eget risus varius blandit sit amet non magna. 
						Donec id elit non mi porta gravida at eget metus. Maecenas faucibus 
						mollis interdum. Integer posuere erat a ante venenatis dapibus 
						posuere velit aliquet.
					</p>

					<p>
						Curabitur blandit tempus porttitor. Maecenas faucibus mollis 
						interdum. Donec sed odio dui. Cum sociis natoque penatibus et 
						magnis dis parturient montes, nascetur ridiculus mus.
					</p>

				</div>

			</div>
		);
	}
}
