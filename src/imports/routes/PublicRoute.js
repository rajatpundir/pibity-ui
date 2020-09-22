import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Navigator from '../components/main/Navigator';
import styled from 'styled-components';
import MiniDrawer from '../components/main/nav2';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated ? (
				<Redirect to="/dashboard" />
			) : (
				<MainContainer>
					<MiniDrawer />
					<Component {...props} />
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

const MainContainer = styled.div`
display: flex;`;
