import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
//user
import Profile from '../components/userManagement/UserProfile/Profile';
//purchase and sales
import Purchase from '../components/inventory/Purchase/Simple Purchase/Purchase';
import ServicePurchase from '../components/inventory/Purchase/ServicePurchase/ServicePurchase';
import PurchaseList from '../components/inventory/Purchase/PurchaseList';
import Sales from '../components/inventory/Sales/Sale/Sales';
import ServiceSale from '../components/inventory/Sales/SaleService/ServiceSale';
import SalesList from '../components/inventory/Sales/SalesList';
// customer and Supplier
import Supplier from '../components/inventory/Supplier/Supplier';
import SupplierList from '../components/inventory/Supplier/SupplierList/SupplierList';
import Customer from '../components/inventory/Customer/Customer';
import CustomerList from '../components/inventory/Customer/CustomerList/CustomerList';
//product
import Product from '../components/inventory/Product/Product';
import ProductList from '../components/inventory/Product/ProductList';
import ProductMovementOrder from '../components/inventory/Product/Product Stock Movement/Product Movement Order/ProductMovementOrder'
import ProductMovementOrderPlacedList from '../components/inventory/Product/Product Stock Movement/Product Movement Order/Product Movement Order List/ProductMovementOrderPlacedList'
import ProductMovementOrderReceivedList from '../components/inventory/Product/Product Stock Movement/Product Movement Order/Product Movement Order List/ProductMovementOrderReceivedList'
import StockAdjustment from '../components/inventory/StockAdjustment/StockAdjustment';
import StockAdjustmentList from '../components/inventory/StockAdjustment/StockAdjustmentList';
//accounts
import AccountList from '../components/inventory/Accounting/Accounts/AccountList';
import Account from '../components/inventory/Accounting/Accounts/Account';
import PurchaseInvoiceList from '../components/inventory/Accounting/Invoices/PurchaseInvoice/PurchaseInvoiceList';
import SalesInvoiceList from '../components/inventory/Accounting/Invoices/SalesInvoice/SalesInvoiceList'
import InternalProductMovementInvoiceList from '../components/inventory/Accounting/Invoices/Product Movement Invoice/Internal/InternalProductMovementInvoiceList'

//extras
import NotFound from '../components/main/NotFound';
import Dashboard from '../components/main/Dashboard/Dashboard';
import PublicDashboard from '../components/main/PublicComponentAndPages/PublicDashborad';
//referenceBoooks
import Brands from '../components/main/Reference Books/Brands';
import CarrierServices from '../components/main/Reference Books/CarrierServices';
import Categories from '../components/main/Reference Books/Categories';
import UnitOfMeasure from '../components/main/Reference Books/UnitOfMeasure';
import PaymentTerms from '../components/main/Reference Books/PaymentTerms';
import TaxRules from '../components/main/Reference Books/TaxRules';
import Locations from '../components/main/Reference Books/Locations';
import ReferenceBook from '../components/main/Reference Books/ReferenceBook';
import ProductStore from '../components/inventory/Product/Product Store/ProductStore';


export const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			{/* Public Routes */}
			<PublicRoute exact path="/" render={(props) => <PublicDashboard {...props} />} />

			{/* Private Routes */}
			<PrivateRoute exact path="/dashboard" render={(props) => <Dashboard />} />

			{/* supplier and Customer */}
			<PrivateRoute exact path="/supplier/" render={(props) => <Supplier {...props} />} />
			<PrivateRoute exact path="/supplierList" render={(props) => <SupplierList {...props} />} />
			<PrivateRoute exact path="/supplierList/:variableName" render={(props) => <Supplier {...props} />} />
			<PrivateRoute exact path="/customer" render={(props) => <Customer {...props} />} />
			<PrivateRoute exact path="/customerList" render={(props) => <CustomerList {...props} />} />
			<PrivateRoute exact path="/customerList/:variableName" render={(props) => <Customer {...props} />} />

			{/* Product */}
			<PrivateRoute exact path="/product" render={(props) => <Product {...props} />} />
			<PrivateRoute exact path="/productList" render={(props) => <ProductList {...props} />} />
			<PrivateRoute exact path="/product/:variableName" render={(props) => <Product {...props} />} />
			<PrivateRoute exact path="/stockAdjustment" render={(props) => <StockAdjustment {...props} />} />
			<PrivateRoute exact path="/stockAdjustmentList" render={(props) => <StockAdjustmentList {...props} />} />
			<PrivateRoute
				exact
				path="/stockAdjustmentList/:variableName"
				render={(props) => <StockAdjustment {...props} />}
			/>
			<PrivateRoute exact path="/productMovementOrder" render={(props) => <ProductMovementOrder {...props} />} />
			<PrivateRoute exact path="/productMovementOrder/:variableName" render={(props) => <ProductMovementOrder {...props} />} />
			<PrivateRoute exact path="/productMovementOrderList/orderPlcaed" render={(props) => <ProductMovementOrderPlacedList {...props} />} />
			<PrivateRoute exact path="/productMovementOrderList/orderReceived" render={(props) => <ProductMovementOrderReceivedList {...props} />} />

			
			{/* sales And Purchase */}
			<PrivateRoute exact path="/purchase" render={(props) => <Purchase {...props} />} />
			<PrivateRoute exact path="/purchaseList" render={(props) => <PurchaseList {...props} />} />
			<PrivateRoute exact path="/purchase/:variableName" render={(props) => <Purchase {...props} />} />
			<PrivateRoute exact path="/servicePurchase" render={(props) => <ServicePurchase {...props} />} />
			<PrivateRoute
				exact
				path="/servicePurchase/:variableName"
				render={(props) => <ServicePurchase {...props} />}
			/>
			<PrivateRoute exact path="/salesList" render={(props) => <SalesList {...props} />} />
			<PrivateRoute exact path="/sales" render={(props) => <Sales {...props} />} />
			<PrivateRoute exact path="/sales/:variableName" render={(props) => <Sales {...props} />} />
			<PrivateRoute exact path="/serviceSale" render={(props) => <ServiceSale {...props} />} />
			<PrivateRoute exact path="/serviceSale/:variableName" render={(props) => <ServiceSale {...props} />} />

			{/* accounts */}
			<PrivateRoute exact path="/accounts" render={(props) => <AccountList {...props} />} />
			<PrivateRoute exact path="/accounts/:variableName" render={(props) => <Account {...props} />} />
			<PrivateRoute exact path="/purchaseinvocies" render={(props) => <PurchaseInvoiceList {...props} />} />
			<PrivateRoute exact path="/salesinvocies" render={(props) => <SalesInvoiceList {...props} />} />
			<PrivateRoute exact path="/internalProductMovementInvocies" render={(props) => <InternalProductMovementInvoiceList {...props} />} />

			<PrivateRoute exact path="/brands" render={(props) => <Brands {...props} />} />
			<PrivateRoute exact path="/carrierServices" render={(props) => <CarrierServices {...props} />} />
			<PrivateRoute exact path="/productCategories" render={(props) => <Categories {...props} />} />
			<PrivateRoute exact path="/unitOfMeasure" render={(props) => <UnitOfMeasure {...props} />} />
			<PrivateRoute exact path="/paymentTerms" render={(props) => <PaymentTerms {...props} />} />
			<PrivateRoute exact path="/taxRules" render={(props) => <TaxRules {...props} />} />
			<PrivateRoute exact path="/locations" render={(props) => <Locations {...props} />} />
			<PrivateRoute exact path="/productStores" render={(props) => <ProductStore {...props} />} />
			<PrivateRoute exact path="/referenceBook" render={(props) => <ReferenceBook {...props} />} />

			{/* user management */}
			{/* <PrivateRoute exact path="/Users" render={(props) => <UserList {...props} />} /> */}
			<PrivateRoute exact path="/addNewUser" render={(props) => <Profile {...props} />} />
			<PrivateRoute exact path="/Users/:variableName" render={(props) => <Profile {...props} />} />
			{/* <PrivateRoute exact path="/user/:userId" render={(props) => <Profile {...props} />} /> */}

			{/* Page Not Found */}
			<Route exact path="*" render={(props) => <NotFound />} />
		</Switch>
	</BrowserRouter>
);
