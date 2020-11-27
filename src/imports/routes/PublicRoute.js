import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/main/Header';
import styled from 'styled-components';
import MiniDrawer from '../components/navigation/Navigation';
import Footer from '../components/main/Footer';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			<MainContainer>
				<MiniDrawer keycloak={props.keycloak} />
				<Body>
					<Component {...props} />
					<Footer />
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
`;
