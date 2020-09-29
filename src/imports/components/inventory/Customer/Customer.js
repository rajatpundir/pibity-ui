import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage ,CustomNotification} from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import { createVariable, getVariable, updateVariable, objToMapRec,getVariables } from '../../../redux/actions/variables';
import CustomerGeneralDetails from './CustomerGeneralDetails';
import CustomerAddresses from './CustomerAddresses';
import CustomerContact from './CustomerContact';
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from '../../main/SelectorganizationModal';

class Customer extends React.Component {
	constructor(props) {
		super(props);
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
						[ 'addresses', [] ],
						[ 'contacts', [] ]
					])
				]
			]),
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateAddresses = this.updateAddresses.bind(this);
		this.updateContacts = this.updateContacts.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Customer) {
			const variable = nextProps.variables.Customer.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
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
					prevVariable: prevVariableMap
				};
			}
		}
		return prevState;
	}

	getData(){
		this.props.clearErrors();
			this.props.getVariables('Country');
			this.props.getVariables('Currency');
			this.props.getVariables('CarrierService');
			this.props.getVariables('PaymentTerm');
			this.props.getVariables('Status');
			this.props.getVariables('SalesTaxRule');
			this.props.getVariables('AttributeSet');
			this.props.getVariables('PriceTierName');
			this.props.getVariables('Location');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
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
			console.log(variable);
			this.props.getVariable(this.state.variable.get('typeName'), variable);
		}
		this.getData();

	}
	
	checkRequiredField(variable) {
		let message = '';
		if (variable.get('general').get('variableName') === '') {
			message = message + ' Please provide a Customer Name  \n';
			 customErrorMessage(' Customer Name is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('status') === '') {
			message = message + ' Please choose the Status \n';

			 customErrorMessage('status is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('taxRule') === '') {
			message = message + ' Please choose the TaxRule  \n';
			 customErrorMessage('taxRule is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('paymentTerm') === '') {
			message = message + ' Please choose the Payment Term \n';
			 customErrorMessage('paymentTerm is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('general').get('values').get('currency') === '') {
			message = message + 'Please choose a Currency  \n';

			 customErrorMessage('currency is missing');
			this.setState({ createCustomer: false });
		}
		if (variable.get('contacts').length === 0) {
			message = message + ' Add at least One Contact field \n';

		 customErrorMessage('Add at least One Contact field');
			this.setState({ createCustomer: false });
		}
		if (variable.get('addresses').length === 0) {
			message = message + ' Add at least One Address field \n';

			 customErrorMessage('Add at least One Address field');
			this.setState({ createCustomer: false });
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

	render() {
		console.log(this.props.match)
		return (
			<Container>
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={2} />
				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton
								onClick={(e) => {
									if (this.props.match.params.variableName) {
										this.props.updateVariable(this.state.prevVariable, this.state.variable);
										console.log('update me gya ');
									} else {
										new Promise((resolve) => {
											resolve(this.checkRequiredField(this.state.variable.get('values')));
										}).then(() => {
											if (this.state.createCustomer) {
												this.props.createVariable(this.state.variable).then((status) => {
													if (status === 200) {
														successMessage(' Customer Created');
													}
												});
											}
											this.setState({ createCustomer: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<CustomerGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						<HorizontaListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList>
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
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontaListPageBlock>
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
	updateVariable,
	getVariables
})(Customer);

export const HorizontalistPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const HorizontalBlockListOuter = styled.div`
	width: 100%;
	position: relative;
	display: block;
`;
export const HorizontalBlockListInnerWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
`;
export const HoizontalBlockList = styled.ul`
	width: 212px;
	height: 40px;
	padding-bottom: 0%;
	transform: translate3d(0px, 0px, 0px);
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	z-index: 1;
	min-width: 100%;
	padding-left: 0;
	list-style: none outside none;
	transition: all 1s;
	transition-property: transform, height;
	justify-content: start;
	float: left;
`;

export const HoizontalBlockListItems = styled.li`
	margin-right: 0px;
	display: flex;
	white-space: nowrap;
	height: 40px;
	float: left;
	margin-right: 10px;
	text-align: -webkit-match-parent;
	list-style: none outside none;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockListItemBUtton = styled.button`
	height: 40px;
	width: 100%;
	border-radius: 4px;
	font-size: 13px;
	font-size: 13px;
	font-weight: 600;
	color: #3b3b3b;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;

	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const Container = styled.div`
	padding: 0;
	width: 100%;
	min-width: 860px;
	margin-top: 65px;
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	background-color: #e3e4e8;
	@media (max-width: 1200px) {
		flex-direction: column !important;
		padding: 20px 20px 0 20px !important;
	}
`;

const PageWrapper = styled.div`
	 flex: 1;
    overflow: hidde
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		margin: 20px 20px 0 20px;
		width: 75%;

	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 80%;
	}
`;

const PageSidebar = styled.div`
	width: 236px;
	min-width: 236px;
	padding: 20px 20px 0 20px;
	background: #fff;
	border-right: 1px solid #e0e1e7;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
	@media (max-width: 1200px) {
		width: 100%;
		height: auto;
		padding: 10px;
		margin-bottom: 20px;
		background: #fff;
		border-right: 0 !important;
		border-radius: 6px;
		position: static;
		overflow: hidden;
	}
	@media (min-width: 1201px) {
		margin: 20px 0 20px 5px;
	}
`;

const VerticalWrapper = styled.div`
	display: block;
	width: 100%;
	@media (max-width: 1200px) {
		display: none;
	}
`;

const NavList = styled.ul`
	width: 100%;
	float: left;
	margin-bottom: 20px;
	list-style: none;
	height: 40px;

	@media (max-width: 1200px) {
		width: max-content;
		padding: 0px 32px;
		transform: translate3d(0px, 0px, 0px);
		overflow: hidden;
		margin-bottom: 0;
	}
`;
const NavListItems = styled.li`
	width: 100%;
	float: left;
	white-space: nowrap;
	@media (max-width: 1200px) {
		width: auto;
		float: left;
		margin-right: 8px;
		white-space: nowrap;
	}
`;
const NavButton = styled.button`
	height: 40px;
	width: 100%;
	font-size: 13px;
	border-radius: 4px;
	font-size: 13px;
	color: #707887;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-weight: 500;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	outline: none;
	&:active {
		background: #f1f6fb;
		color: #05cbbf;
		outline: none;
		border: 0;
		outline: none;
	}
	&:hover {
		color: black;
	}
	&:hover {
		outline: none;
	}
`;

const ButtonText = styled.span`padding-left: 5px;`;

const HorizontalNavWrapper = styled.div`
	width: 100%;
	position: relative;
	overflow: hidden;
	display: block;
	@media (min-width: 1201px) {
		display: none;
	}
`;
const HorizontalNav = styled.div`
	width: calc(100% - 80px);
	width: 100%;
	overflow: scroll;
	position: relative;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
`;

const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;
const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none;
`;


export const HorizontaListPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const BlockListItemButton = styled.button`
	height: 40px;
	width: 100%;
	border-radius: 4px;
	font-size: 13px;
	font-size: 13px;
	font-weight: 600;
	color: #3b3b3b;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;
	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;
