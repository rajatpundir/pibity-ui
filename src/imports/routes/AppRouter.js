import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { setTokenForAxios } from '../redux/actions/auth';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import LogIn from '../components/main/LogIn';
import SignUp from '../components/main/SignUp';
import NotFound from '../components/main/NotFound';
import Dashboard from '../components/main/Dashboard';
import Users from '../components/accounts/Users';
import Profile from '../components/accounts/Profile';
import Categories from '../components/inventory/categories/Categories';
import Product from "../components/inventory/Product"
import Supplier from '../components/inventory/Supplier/Supplier';
import Purchase from '../components/inventory/Purchase';
import Customer from '../components/inventory/Customer/Customer';

// Set token for Axios requests
if (localStorage.getItem('jwtToken')) {
	setTokenForAxios(localStorage.getItem('jwtToken'));
}

// Validate token, if present in LocalStorage
function validateToken() {
	const token = localStorage.getItem('jwtToken');
	if (token) {
		const data = jwt_decode(token);
		const current_time = Math.floor(Date.now() / 1000);
		const expiry_time = data.exp;
		if (current_time > expiry_time) {
			localStorage.removeItem('jwtToken');
			window.location.reload();
		}
	}
}
setInterval(validateToken, 1000);

export const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			{/* Public Routes */}
			<PublicRoute exact path="/" render={(props) => <LogIn />} />
			<PublicRoute exact path="/login" render={(props) => <LogIn />} />
			<PublicRoute exact path="/signup" render={(props) => <SignUp />} />
			<PublicRoute exact path="/product" render={(props) => <Product/>} />
			<PublicRoute exact path="/supplier" render={(props) => <Supplier/>} />
			<PublicRoute exact path="/purchase" render={(props) => <Purchase/>} />
			<PublicRoute exact path="/customer" render={(props) => <Customer/>} />


			{/* Private Routes */}
			<PrivateRoute exact path="/dashboard" render={(props) => <Dashboard />} />
			<PrivateRoute exact path="/users" render={(props) => <Users />} />
			<PrivateRoute exact path="/profile" render={(props) => <Profile />} />
			<PrivateRoute exact path="/inventory/categories" render={(props) => <Categories />} />
			<PrivateRoute exact path="/inventory/createProduct" render={(props) => <Product />} />
			<PrivateRoute exact path="/inventory/createSupplier" render={(props) => <Supplier />} />
			<PrivateRoute exact path="/inventory/simplePurchase" render={(props) => <Purchase />} />

			{/* Page Not Found */}
			<Route exact path="*" render={(props) => <NotFound />} />
		</Switch>
	</BrowserRouter>
);
