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
	mapToObjectRec,
	objToMapRec,
	addKeyToList
} from '../../../../redux/actions/variables';
import ServicePurchaseGeneralDetails from './ServicePurchaseGeneralDetails';
import ServicePurchaseOrderDetails from './ServicePurchaseOrderDetails';
import ServicePurchaseInvoiceDetails from './ServicePurchaseInvoiceDetails';
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

class ServicePurchase extends React.Component {
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
										[ 'contact', '' ],
										[ 'phone', '' ],
										[ 'shippingAddress1', '' ],
										[ 'shippingAddress2', '' ],
										[ 'location', '' ],
										[ 'address', '' ],
										[ 'requiredBy', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[ 'orderCreated', false ],
						[ 'invoiceCreated', false ],
						[ 'orderType', 'Service' ]
					])
				]
			]),
			visibleSection: 'order',
			purchaseVariableName: '',
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
		this.onCalculateTotal = this.onCalculateTotal.bind(this);
		this.updatePurchaseOrderServiceItems = this.updatePurchaseOrderServiceItems.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Purchase');
		this.props.getVariables('Supplier');
		this.props.getVariables('SupplierContact');
		this.props.getVariables('SupplierAddress');
		this.props.getVariables('Account');
		this.props.getVariables('Location');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('TaxRule');
		this.props.getVariables('Product');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('ProductSupplier');
		this.props.getVariables('PurchaseOrder');
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
			nextProps.variables.PurchaseOrderServiceItem &&
			nextProps.variables.Supplier &&
			nextProps.variables.SupplierContact &&
			nextProps.variables.SupplierAddress
		) {
			const variable = nextProps.variables.PurchaseOrder.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const supplierAddress = nextProps.variables.SupplierAddress.filter(
					(address) => address.variableName === variable.values.general.values.address
				)[0];
				const supplierContact = nextProps.variables.SupplierContact.filter(
					(contact) => contact.variableName === variable.values.general.values.contact
				)[0];
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				const purchaseOrder = nextProps.variables.PurchaseOrder.filter(
					(order) => order.values.purchase === variable.variableName
				)[0];
				const purchaseOrderServiceItems =
					purchaseOrder !== undefined
						? nextProps.variables.PurchaseOrderServiceItem
								.filter(
									(serviceItem) =>
										serviceItem.values.purchaseOrder === purchaseOrder.variableName &&
										serviceItem.values.purchase === variable.variableName
								)
								.map((item) => {
									return objToMapRec(item);
								})
						: prevState.purchaseOrderServiceItems;
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					supplierAddress: mapToObjectRec(supplierAddress),
					supplierContact: mapToObjectRec(supplierContact),
					createPo: false,
					purchaseVariableName: variable.variableName,
					supplier: variable.values.general.values.supplierName,
					account: variable.values.general.values.account,
					purchaseOrder: purchaseOrder ? objToMapRec(purchaseOrder) : prevState.purchaseOrder,
					purchaseOrderServiceItems: purchaseOrderServiceItems
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
		this.setState({ purchaseOrder });
	}

	updatePurchaseOrderServiceItems(purchaseOrderServiceItems) {
		this.setState({ purchaseOrderServiceItems }, () => this.onCalculateTotal());
	}

	onCalculateTotal() {
		var additionalCostBeforeTax = 0;
		var totalTaxOnAdditionalCost = 0;
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
		const totalCost = additionalCostBeforeTax + totalTaxOnAdditionalCost;
		const purchaseOrder = cloneDeep(this.state.purchaseOrder);
		const orderValues = purchaseOrder.get('values');
		orderValues.set('total', totalCost);
		orderValues.set('additionalCostBeforeTax', additionalCostBeforeTax);
		orderValues.set('totalTaxOnAdditionalCost', totalTaxOnAdditionalCost);
		this.setState({ purchaseOrder });
	}

	createPurchaseOrder() {
		new Promise((resolve) => {
			resolve(this.checkRequiredField(this.state.variable.get('values').get('general')));
		}).then(() => {
			if (this.state.createPurchaseOrder) {
				this.props.createVariable(this.state.variable).then((response) => {
					if (response.status === 200) {
						const purchase = response.data.variableName;
						this.setState({
							createPo: false,
							purchaseVariableName: response.data.variableName,
							supplier: response.data.values.general.values.supplierName,
							account: response.data.values.general.values.account
						});
						new Promise((resolve) => {
							const purchaseOrder = this.state.purchaseOrder;
							const purchaseOrderValues = purchaseOrder.get('values');
							purchaseOrderValues.set('purchase', response.data.variableName);
							purchaseOrderValues.set('date', response.data.values.general.values.date);
							purchaseOrderValues.set('supplier', response.data.values.general.values.supplierName);
							purchaseOrder.set('values', purchaseOrderValues);
							resolve(this.setState({ purchaseOrder }));
						}).then(() => {
							this.props.createVariable(this.state.purchaseOrder).then((response) => {
								if (response.status === 200) {
									const purchaseOrder = response.data;
									const purchaseOrderVariableName = response.data.variableName;
									const purchaseOrdderServiceItems = addKeyToList(
										this.state.purchaseOrderServiceItems,
										'purchase',
										purchase
									);
									this.props
										.createVariables(
											addKeyToList(
												purchaseOrdderServiceItems,
												'purchaseOrder',
												purchaseOrderVariableName
											)
										)
										.then((response) => {
											if (response.status === 200) {
												this.setState({
													purchaseOrder: objToMapRec(purchaseOrder)
												});
												this.props.getVariables('PurchaseOrder');
												this.props.getVariables('PurchaseOrderServiceItem');
												successMessage(' Purchase Order Created');
											}
										});
								}
							});
						});
					}
				});
			}
			this.setState({ createPurchaseOrder: true });
		});
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
											this.createPurchaseOrder();
										}
									}}
								>
									<CheckIcon />
								</SaveButton>
							</SaveButtonContaier>
						) : (
							undefined
						)}

						<ServicePurchaseGeneralDetails
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
												onClick={(e) => {
													this.setState({ visibleSection: 'invoice' });
												}}
											>
												Invoice
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'order' && (
							<ServicePurchaseOrderDetails
							variable={this.state.purchaseOrder}
							purchaseOrderServiceItems={this.state.purchaseOrderServiceItems}
							updateOrder={this.updateOrder}
							updatePurchaseOrderServiceItems={this.updatePurchaseOrderServiceItems}
							supplier={this.state.variable
								.get('values')
								.get('general')
								.get('values')
								.get('supplierName')}
							/>
						)}
						{this.state.visibleSection === 'invoice' && (
							<ServicePurchaseInvoiceDetails
							purchase={this.state.purchaseVariableName}
							supplier={this.state.supplier}
							account={this.state.account}
							purchaseOrder={mapToObjectRec(this.state.purchaseOrder)}
							purchaseOrderServiceItems={this.state.purchaseOrderServiceItems}
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
})(ServicePurchase);
