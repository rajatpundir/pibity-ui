import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from '../components/main/PublicComponentAndPages/Naviagtion/Navigation';
import PublicFooterComponent from '../components/main/PublicComponentAndPages/Footer';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			<MainContainer>
				<Body>
					<Navigation />
					<Component {...props} />
					<PublicFooterComponent />
				</Body>
			</MainContainer>
		)}
	/>
);

PublicRoute.prototype = {
	isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);

const MainContainer = styled.div`display: flex;`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: white;
`;
