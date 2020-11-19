import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import CreditNoteGeneralDetails from './CreditNoteGeneralDetails';
import CreditNoteItems from './CreditNoteItems'
import {
	createVariable,
	getVariable,
	updateVariable,
	objToMapRec,
	getVariables
} from '../../../../redux/actions/variables';
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from '../../../main/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,

	SaveButtonContaier,
	SaveButton,

} from '../../../../styles/inventory/Style';


class CreditNote extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			createCustomer: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				['typeName', 'Customer'],
				['variableName', ''],
				[
					'values',
					new Map([
						[
							'general',
							new Map([
								['variableName', ''],
								[
									'values',
									new Map([
										['to', ''],
										['date', ''],
										['creditNote', ''],
										['reference', ''],
										['branding', ''],

									])
								]
							])
						],
						['creditNoteItem', []],
						
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

	getData() {
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
		this.props.getVariables('AddressType');
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
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		this.setState({ variable: variable });
	}
	

	updateAddresses(creditNoteItem) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('creditNoteItem', creditNoteItem);
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
		// console.log(this.state.variable.get('values').get('general'));
		
		return (
			<Container mediaPadding="20px 20px 0 20px">
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
						
						<CreditNoteGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						 <CreditNoteItems
							list={this.state.variable.get('values').get('creditNoteItem')}
							updateAddresses={this.updateAddresses}
						/> 
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
})(CreditNote);