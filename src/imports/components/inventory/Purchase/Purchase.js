import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import {
	createVariable,
	getVariables,
	getVariable,
	updateVariable,
	objToMapRec
} from '../../../redux/actions/variables';
import PurchaseGeneralDetails from './PurchaseGeneralDetails';
import PurchaseOrderDetails from './PurchaseOrderDetails';
import PurchaseInvoiceDetails from './PurchaseInvoiceDetails';
import PurchaseStockReceived from './PurchaseStockReceived';
import SelectorganizationModal from '../../main/SelectorganizationModal';
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
} from './Style';

class Purchase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			createPurchaseOrder: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'SimplePurchase' ],
				[ 'variableName', '' ], //supllier name is variable name
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
										[ 'blindReceipt', false ],
										[ 'term', '' ],
										[ 'taxRule', '' ],
										[ 'date', '' ],
										[ 'contact', new Map([ [ 'context', '' ], [ 'variableName', '' ] ]) ],
										[ 'stockOrInvoice', 'Stock First' ],
										[ 'phone', '' ],
										[ 'taxInclusive', false ],
										[ 'shippingAddress1', '' ],
										[ 'shippingAddress2', '' ],
										[ 'location', '' ],
										[ 'vendorAddressLine1', '' ],
										[ 'vendorAddressLine2', '' ],
										[ 'requiredBy', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[
							'invoiceDetails',
							[
								new Map([
									[ 'variableName', '0' ],
									[
										'values',
										new Map([
											[ 'additionalCost', [] ],
											[ 'productInvoiceDetails', [] ],
											[ 'supplierDeposit', [] ],
											[ 'invoiceDate', '' ],
											[ 'dueDate', '' ],
											[ 'invoiceNumber', '' ],
											[ 'total', '' ],
											[ 'purchaseOrderMemo', '' ]
										])
									]
								])
							]
						],
						[
							'orderDetails',
							[
								new Map([
									[ 'variableName', '0' ],
									[
										'values',
										new Map([
											[ 'additionalCost', [] ],
											[ 'productInvoiceDetails', [] ],
											[ 'supplierDeposit', [] ],
											[ 'total', '' ],
											[ 'purchaseOrderMemo', '' ]
										])
									]
								])
							]
						],
						[ 'stockReceived', [] ]
					])
				]
			]),
			visibleSection: 'order'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateInvoice = this.updateInvoice.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.updateStock = this.updateStock.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Supplier');
		this.props.getVariables('Location');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('PurchaseTaxRule');
		this.props.getVariables('Product');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props
					.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
					.then((variable) => {
						this.setState({ prevVariable: objToMapRec(variable) });
					});
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			this.props
				.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
				.then((variable) => {
					this.setState({ prevVariable: variable });
				});
		}
		this.getData();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.SimplePurchase) {
			const variable = nextProps.variables.SimplePurchase.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable
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

	updateDetails(details) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		this.setState({ variable: variable });
	}

	updateInvoice(invoiceDetails) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('invoiceDetails', [ invoiceDetails ]);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateOrder(orderDetails) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('orderDetails', [ orderDetails ]);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateStock(productStock) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('stockReceived', productStock);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={3} />
				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton
								onClick={(e) => {
									if (this.props.match.params.variableName) {
										this.props.updateVariable(this.state.prevVariable, this.state.variable);
									} else {
										new Promise((resolve) => {
											resolve(
												this.checkRequiredField(
													this.state.variable.get('values').get('general')
												)
											);
										}).then(() => {
											if (this.state.createPurchaseOrder) {
												this.props.createVariable(this.state.variable).then((status) => {
													if (status === 200) {
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
						<PurchaseGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
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
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'stockReceived' });
												}}
											>
												Stock Received
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'creditNote' });
												}}
											>
												Credit Note
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'unStock' });
												}}
											>
												Unstock
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'manualJournals' });
												}}
											>
												Manual Journals
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'order' && (
							<PurchaseOrderDetails
								variable={this.state.variable.get('values').get('orderDetails')[0]}
								updateInvoice={this.updateOrder}
							/>
						)}
						{this.state.visibleSection === 'stockReceived' && (
							<PurchaseStockReceived
								list={this.state.variable.get('values').get('stockReceived')}
								updateStock={this.updateStock}
							/>
						)}
						{this.state.visibleSection === 'invoice' && (
							<PurchaseInvoiceDetails
								variable={this.state.variable.get('values').get('invoiceDetails')[0]}
								updateInvoice={this.updateInvoice}
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
