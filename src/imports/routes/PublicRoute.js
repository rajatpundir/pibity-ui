import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/main/Header';
import styled from 'styled-components';
import MiniDrawer from '../components/main/nav2';
import Footer from '../components/main/Footer';
import SelectorganizationModal from '../components/main/SelectorganizationModal';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated ? (
				<Redirect to="/dashboard" />
			) : (
				<MainContainer>
					<MiniDrawer />
					<Body>
						{/* <Header/> */}
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
`;
