import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setTokenForAxios } from '../redux/actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'
import NotFound from '../components/main/NotFound';
import Dashboard from '../components/main/Dashboard/Dashboard';
import ManageUsers from '../components/accounts/ManageUsers';
import Profile from '../components/accounts/Profile';
import Product from '../components/inventory/Product/Product';
import Supplier from '../components/inventory/Supplier/Supplier';
import Purchase from '../components/inventory/Purchase/Purchase';
import Customer from '../components/inventory/Customer/Customer';
import CustomerList from '../components/inventory/Customer/CustomerList';
import ProductList from '../components/inventory/Product/ProductList';
import PurchaseList from '../components/inventory/Purchase/PurchaseList';
import SupplierList from '../components/inventory/Supplier/SupplierList';
import StockAdjustment from '../components/inventory/StockAdjustment/StockAdjustment';
import StockAdjustmentList from '../components/inventory/StockAdjustment/StockAdjustmentList';
import Invoice from '../components/inventory/Accounting/Invoice/Invoice';
import Quotes from '../components/inventory/Accounting/Quotes/Quotes';
import Bill from '../components/inventory/Accounting/Bill/Bill';
import CreditNote from '../components/inventory/Accounting/CreditNote/CreditNote';
import PurchaseOrder from '../components/inventory/Accounting/PurchaseOrder/PurchaseOrder'

export const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			{/* Public Routes */}
			<PublicRoute exact path="/" render={(props) => <ManageUsers {...props} />}/>
			{/* Private Routes */}
			<PrivateRoute exact path="/dashboard" render={(props) => <Dashboard />} />
			<PrivateRoute exact path="/product" render={(props) => <Product {...props} />} />
			<PrivateRoute exact path="/productList" render={(props) => <ProductList {...props} />} />
			<PrivateRoute exact path="/product/:variableName" render={(props) => <Product {...props} />} />
			<PrivateRoute exact path="/supplier/" render={(props) => <Supplier {...props} />} />
			<PrivateRoute exact path="/supplierList" render={(props) => <SupplierList {...props} />} />
			<PrivateRoute exact path="/supplier/:variableName" render={(props) => <Supplier {...props} />} />
			<PrivateRoute exact path="/purchase" render={(props) => <Purchase {...props} />} />
			<PrivateRoute exact path="/purchaseList" render={(props) => <PurchaseList {...props} />} />
			<PrivateRoute exact path="/purchase/:variableName" render={(props) => <Purchase {...props} />} />
			<PrivateRoute exact path="/customer" render={(props) => <Customer {...props} />} />
			<PrivateRoute exact path="/customerList" render={(props) => <CustomerList {...props} />} />
			<PrivateRoute exact path="/customerList/:variableName" render={(props) => <Customer {...props} />} />
			<PrivateRoute exact path="/stockAdjustment" render={(props) => <StockAdjustment {...props} />} />
			<PrivateRoute exact path="/stockAdjustmentList" render={(props) => <StockAdjustmentList {...props} />} />
			<PrivateRoute exact path="/Invoice" render={(props) => <Invoice {...props} />} />
			<PrivateRoute exact path="/Quotes" render={(props) => <Quotes {...props} />} />
			<PrivateRoute exact path="/Bill" render={(props) => <Bill {...props} />} />
			<PrivateRoute exact path="/PurchaseOrder" render={(props) => <PurchaseOrder {...props} />} />
			<PrivateRoute exact path="/CreditNote" render={(props) => <CreditNote {...props} />} />
			<PrivateRoute exact path="/stockAdjustmentList/:variableName" render={(props) => <StockAdjustment {...props} />} />
			<PrivateRoute exact path="/addNewUser" render={(props) => <Profile {...props} />} />
			{/* <PrivateRoute exact path="/users" render={(props) => <UserList {...props} />} /> */}
			<PrivateRoute exact path="/users/:variableName" render={(props) => <Profile {...props} />} />
			<PrivateRoute exact path="/user/:userId" render={(props) => <Profile {...props} />} />
			{/* Page Not Found */}
			<Route exact path="*" render={(props) => <NotFound />} />
		</Switch>
	</BrowserRouter>
);
