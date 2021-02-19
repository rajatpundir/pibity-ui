import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import {
	createVariable,
	getVariables,
	getVariable,
	updateVariable,
	objToMapRec,
	mapToObjectRec
} from '../../../../redux/actions/variables';
import PurchaseGeneralDetails from './PurchaseGeneralDetails';
import PurchaseOrderDetails from './PurchaseOrderDetails';
import PurchaseInvoiceDetails from './PurchaseInvoiceDetails';
import PurchasStockReceived from './PurchaseStockReceived';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import CheckIcon from '@material-ui/icons/Check';
import {
	Container,
	PageWrapper,
	PageBody,
	SaveButtonContaier,
	SaveButton,
	HorizontalListPageBlock,
	HorizontalBlockListOuter,
	HorizontalBlockListInnerWrapper,
	HoizontalBlockList,
	HoizontalBlockListItems,
	BlockListItemButton
} from '../../../../styles/inventory/Style';

class Purchase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			createPurchaseOrder: true,
			createPo: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Purchase' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[
							'general',
							new Map([
								[ 'variableName', '' ],
								[
									'values',
									new Map([
										[ 'supplierName', '' ],
										[ 'term', '' ],
										[ 'taxRule', '' ],
										[ 'date', '' ],
										[ 'account', '1' ],
										[ 'contact', new Map([ [ 'context', '' ], [ 'variableName', '' ] ]) ],
										[ 'phone', '' ],
										[ 'shippingAddress1', '' ],
										[ 'shippingAddress2', '' ],
										[ 'location', '' ],
										[ 'address', new Map([ [ 'context', '' ], [ 'variableName', '' ] ]) ],
										[ 'requiredBy', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[ 'orderCreated', false ],
						[ 'invoiceCreated', false ],
						[ 'orderType', 'Simple' ]
					])
				]
			]),
			visibleSection: 'order',
			purchaseOrderVariableName: '',
			supplier: '',
			account: '',
			purchaseOrder: new Map([
				[ 'typeName', 'PurchaseOrder' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'purchase', '' ],
						[ 'date', '' ],
						[ 'orderNumber', '' ],
						[ 'location', 'Offsite Storage' ],
						[ 'total', 0 ],
						[ 'purchaseOrderMemo', '' ],
						[ 'supplier', '' ],
						[ 'productCostBeforeTax', 0 ],
						[ 'additionalCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ],
						[ 'totalTaxOnAdditionalCost', 0 ]
					])
				]
			]),
			purchaseOrderItems: [],
			purchaseOrderServiceItems: [],
			supplierAddress: new Map([
				[ 'variableName', '' ],
				[ 'values', new Map([ [ 'line1', '' ], [ 'line2', '' ] ]) ]
			]),
			supplierContact: new Map([
				[ 'variableName', '' ],
				[ 'values', new Map([ [ 'name', '' ], [ 'phone', '' ] ]) ]
			])
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.updateStock = this.updateStock.bind(this);
		this.onCalculateTotal = this.onCalculateTotal.bind(this);
		this.updatePurchaseOrderServiceItems = this.updatePurchaseOrderServiceItems.bind(this);
		this.updatePurchaseOrderItems = this.updatePurchaseOrderItems.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Purchase');
		this.props.getVariables('Supplier');
		this.props.getVariables('Account');
		this.props.getVariables('Location');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('TaxRule');
		this.props.getVariables('Product');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('ProductSupplier');
		this.props.getVariables('PurchaseOrder');
		this.props.getVariables('PurchaseOrderItem');
		this.props.getVariables('PurchaseOrderServiceItem');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName);
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			this.props.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName);
		}
		this.getData();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.Purchase &&
			nextProps.variables.PurchaseOrder &&
			nextProps.variables.PurchaseOrderItem &&
			nextProps.variables.PurchaseOrderServiceItem &&
			nextProps.variables.Supplier
		) {
			const variable = nextProps.variables.PurchaseOrder.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const supplier = nextProps.variables.Supplier.filter(
					(supplier) => supplier.variableName === variable.values.general.values.supplierName
				)[0];
				const address = objToMapRec(supplier.values.addresses[0]);
				const contact = objToMapRec(supplier.values.contacts[0]);
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				const purchaseOrder = nextProps.variables.SalesOrder.filter(
					(order) => order.values.sales === variable.variableName
				)[0];
				const purchaseOrderItems =
					purchaseOrder !== undefined
						? nextProps.variables.PurchaseOrderItem
								.filter(
									(item) =>
										item.values.purchaseOrder === purchaseOrder.variableName &&
										item.values.purchase === variable.variableName
								)
								.map((item) => {
									return objToMapRec(item);
								})
						: [];
				const purchaseOrderServiceItems =
					purchaseOrder !== undefined
						? nextProps.variables.SalesOrderServiceItem
								.filter(
									(serviceItem) =>
										serviceItem.values.purchaseOrder === purchaseOrder.variableName &&
										serviceItem.values.purchase === variable.variableName
								)
								.map((item) => {
									return objToMapRec(item);
								})
						: [];
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					supplierAddress: address,
					supplierContact: contact,
					createPo: false,
					purchaseOrderVariableName: variable.variableName,
					supplier: variable.values.general.values.supplierName,
					account: variable.values.general.values.account,
					purchaseOrder: purchaseOrder ? purchaseOrder : prevState.purchaseOrder,
					purchaseOrderServiceItems: purchaseOrder
						? purchaseOrderServiceItems
						: prevState.purchaseOrderServiceItems,
					purchaseOrderItems: purchaseOrder ? purchaseOrderItems : prevState.purchaseOrderItems
				};
			}
		}
		return prevState;
	}

	checkRequiredField(variable) {
		if (variable.get('values').get('supplierName') === '') {
			customErrorMessage('Supplier Name  is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('location') === '') {
			customErrorMessage(' Location is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('term') === '') {
			customErrorMessage(' Term is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('taxRule') === '') {
			customErrorMessage(' Tax Rule is missing');
			this.setState({ createPurchaseOrder: false });
		}
	}

	updateDetails(details, address, contact) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		this.setState({ variable: variable, supplierAddress: address, supplierContact: contact });
	}

	updateOrder(purchaseOrder) {
		this.setState({ purchaseOrder }, () => this.onCalculateTotal());
	}

	updatePurchaseOrderItems(purchaseOrderItems) {
		this.setState({ purchaseOrderItems });
	}

	updatePurchaseOrderServiceItems(purchaseOrderServiceItems) {
		this.setState({ purchaseOrderServiceItems });
	}

	updateStock(productStock) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('stockReceived', productStock);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	onCalculateTotal() {
		var productCostBeforeTax = 0;
		var totalTaxOnProduct = 0;
		var additionalCostBeforeTax = 0;
		var totalTaxOnAdditionalCost = 0;
		// Product Cost
		this.state.purchaseOrderItems.forEach((listVariable) => {
			const taxRule = this.props.variables.TaxRule.filter(
				(taxRule) => taxRule.variableName === listVariable.get('values').get('taxRule')
			)[0];
			if (taxRule) {
				switch (taxRule.values.taxType) {
					case 'Exclusive':
						totalTaxOnProduct =
							totalTaxOnProduct +
							listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total');
						break;
					case 'Inclusive':
						const tax = listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalTaxOnProduct = totalTaxOnProduct + tax;
						productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total') - tax;
						break;
					default:
						break;
				}
			} else {
				productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total');
			}
		});
		//AdditionalCost
		this.state.purchaseOrderServiceItems.forEach((listVariable) => {
			const taxRule = this.props.variables.TaxRule.filter(
				(taxRule) => taxRule.variableName === listVariable.get('values').get('taxRule')
			)[0];
			if (taxRule) {
				switch (taxRule.values.taxType) {
					case 'Exclusive':
						totalTaxOnAdditionalCost =
							totalTaxOnAdditionalCost +
							listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						additionalCostBeforeTax = additionalCostBeforeTax + listVariable.get('values').get('total');
						break;
					case 'Inclusive':
						const tax = listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalTaxOnAdditionalCost = totalTaxOnAdditionalCost + tax;
						additionalCostBeforeTax =
							additionalCostBeforeTax + listVariable.get('values').get('total') - tax;
						break;
					default:
						break;
				}
			} else {
				additionalCostBeforeTax = additionalCostBeforeTax + listVariable.get('values').get('total');
			}
		});
		const totalCost = productCostBeforeTax + totalTaxOnProduct + additionalCostBeforeTax + totalTaxOnAdditionalCost;
		const purchaseOrder = cloneDeep(this.state.purchaseOrder);
		const orderValues = purchaseOrder.get('values');
		orderValues.set('total', totalCost);
		orderValues.set('productCostBeforeTax', productCostBeforeTax);
		orderValues.set('totalTaxOnProduct', totalTaxOnProduct);
		orderValues.set('additionalCostBeforeTax', additionalCostBeforeTax);
		orderValues.set('totalTaxOnAdditionalCost', totalTaxOnAdditionalCost);
		this.setState({ purchaseOrder });
	}

	render() {
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={3} />
				<PageWrapper>
					<PageBody>
						{this.state.createPo ? (
							<SaveButtonContaier>
								<SaveButton
									onClick={(e) => {
										if (this.props.match.params.variableName) {
											this.props
												.updateVariable(this.state.prevVariable, this.state.variable)
												.then((status) => {
													if (status === 200) {
														successMessage(`Updated Succesfully`);
													}
												});
										} else {
											new Promise((resolve) => {
												resolve(
													this.checkRequiredField(
														this.state.variable.get('values').get('general')
													)
												);
											}).then(() => {
												if (this.state.createPurchaseOrder) {
													this.props.createVariable(this.state.variable).then((response) => {
														if (response.status === 200) {
															this.setState({
																createPo: false,
																purchaseOrderVariableName: response.data.variableName,
																supplier:
																	response.data.values.general.values.supplierName,
																account: response.data.values.general.values.account,
																orderDetails: response.data.values.orderDetails[0]
															});
															successMessage(' Purchase Order Created');
														}
													});
												}
												this.setState({ createPurchaseOrder: true });
											});
										}
									}}
								>
									<CheckIcon />
								</SaveButton>
							</SaveButtonContaier>
						) : (
							undefined
						)}
						<PurchaseGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							address={this.state.supplierAddress}
							contact={this.state.supplierContact}
							updateDetails={this.updateDetails}
							creatable={!this.state.createPo}
						/>
						<HorizontalListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList style={{ justifyContent: 'space-evenly' }}>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'order' });
												}}
											>
												Order
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												style={{
													opacity: this.state.createPo ? '0.5' : '1',
													pointerEvents: this.state.createPo ? 'none' : 'all'
												}}
												onClick={(e) =>
													this.state.createPo
														? undefined
														: this.setState({ visibleSection: 'invoice' })}
											>
												Invoice
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												// style={{
												// 	opacity: this.state.variable.get('values').get('invoiceCreated')
												// 		? '1'
												// 		: '0.5',
												// 	pointerEvents: this.state.variable
												// 		.get('values')
												// 		.get('invoiceCreated')
												// 		? 'all'
												// 		: 'none'
												// }}
												onClick={(e) => this.setState({ visibleSection: 'stockReceived' })}
												// this.state.variable.get('values').get('invoiceCreated')
												// 	? this.setState({ visibleSection: 'stockReceived' })
												// 	: undefined}
											>
												Stock Received
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'order' && (
							<PurchaseOrderDetails
								variable={this.state.purchaseOrder}
								purchaseOrderItems={this.state.purchaseOrderItems}
								purchaseOrderServiceItems={this.state.purchaseOrderServiceItems}
								updateOrder={this.updateOrder}
								updatePurchaseOrderItems={this.updatePurchaseOrderItems}
								updatePurchaseOrderServiceItems={this.updatePurchaseOrderServiceItems}
								supplier={this.state.variable
									.get('values')
									.get('general')
									.get('values')
									.get('supplierName')}
							/>
						)}
						{this.state.visibleSection === 'invoice' && (
							<PurchaseInvoiceDetails
								purchase={this.state.purchaseOrderVariableName}
								supplier={this.state.supplier}
								account={this.state.account}
								purchaseOrder={mapToObjectRec(this.state.purchaseOrder)}
								purchaseOrderItems={this.state.purchaseOrderItems}
								purchaseOrderServiceItems={this.state.purchaseOrderServiceItems}
								location={this.state.variable
									.get('values')
									.get('general')
									.get('values')
									.get('location')}
							/>
						)}
						{this.state.visibleSection === 'stockReceived' && (
							<PurchasStockReceived
								purchase={this.state.purchaseOrderVariableName}
								supplier={this.state.supplier}
								location={this.state.variable
									.get('values')
									.get('general')
									.get('values')
									.get('location')}
							/>
						)}
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, {
	clearErrors,
	createVariable,
	getVariable,
	getVariables,
	updateVariable
})(Purchase);
