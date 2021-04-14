import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import {
	createVariable,
	createAccount,
	getVariable,
	updateVariable,
	createVariables,
	objToMapRec,
	getVariables,
	addKeyToList
} from '../../../redux/actions/variables';
import CustomerGeneralDetails from './CustomerGeneralDetails';
import CustomerAddresses from './CustomerAddresses';
import CustomerContact from './CustomerContact';
import CheckIcon from '@material-ui/icons/Check';
import CustomerOrders from './Customer Account/CustomerOrders';
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

class Customer extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			createCustomer: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Customer' ],
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
						[ 'discount', 0 ],
						[ 'attributeSet', '' ],
						[ 'comments', '' ],
						[ 'salesPriceTier', '' ],
						[ 'defaultLocation', '' ],
						[ 'creditLimit', 0 ],
						[ 'onCreditHold', false ],
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
						[ 'balance', 0 ],
						[ 'openingBalance', 0 ],
						[ 'status', 'Active' ],
						[ 'accountCategory', 'ASSET' ],
						[ 'description', 'Customer Account' ],
						[ 'accountType', 'Debtor' ]
					])
				]
			]),
			customerAccount: '',
			prevCustomerContacts: [],
			customerContacts: [],
			prevCustomerAddresses: [],
			customerAddresses: [],
			visibleSection: 'addresses',
				};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateAddresses = this.updateAddresses.bind(this);
		this.updateContactsList = this.updateContactsList.bind(this);
		this.updateCustomerContacts = this.updateCustomerContacts.bind(this);
		this.updateCustomerAddress = this.updateCustomerAddress.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.updateAccountName = this.updateAccountName.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseAlert = this.onCloseAlert.bind(this);
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.Customer &&
			nextProps.variables.CustomerContact &&
			nextProps.variables.CustomerAddress &&
			nextProps.variables.Account
		) {
			const variable = nextProps.variables.Customer.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			const account = nextProps.variables.Account.filter(
				(account) => account.variableName === variable.values.account
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const customerContacts = nextProps.variables.CustomerContact
					.filter((item) => item.values.customer === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const customerAddresses = nextProps.variables.CustomerAddress
					.filter((item) => item.values.customer === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const accountMap = objToMapRec(account);
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					account: accountMap,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					customerAccount: variable.values.account,
					prevCustomerContacts: customerContacts.length !== 0 ? customerContacts : prevState.customerContacts,
					customerContacts: customerContacts.length !== 0 ? customerContacts : prevState.customerContacts,
					prevCustomerAddresses:
						customerAddresses.length !== 0 ? customerAddresses : prevState.customerAddresses,
					customerAddresses: customerAddresses.length !== 0 ? customerAddresses : prevState.customerAddresses
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
		this.props.getVariables('Currency');
		this.props.getVariables('CarrierService');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('Status');
		this.props.getVariables('TaxRule');
		this.props.getVariables('AttributeSet');
		this.props.getVariables('PriceTierName');
		this.props.getVariables('Location');
		this.props.getVariables('AddressType');
		this.props.getVariables('CustomerContact');
		this.props.getVariables('CustomerAddress');
		this.props.getVariables('SalesInvoice');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props.getVariables('Account');
				this.props.getVariables('SalesInvoice');
				const variable = decodeURIComponent(this.props.match.params.variableName);
				this.props.getVariable(this.state.variable.get('typeName'), variable);
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			const variable = decodeURIComponent(this.props.match.params.variableName);
			this.props.getVariable(this.state.variable.get('typeName'), variable);
		}
		this.getData();
	}

	checkRequiredField(variable) {
		const defaultCustomerContact = this.state.customerContacts.filter(
			(item) => item.get('values').get('isDefault') === true
		);
		const defaultCustomerAddress = this.state.customerAddresses.filter(
			(item) => item.get('values').get('isDefault') === true
		);
		if (variable.get('variableName') === '') {
			customErrorMessage(' Customer Name is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('values').get('status') === '') {
			customErrorMessage('status is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('values').get('taxRule') === '') {
			customErrorMessage('taxRule is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('values').get('paymentTerm') === '') {
			customErrorMessage('paymentTerm is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('values').get('currency') === '') {
			customErrorMessage('currency is missing');
			this.setState({ createCustomer: false });
		}
		if (this.state.customerContacts.length === 0) {
			customErrorMessage('Add atleast one  Contact');
			this.setState({ createCustomer: false });
		} else if (defaultCustomerContact.length === 0) {
			customErrorMessage('Add atleast One  default  Contact');
			this.setState({ createCustomer: false });
		}
		if (this.state.customerAddresses.length === 0) {
			customErrorMessage('Add atleast one  Address');
			this.setState({ createCustomer: false });
		} else if (defaultCustomerAddress.length === 0) {
			customErrorMessage('Add atleast one  default  Address');
			this.setState({ createCustomer: false });
		}
	}

	updateDetails(variable) {
		const account = cloneDeep(this.state.account);
		const accountValues = account.get('values');
		accountValues.set('name', variable.get('variableName'));
		this.setState({
			variable: variable,
			account: account
		});
	}

	updateAddresses(customerAddresses) {
		this.setState({ customerAddresses });
	}

	updateContactsList(customerContacts) {
		this.setState({ customerContacts });
	}

	updateAccountName(accountName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('account', accountName);
		variable.set('values', values);
		this.setState({
			variable: variable,
			customerAccount: accountName
		});
	}

	updateCustomerAddress() {
		this.props.updateVariables(this.state.prevCustomerAddresses, this.state.customerAddresses).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('CustomerAddress');
				successMessage(' Customer Address updated');
			}
		});
	}

	updateCustomerContacts() {
		this.props.updateVariables(this.state.prevCustomerContacts, this.state.customerContacts).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('CustomerContact');
				successMessage(' Customer Contact Updated');
			}
		});
	}

	onCloseAlert() {
		this.setState({
			createCustomer: true,
			variable: new Map([
				[ 'typeName', 'Customer' ],
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
						[ 'discount', 0 ],
						[ 'attributeSet', '' ],
						[ 'comments', '' ],
						[ 'salesPriceTier', '' ],
						[ 'defaultLocation', '' ],
						[ 'creditLimit', 0 ],
						[ 'onCreditHold', false ],
						[ 'account', '' ]
					])
				]
			]),
			prevCustomerContacts: [],
			customerContacts: [],
			prevCustomerAddresses: [],
			customerAddresses: [],
			account: new Map([
				[ 'typeName', 'Account' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'balance', 0 ],
						[ 'openingBalance', 0 ],
						[ 'status', 'Active' ],
						[ 'accountCategory', 'ASSET' ],
						[ 'description', 'Customer Account' ],
						[ 'accountType', 'Debtor' ]
					])
				]
			]),
			customerAccount: '',
			visibleSection: 'addresses'
		});
	}

	alert() {
		confirmAlert({
			title: 'Add New Customer',
			buttons: [
				{
					label: 'Continue',
					onClick: () => this.onCloseAlert()
				},
				{
					label: 'Exit',
					onClick: () => this.props.history.push('/customerList')
				}
			],
			closeOnEscape: true,
			closeOnClickOutside: true
		});
	}

	render() {

		return (
			<Container mediaPadding="20px 20px 0 20px" onscroll="extJS_realign()">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={2} />			
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
											resolve(this.checkRequiredField(this.state.variable));
										}).then(() => {
											console.log(this.state.createCustomer)
											if (this.state.createCustomer) {
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
																	const customerAttributes = [];
																	if (this.state.customerAddresses.length !== 0) {
																		addKeyToList(
																			this.state.customerAddresses,
																			'customer',
																			response.data.variableName
																		).forEach((element) => {
																			customerAttributes.push(element);
																		});
																	}
																	if (this.state.customerContacts.length !== 0) {
																		addKeyToList(
																			this.state.customerContacts,
																			'customer',
																			response.data.variableName
																		).forEach((element) => {
																			customerAttributes.push(element);
																		});
																	}
																	customerAttributes.length !== 0
																		? this.props
																				.createVariables(customerAttributes)
																				.then((response) => {
																					if (response.status === 200) {
																						successMessage(
																							'Customer Created'
																						);
																						//Enable after Testing
																						// this.alert()
																					}
																				})
																		: successMessage(' Customer Created');
																}
															});
													});
											}
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
					
					
						{this.state.visibleSection !== 'accounts' && (											
							<CustomerGeneralDetails
								updatable={this.props.match.params.variableName ? true : false}
								variable={this.state.variable}
								updateDetails={this.updateDetails}
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
													Customer Details
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
										{this.props.match.params.variableName ? (
											<HoizontalBlockListItems>
												<BlockListItemButton
													onClick={(e) => {
														this.setState({ visibleSection: 'orders' });
													}}
												>
													Customer Purchase
												</BlockListItemButton>
											</HoizontalBlockListItems>
										) : (
											undefined
										)}
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'contacts' && (
							<CustomerContact
								customer={this.props.match.params.variableName}
								updatable={this.props.match.params.variableName ? true : false}
								updateContactsList={this.updateContactsList}
								customerContacts={this.state.customerContacts}
								updateCustomerContacts={this.updateCustomerContacts}
							/>
						)}

						{this.state.visibleSection === 'addresses' && (
							<CustomerAddresses
								customer={this.props.match.params.variableName}
								updatable={this.props.match.params.variableName ? true : false}
								updateAddresses={this.updateAddresses}
								customerAddresses={this.state.customerAddresses}
								updateCustomerAddress={this.updateCustomerAddress}
							/>
						)}

						{this.props.match.params.variableName && this.state.visibleSection === 'orders' ? (
							<CustomerOrders
								customer={this.props.match.params.variableName}
								customerAccount={this.state.customerAccount}
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
	createAccount,
	getVariable,
	updateVariable,
	getVariables
})(Customer);
