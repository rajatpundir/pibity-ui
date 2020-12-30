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
	objToMapRec,
	getVariables,
	mapToObjectRec
} from '../../../redux/actions/variables';
import CustomerGeneralDetails from './CustomerGeneralDetails';
import CustomerAddresses from './CustomerAddresses';
import CustomerContact from './CustomerContact';
import CheckIcon from '@material-ui/icons/Check';
import CustomerAccount from './Customer Account/CustomerAccount';
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
										[ 'discount', 0 ],
										[ 'attributeSet', '' ],
										[ 'comments', '' ],
										[ 'salesPriceTier', '' ],
										[ 'defaultLocation', '' ],
										[ 'creditLimit', 0 ],
										[ 'onCreditHold', false ]
									])
								]
							])
						],
						[ 'account', '' ],
						[ 'addresses', [] ],
						[ 'contacts', [] ]
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
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateAddresses = this.updateAddresses.bind(this);
		this.updateContacts = this.updateContacts.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.updateAccountName = this.updateAccountName.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Customer && nextProps.variables.Account) {
			const variable = nextProps.variables.Customer.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			const account = nextProps.variables.Account.filter(
				(account) => account.variableName === variable.values.account
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
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
					customerAccount: variable.values.account
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
		// let message = ''; // To show error in one popUp
		if (variable.get('general').get('variableName') === '') {
			// message = message + ' Please provide a Customer Name  \n';
			customErrorMessage(' Customer Name is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('status') === '') {
			// message = message + ' Please choose the Status \n';
			customErrorMessage('status is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('taxRule') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage('taxRule is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('paymentTerm') === '') {
			// message = message + ' Please choose the Payment Term \n';
			customErrorMessage('paymentTerm is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('currency') === '') {
			// message = message + 'Please choose a Currency  \n';
			customErrorMessage('currency is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('contacts').length === 0) {
			// message = message + ' Add at least One Contact field \n';
			customErrorMessage('Add at least One Contact field');
			this.setState({ createCustomer: false });
		}
		if (variable.get('addresses').length === 0) {
			// message = message + ' Add at least One Address field \n';
			customErrorMessage('Add at least One Address field');
			this.setState({ createCustomer: false });
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
	updateAddresses(addresses) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('addresses', addresses);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateContacts(contacts) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('contacts', contacts);
		variable.set('values', values);
		this.setState({ variable: variable });
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
											resolve(this.checkRequiredField(this.state.variable.get('values')));
										}).then(() => {
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
																	successMessage(' Customer Created');
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
							<CustomerGeneralDetails
								variable={this.state.variable.get('values').get('general')}
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
										{this.props.match.params.variableName ? (
											<HoizontalBlockListItems>
												<BlockListItemButton
													onClick={(e) => {
														this.setState({ visibleSection: 'accounts' });
													}}
												>
													Customer Account
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
								list={this.state.variable.get('values').get('contacts')}
								updateContacts={this.updateContacts}
							/>
						)}
						{this.state.visibleSection === 'addresses' && (
							<CustomerAddresses
								list={this.state.variable.get('values').get('addresses')}
								updateAddresses={this.updateAddresses}
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
						{this.props.match.params.variableName && this.state.visibleSection === 'accounts' ? (
							<CustomerAccount
								customer={this.props.match.params.variableName}
								customerAccount={this.state.customerAccount}
								customerAccountDetail={mapToObjectRec(this.state.account)}
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
	createAccount,
	getVariable,
	updateVariable,
	getVariables
})(Customer);
