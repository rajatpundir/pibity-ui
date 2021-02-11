import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import {
	createVariable,
	addKeyToList,
	getVariables,
	getVariable,
	updateVariable,
	objToMapRec,
	createVariables
} from '../../../../redux/actions/variables';
import SalesGeneralDetails from './SalesGeneralDetails';
import SalesQuotaton from './SalesQuotation';
import SimpleSalesOrder from './SimpleSalesOrder';
import SimpleSalesInvoice from './SimpleSalesInvoice';
import SalesStockSoldRecord from './SalesStockSoldRecord';
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

class SimpleSale extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			createSalesOrder: true,
			createPo: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Sales' ],
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
										[ 'CustomerName', '' ],
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
						[ 'invoiceCreated', false ],
						[ 'orderType', 'Simple' ],
						[ 'orderStatus', 'Quotation Created' ]
					])
				]
			]),
			salesQuotatuionVariableName: '',
			salesQuotation: new Map([
				[ 'typeName', 'SalesQuotation' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'date', '' ],
						[ 'quotationNumber', '' ],
						[ 'total', 0 ],
						[ 'salesOrder', '' ],
						[ 'customer', '' ],
						[ 'productCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ]
					])
				]
			]),
			salesOrder: {},
			salesOrderItems: [],
			salesOrderServiceItem: [],
			salesQuotationItems: [],
			visibleSection: 'quotation',
			salesVariableName: '',
			customer: '',
			account: '',
			customerAddress: new Map([
				[ 'variableName', '' ],
				[ 'values', new Map([ [ 'line1', '' ], [ 'line2', '' ] ]) ]
			]),
			customerContact: new Map([
				[ 'variableName', '' ],
				[ 'values', new Map([ [ 'name', '' ], [ 'phone', '' ] ]) ]
			]),
			orderDetails: new Map([
				[ 'variableName', '0' ],
				[
					'values',
					new Map([
						[ 'additionalCost', [] ],
						[ 'productInvoiceDetails', [] ],
						[ 'customerDeposit', [] ],
						[ 'total', 0 ],
						[ 'salesOrderMemo', '' ],
						[ 'productCostBeforeTax', 0 ],
						[ 'additionalCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ],
						[ 'totalTaxOnAdditionalCost', 0 ]
					])
				]
			])
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateQuotation = this.updateQuotation.bind(this);
		this.updateQuotationItems = this.updateQuotationItems.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.updateStock = this.updateStock.bind(this);
		this.onCalculateTotal = this.onCalculateTotal.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Customer');
		this.props.getVariables('Location');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('TaxRule');
		this.props.getVariables('Product');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('ProductStore');
		this.props.getVariables('Sales');
		this.props.getVariables('SalesQuotation');
		this.props.getVariables('SalesQuotationItem');
		this.props.getVariables('SalesOrderStockItemRecord');
		this.props.getVariables('SalesOrderStockSoldRecord');
		// this.props.getVariables('SalesOrder');
		// this.props.getVariables('SalesOrderItem');
		// this.props.getVariables('SalesOrderServiceItem');
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
			nextProps.variables.Sales &&
			nextProps.variables.Customer &&
			nextProps.variables.SalesQuotationItem &&
			nextProps.variables.SalesQuotation &&
			nextProps.variables.SalesOrder &&
			nextProps.variables.SalesOrderItem &&
			nextProps.variables.SalesOrderServiceItem
		) {
			const variable = nextProps.variables.Sales.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const customer = nextProps.variables.Customer.filter(
					(customer) => customer.variableName === variable.values.general.values.customerName
				)[0];
				const salesQuotation = nextProps.variables.SalesQuotation.filter(
					(quotation) => quotation.values.sales === variable.variableName
				)[0];
				const salesQuotationItems = nextProps.variables.SalesQuotationItem
					.filter((quotationItem) => quotationItem.values.sales === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const salesOrder = nextProps.variables.SalesOrder.filter(
					(variable) => variable.values.sales === variable.variableName
				)[0];
				const salesOrderItems = nextProps.variables.SalesOrderItem
					.filter(
						(item) =>
							item.values.salesOrder === salesOrder.variableName &&
							item.values.sales === variable.variableName
					)
					.map((item) => {
						return objToMapRec(item);
					});
				const salesOrderServiceItem = nextProps.variables.SalesOrderServiceItem
					.filter(
						(serviceItem) =>
							serviceItem.values.salesOrder === salesOrder.variableName &&
							serviceItem.values.sales === variable.variableName
					)
					.map((item) => {
						return objToMapRec(item);
					});
				const address = objToMapRec(customer.values.addresses[0]);
				const contact = objToMapRec(customer.values.contacts[0]);
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					customerAddress: address,
					customerContact: contact,
					createPo: false,
					salesVariableName: variable.variableName,
					customer: variable.values.general.values.customerName,
					account: variable.values.general.values.account,
					salesQuotation: objToMapRec(salesQuotation),
					salesQuotatuionVariableName: salesQuotation.variableName,
					salesQuotationItems: salesQuotationItems,
					salesOrder: salesOrder,
					salesOrderItems: salesOrderItems,
					salesOrderServiceItem: salesOrderServiceItem
				};
			}
		}
		return prevState;
	}

	checkRequiredField(variable) {
		if (variable.get('values').get('customerName') === '') {
			customErrorMessage('customer Name  is missing');
			this.setState({ createSalesOrder: false });
		}
		if (variable.get('values').get('location') === '') {
			customErrorMessage(' Location is missing');
			this.setState({ createSalesOrder: false });
		}
		if (variable.get('values').get('term') === '') {
			customErrorMessage(' Term is missing');
			this.setState({ createSalesOrder: false });
		}
		if (variable.get('values').get('taxRule') === '') {
			customErrorMessage(' Tax Rule is missing');
			this.setState({ createSalesOrder: false });
		}
	}

	updateDetails(details, address, contact) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		this.setState({ variable: variable, customerAddress: address, customerContact: contact });
	}

	updateQuotation(salesQuotation) {
		this.setState({ salesQuotation });
	}

	updateQuotationItems(salesQuotationItems) {
		this.setState({ salesQuotationItems });
	}

	updateOrder(orderDetails) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('orderDetails', [ orderDetails ]);
		variable.set('values', values);
		this.setState({ variable: variable }, () => this.onCalculateTotal());
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
		const values = this.state.variable.get('values');

		// Product Cost
		values.get('orderDetails')[0].get('values').get('productInvoiceDetails').forEach((listVariable) => {
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
		values.get('orderDetails')[0].get('values').get('additionalCost').forEach((listVariable) => {
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
		const variable = cloneDeep(this.state.variable);
		const Variablevalues = variable.get('values');
		const order = Variablevalues.get('orderDetails')[0];
		const orderValues = order.get('values');
		orderValues.set('total', totalCost);
		orderValues.set('productCostBeforeTax', productCostBeforeTax);
		orderValues.set('totalTaxOnProduct', totalTaxOnProduct);
		orderValues.set('additionalCostBeforeTax', additionalCostBeforeTax);
		orderValues.set('totalTaxOnAdditionalCost', totalTaxOnAdditionalCost);
		order.set('values', orderValues);
		Variablevalues.set('orderDetails', [ order ]);
		variable.set('values', Variablevalues);
		this.setState({ variable: variable });
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
												if (this.state.createSalesOrder) {
													this.props.createVariable(this.state.variable).then((response) => {
														if (response.status === 200) {
															const sales = response.data.variableName;
															this.setState({
																createPo: false,
																salesVariableName: response.data.variableName,
																customer:
																	response.data.values.general.values.customerName,
																account: response.data.values.general.values.account
															});
															new Promise((resolve) => {
																const quotation = this.state.salesQuotation;
																const quotationValues = quotation.get('values');
																quotationValues.set('sales', sales);
																quotationValues.set(
																	'customer',
																	response.data.values.general.values.customerName
																);
																quotation.set('values', quotationValues);
																resolve(this.setState({ salesQuotation: quotation }));
															}).then(() => {
																this.props
																	.createVariable(this.state.salesQuotation)
																	.then((response) => {
																		if (response.status === 200) {
																			const list = addKeyToList(
																				this.state.salesQuotationItems,
																				'sales',
																				sales
																			);
																			this.setState({
																				salesQuotatuionVariableName:
																					response.data.variableName
																			});
																			this.props
																				.createVariables(
																					addKeyToList(
																						list,
																						'salesQuotation',
																						response.data.variableName
																					)
																				)
																				.then((response) => {
																					if (response === 200) {
																						successMessage(
																							'Quotation Created Successfully'
																						);
																					}
																				});
																		}
																	});
															});
														}
													});
												}
												this.setState({ createSalesOrder: true });
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
						<SalesGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							address={this.state.customerAddress}
							contact={this.state.customerContact}
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
													this.setState({ visibleSection: 'quotation' });
												}}
											>
												Quotation
											</BlockListItemButton>
										</HoizontalBlockListItems>
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
												onClick={(e) => this.setState({ visibleSection: 'unstock' })}
												// this.state.variable.get('values').get('invoiceCreated')
												// 	? this.setState({ visibleSection: 'stockReceived' })
												// 	: undefined}
											>
												Unstock
											</BlockListItemButton>
										</HoizontalBlockListItems>
										{/* 
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'manualJournals' });
												}}
											>
												Manual Journals
											</BlockListItemButton>
										</HoizontalBlockListItems> */}
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'quotation' && (
							<SalesQuotaton
								variable={this.state.orderDetails}
								salesQuotation={this.state.salesQuotation}
								salesQuotationItems={this.state.salesQuotationItems}
								updateQuotation={this.updateQuotation}
								updateItems={this.updateQuotationItems}
							/>
						)}
						{this.state.visibleSection === 'order' && (
							<SimpleSalesOrder
								sales={this.state.salesVariableName}
								salesQuotationItems={this.state.salesQuotationItems}
								salesQuotatuionVariableName={this.state.salesQuotatuionVariableName}
								customer={this.state.customer}
							/>
						)}
						{this.state.visibleSection === 'invoice' && (
							<SimpleSalesInvoice
								salesOrder={this.state.salesVariableName}
								customer={this.state.customer}
								account={this.state.account}
								orderDetails={objToMapRec(this.state.orderDetails)}
								location={this.state.variable
									.get('values')
									.get('general')
									.get('values')
									.get('location')}
							/>
						)}
						{this.state.visibleSection === 'unstock' && (
							<SalesStockSoldRecord
								salesOrder={this.state.salesVariableName}
								customer={this.state.customer}
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
	updateVariable,
	createVariables
})(SimpleSale);
