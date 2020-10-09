import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setTokenForAxios } from '../redux/actions/auth';
import PublicRoute from './PublicRoute';

import LogIn from '../components/main/LogIn';
import SignUp from '../components/main/SignUp';
import NotFound from '../components/main/NotFound';
import Dashboard from '../components/main/Dashboard';
// import Users from '../components/accounts/Users';
// import Profile from '../components/accounts/Profile';
import Product from '../components/inventory/Product/Product';
import Supplier from '../components/inventory/Supplier/Supplier';
import Purchase from '../components/inventory/Purchase/Purchase';
import Customer from '../components/inventory/Customer/Customer';
import CustomerList from '../components/inventory/Customer/CustomerList';
import ProductList from '../components/inventory/Product/ProductList';
import PurchaseList from '../components/inventory/Purchase/PurchaseList';
import SupplierList from '../components/inventory/Supplier/SupplierList';

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
			<PublicRoute exact path="/" render={(props) => <Dashboard />} />
			<PublicRoute exact path="/login" render={(props) => <LogIn />} />
			<PublicRoute exact path="/signup" render={(props) => <SignUp />} />
			<PublicRoute exact path="/product" render={(props) => <Product {...props} />} />
			<PublicRoute exact path="/productList" render={(props) => <ProductList {...props} />} />
			<PublicRoute exact path="/product/:variableName" render={(props) => <Product {...props} />} />
			<PublicRoute exact path="/supplier/" render={(props) => <Supplier {...props} />} />
			<PublicRoute exact path="/supplierList" render={(props) => <SupplierList {...props} />} />
			<PublicRoute exact path="/supplier/:variableName" render={(props) => <Supplier {...props} />} />
			<PublicRoute exact path="/purchase" render={(props) => <Purchase {...props} />} />
			<PublicRoute exact path="/purchaseList" render={(props) => <PurchaseList {...props} />} />
			<PublicRoute exact path="/purchase/:variableName" render={(props) => <Purchase {...props} />} />
			<PublicRoute exact path="/customer" render={(props) => <Customer {...props} />} />
			<PublicRoute exact path="/customerList" render={(props) => <CustomerList {...props} />} />
			<PublicRoute exact path="/customerList/:variableName" render={(props) => <Customer {...props} />} />
			{/* Page Not Found */}
			<Route exact path="*" render={(props) => <NotFound />} />
		</Switch>
	</BrowserRouter>
);
