import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import PageHome from './page-home';
import PageOptin from './page-optins';
import PageInfo from './page-informational';
import Footer from './containers/footer';

export default class Main extends Component {
	render() {
		const Home = () => <PageHome />;
		const Optin = () => <PageOptin />;
		const Info = () => <PageInfo />;

		return (
			<Router>

				<div className="sui-wrap showcase-wrap">

					<nav className="showcase-nav">
						<ul>
							<li><NavLink to="/" exact activeClassName="current">Home</NavLink></li>
							<li><NavLink to="/optins/" activeClassName="current">Opt-ins</NavLink></li>
							<li><NavLink to="/informational/" activeClassName="current">Informational</NavLink></li>
						</ul>
					</nav>

					<Route path="/" exact component={ Home } />
					<Route path="/optins/" component={ Optin } />
					<Route path="/informational/" component={ Info } />

					<Footer />

				</div>

			</Router>
		);
	}
}
