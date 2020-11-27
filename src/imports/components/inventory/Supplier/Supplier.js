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
import SupplierDetails from './SupplierDetails';
import SupplierAddresses from './SupplierAddresses';
import SupplierContacts from './SupplierContacts';
import CheckIcon from '@material-ui/icons/Check';
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
		if (nextProps.match.params.variableName && nextProps.variables.Supplier) {
			const variable = nextProps.variables.Supplier.filter(
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
					this.setState({ prevVariable: objToMapRec(variable) });
				});
		}
		this.getData();
	}

	checkRequiredField(variable) {
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
		if (variable.get('contacts').length === 0) {
			customErrorMessage('Add at least One Contact field');
			this.setState({ createSupplier: false });
		}
		if (variable.get('addresses').length === 0) {
			customErrorMessage('Add at least One Address field');
			this.setState({ createSupplier: false });
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
		return (
			<Container  mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={3} rtl />
				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton
								onClick={(e) => {
									if (this.props.match.params.variableName) {
										this.props.updateVariable(this.state.prevVariable, this.state.variable);
									} else {
										new Promise((resolve) => {
											resolve(this.checkRequiredField(this.state.variable.get('values')));
										}).then(() => {
											if (this.state.createSupplier) {
												this.props.createVariable(this.state.variable).then((status) => {
													if (status === 200) {
														successMessage(' Supplier Created');
													}
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
						<SupplierDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						<HorizontalListPageBlock>
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
						</HorizontalListPageBlock>
						{this.state.visibleSection === 'addresses' && (
							<SupplierAddresses
								list={this.state.variable.get('values').get('addresses')}
								updateAddresses={this.updateAddresses}
							/>
						)}
						{this.state.visibleSection === 'contacts' && (
							<SupplierContacts
								list={this.state.variable.get('values').get('contacts')}
								updateContacts={this.updateContacts}
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
})(Supplier);
