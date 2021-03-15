import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import CheckIcon from '@material-ui/icons/Check';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import {
	createVariable,
	createAccount,
	getVariables,
	getVariable,
	updateVariable,
	updateVariables,
	objToMapRec,
	mapToObjectRec,
	createVariables,
	addKeyToList
} from '../../../redux/actions/variables';
import SupplierDetails from './SupplierDetails';
import SupplierAddresses from './SupplierAddresses';
import SupplierContacts from './SupplierContacts';
import SupplierSales from './Supplier Account/SupplierSales';
import SupplierAccount from './Supplier Account/SupplierAccount';
import SelectorganizationModal from '../../main/Modal/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,
	BlockListItemButton,
	SaveButtonContaier,
	SaveButton,
	HorizontalListPageBlock,
	HorizontalBlockListOuter,
	HorizontalBlockListInnerWrapper,
	HoizontalBlockList,
	HoizontalBlockListItems
} from '../../../styles/inventory/Style';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SupplierProduct from './SupplierProduct';

class Supplier extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			createSupplier: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Supplier' ],
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
										[ 'currency', '' ],
										[ 'paymentTerm', '' ],
										[ 'taxRule', '' ],
										[ 'status', '' ],
										[ 'defaultCarrier', '' ],
										[ 'taxNumber', '' ],
										[ 'discount', '' ],
										[ 'attributeSet', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[ 'account', '' ]
					])
				]
			]),
			account: new Map([
				[ 'typeName', 'Account' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'code', '' ],
						[ 'balance', 0 ],
						[ 'openingBalance', 0 ],
						[ 'status', 'Active' ],
						[ 'accountType', 'Creditor' ],
						[ 'accountCategory', 'LIABILITY' ],
						[ 'description', 'Supplier Account' ]
					])
				]
			]),
			prevSupplierContacts: [],
			supplierContacts: [],
			prevSupplierAddresses: [],
			supplierAddresses: [],
			supplierProducts: [],
			prevSupplierProducts: [],
			supplierAccount: '',
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateAddresses = this.updateAddresses.bind(this);
		this.updateContactsList = this.updateContactsList.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.updateAccountName = this.updateAccountName.bind(this);
		this.updateSupplierProducts = this.updateSupplierProducts.bind(this);
		this.updateSupplierAddress = this.updateSupplierAddress.bind(this);
		this.updateSupplierContacts = this.updateSupplierContacts.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseAlert = this.onCloseAlert.bind(this);
		this.updateProducts = this.updateProducts.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.Supplier &&
			nextProps.variables.Account &&
			nextProps.variables.SupplierContact &&
			nextProps.variables.SupplierAddress &&
			nextProps.variables.ProductSupplier
		) {
			const variable = nextProps.variables.Supplier.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			const account = nextProps.variables.Account.filter(
				(account) => account.variableName === variable.values.account
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const supplierContacts = nextProps.variables.SupplierContact
					.filter((item) => item.values.supplier === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const supplierAddresses = nextProps.variables.SupplierAddress
					.filter((item) => item.values.supplier === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const supplierProducts = nextProps.variables.ProductSupplier
					.filter((item) => item.values.supplier === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const accountMap = objToMapRec(account);
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				return {
					...prevState,
					account: accountMap,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					supplierAccount: variable.values.account,
					prevSupplierContacts: supplierContacts.length !== 0 ? supplierContacts : prevState.supplierContacts,
					supplierContacts: supplierContacts.length !== 0 ? supplierContacts : prevState.supplierContacts,
					prevSupplierAddresses:
						supplierAddresses.length !== 0 ? supplierAddresses : prevState.supplierAddresses,
					supplierAddresses: supplierAddresses.length !== 0 ? supplierAddresses : prevState.supplierAddresses,
					prevSupplierProducts: supplierProducts.length !== 0 ? supplierProducts : prevState.supplierProducts,
					supplierProducts: supplierProducts.length !== 0 ? supplierProducts : prevState.supplierProducts
				};
			}
			if (variable === prevState.variable) {
				const supplierProducts = nextProps.variables.ProductSupplier
					.filter((supplier) => supplier.values.product === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				return {
					...prevState,
					supplierProducts: supplierProducts
				};
			}
		}
		return prevState;
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Country');
		this.props.getVariables('States');
		this.props.getVariables('PinCode');
		this.props.getVariables('Area');
		this.props.getVariables('Currency');
		this.props.getVariables('CarrierService');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('Status');
		this.props.getVariables('TaxRule');
		this.props.getVariables('AttributeSet');
		this.props.getVariables('PriceTierName');
		this.props.getVariables('Location');
		this.props.getVariables('AddressType');
		this.props.getVariables('SupplierContact');
		this.props.getVariables('SupplierAddress');
		this.props.getVariables('Product');
		this.props.getVariables('ProductSupplier');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props.getVariables('Account');
				this.props.getVariables('PurchaseInvoice');
				const variable = decodeURIComponent(this.props.match.params.variableName);
				this.props.getVariable(this.state.variable.get('typeName'), variable);
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
					this.setState({ prevVariable: objToMapRec(variable) });
				});
		}
		this.getData();
	}

	checkRequiredField(variable) {
		const defaultSupplierContact = this.state.supplierContacts.filter(
			(item) => item.get('values').get('isDefault') === true
		);
		const defaultSupplierAddress = this.state.supplierAddresses.filter(
			(item) => item.get('values').get('isDefault') === true
		);
		if (variable.get('general').get('variableName') === '') {
			customErrorMessage('Supplier Name is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('status') === '') {
			customErrorMessage('Status is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('taxRule') === '') {
			customErrorMessage('Tax Rule is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('paymentTerm') === '') {
			customErrorMessage('Payment Term is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('discount') === '') {
			customErrorMessage('Payment Term is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('currency') === '') {
			customErrorMessage('Currency is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('attributeSet') === '') {
			customErrorMessage('Attribute Set is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('defaultCarrier') === '') {
			customErrorMessage('Carrier Service is missing');
			this.setState({ createSupplier: false });
		}

		if (this.state.supplierContacts.length === 0) {
			customErrorMessage('Add atleast one  Contact');
			this.setState({ createSupplier: false });
		} else if (defaultSupplierContact.length === 0) {
			customErrorMessage('Add atleast One  default  Contact');
			this.setState({ createSupplier: false });
		}

		if (this.state.supplierAddresses.length === 0) {
			customErrorMessage('Add atleast one  Address');
			this.setState({ createSupplier: false });
		} else if (defaultSupplierAddress.length === 0) {
			customErrorMessage('Add atleast one  default  Address');
			this.setState({ createSupplier: false });
		}
	}

	updateDetails(details) {
		const variable = cloneDeep(this.state.variable);
		const account = cloneDeep(this.state.account);
		const accountValues = account.get('values');
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		accountValues.set('name', details.get('variableName'));
		this.setState({
			variable: variable,
			account: account
		});
	}

	updateAddresses(supplierAddresses) {
		this.setState({ supplierAddresses });
	}

	updateContactsList(supplierContacts) {
		this.setState({ supplierContacts });
	}

	updateAccountName(accountName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('account', accountName);
		variable.set('values', values);
		this.setState({
			variable: variable,
			supplierAccount: accountName
		});
	}

	updateSupplierProducts(supplierProducts) {
		this.setState({ supplierProducts });
	}

	onCloseAlert() {
		this.setState({
			createSupplier: true,
			variable: new Map([
				[ 'typeName', 'Supplier' ],
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
										[ 'currency', '' ],
										[ 'paymentTerm', '' ],
										[ 'taxRule', '' ],
										[ 'status', '' ],
										[ 'defaultCarrier', '' ],
										[ 'taxNumber', '' ],
										[ 'discount', '' ],
										[ 'attributeSet', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[ 'account', '' ]
					])
				]
			]),
			account: new Map([
				[ 'typeName', 'Account' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'code', '' ],
						[ 'balance', 0 ],
						[ 'openingBalance', 0 ],
						[ 'status', 'Active' ],
						[ 'accountType', 'Creditor' ],
						[ 'accountCategory', 'LIABILITY' ],
						[ 'description', 'Supplier Account' ]
					])
				]
			]),
			supplierAccount: '',
			visibleSection: 'addresses'
		});
	}

	alert() {
		confirmAlert({
			title: 'Add New Supplier',
			buttons: [
				{
					label: 'Continue',
					onClick: () => this.onCloseAlert()
				},
				{
					label: 'Exit',
					onClick: () => this.props.history.push('/SupplierList')
				}
			],
			closeOnEscape: true,
			closeOnClickOutside: true
		});
	}

	createSupplierProducts() {
		this.props.createVariables(this.state.supplierProducts).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('ProductSupplier');
				successMessage(' Supplier Product Added');
			}
		});
	}

	updateProducts() {
		this.props.updateVariables(this.state.prevSupplierProducts, this.state.supplierProducts);
	}

	updateSupplierAddress() {
		this.props.updateVariables(this.state.prevSupplierAddresses, this.state.supplierAddresses).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('SupplierAddress');
				successMessage(' Supplier Address updated');
			}
		});
	}

	updateSupplierContacts() {
		this.props.updateVariables(this.state.prevSupplierContacts, this.state.supplierContacts).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('SupplierContact');
				successMessage(' Supplier Contact Updated');
			}
		});
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
										this.props
											.updateVariable(this.state.prevVariable, this.state.variable)
											.then((status) => {
												if (status === 200) {
													this.onClose(e);
													successMessage(`Updated Succesfully`);
												}
											});
									} else {
										new Promise((resolve) => {
											resolve(this.checkRequiredField(this.state.variable.get('values')));
										}).then(() => {
											if (this.state.createSupplier) {
												this.props
													.createAccount(this.state.account)
													.then((data) => {
														if (data.status === 200) {
															this.updateAccountName(data.accountName);
														}
													})
													.then(() => {
														this.props
															.createVariable(this.state.variable)
															.then((response) => {
																if (response.status === 200) {
																	const supplierAttributes = [];
																	if (this.state.supplierAddresses.length !== 0) {
																		addKeyToList(
																			this.state.supplierAddresses,
																			'supplier',
																			response.data.variableName
																		).forEach((element) => {
																			supplierAttributes.push(element);
																		});
																	}
																	if (this.state.supplierContacts.length !== 0) {
																		addKeyToList(
																			this.state.supplierContacts,
																			'supplier',
																			response.data.variableName
																		).forEach((element) => {
																			supplierAttributes.push(element);
																		});
																	}
																	if (this.state.supplierProducts.length !== 0) {
																		addKeyToList(
																			this.state.supplierProducts,
																			'supplier',
																			response.data.variableName
																		).forEach((element) => {
																			supplierAttributes.push(element);
																		});
																	}
																	supplierAttributes.length !== 0
																		? this.props
																				.createVariables(supplierAttributes)
																				.then((response) => {
																					if (response.status === 200) {
																						successMessage(
																							'Supplier Created'
																						);
																						//Enable after Testing
																						// this.alert()
																					}
																				})
																		: successMessage(' Supplier Created');
																}
															});
													});
											}
											this.setState({ createSupplier: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						{this.state.visibleSection !== 'accounts' && (
							<SupplierDetails
								variable={this.state.variable.get('values').get('general')}
								updateDetails={this.updateDetails}
								params={this.props.match.params}
							/>
						)}

						<HorizontalListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList>
										{this.state.visibleSection === 'accounts' ? (
											<HoizontalBlockListItems>
												<BlockListItemButton
													onClick={(e) => {
														this.setState({ visibleSection: 'details' });
													}}
												>
													Supplier Details
												</BlockListItemButton>
											</HoizontalBlockListItems>
										) : (
											undefined
										)}
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'addresses' });
												}}
											>
												Addresess
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'contacts' });
												}}
											>
												Contacts
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'supplierProducts' });
												}}
											>
												Products
											</BlockListItemButton>
										</HoizontalBlockListItems>
										{this.props.match.params.variableName ? (
											<HoizontalBlockListItems>
												<BlockListItemButton
													onClick={(e) => {
														this.setState({ visibleSection: 'sales' });
													}}
												>
													Supplier Sales
												</BlockListItemButton>
											</HoizontalBlockListItems>
										) : (
											undefined
										)}
										{/* {this.props.match.params.variableName ? (
											<HoizontalBlockListItems>
												<BlockListItemButton
													onClick={(e) => {
														this.setState({ visibleSection: 'accounts' });
													}}
												>
													Supplier Account
												</BlockListItemButton>
											</HoizontalBlockListItems>
										) : (
											undefined
										)} */}
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'addresses' && (
							<SupplierAddresses
								supplier={this.props.match.params.variableName}
								updatable={this.props.match.params.variableName ? true : false}
								updateAddresses={this.updateAddresses}
								supplierAddresses={this.state.supplierAddresses}
								updateSupplierAddress={this.updateSupplierAddress}
							/>
						)}
						{this.state.visibleSection === 'contacts' && (
							<SupplierContacts
								supplier={this.props.match.params.variableName}
								updatable={this.props.match.params.variableName ? true : false}
								updateContactsList={this.updateContactsList}
								supplierContacts={this.state.supplierContacts}
								updateSupplierContacts={this.updateSupplierContacts}
							/>
						)}

						{this.props.match.params.variableName && this.state.visibleSection === 'sales' ? (
							<SupplierSales
								supplier={this.props.match.params.variableName}
								supplierAccount={this.state.supplierAccount}
							/>
						) : (
							undefined
						)}
						{this.props.match.params.variableName && this.state.visibleSection === 'accounts' ? (
							<SupplierAccount
								supplier={this.props.match.params.variableName}
								supplierAccount={this.state.supplierAccount}
								supplierAccoutnDetail={mapToObjectRec(this.state.account)}
							/>
						) : (
							undefined
						)}
						{this.state.visibleSection === 'supplierProducts' ? (
							<SupplierProduct
								supplier={this.props.match.params.variableName}
								updatable={this.props.match.params.variableName ? true : false}
								supplierProducts={this.state.supplierProducts}
								updateSupplierProducts={this.updateSupplierProducts}
								update={this.updateProducts}
								createSupplierProducts={this.createSupplierProducts}
							/>
						) : (
							undefined
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
	createVariables,
	updateVariables,
	createAccount,
	getVariable,
	getVariables,
	updateVariable
})(Supplier);
