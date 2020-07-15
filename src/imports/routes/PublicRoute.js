import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated ? (
				<Redirect to="/dashboard" />
			) : (
				<div>
					<Component {...props} />
				</div>
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
