import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/main/Header';
import styled from 'styled-components';
import MiniDrawer from '../components/navigation/Navigation';
import Footer from '../components/main/Footer';
import { login } from './Keycloak';

export const PrivateRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			true ? (
				<MainContainer>
					<MiniDrawer keycloak={props.keycloak} />
					<Body>
						<Header match={props.match} />
						<Component {...props} />
						<Footer />
					</Body>
				</MainContainer>
			) : (
				login()
			)}
	/>
);

PrivateRoute.prototype = {
	isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);

const MainContainer = styled.div`display: flex;`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
