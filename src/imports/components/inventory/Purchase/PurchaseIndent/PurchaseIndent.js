import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import CheckIcon from '@material-ui/icons/Check';
import {
	getVariable,
	objToMapRec,
	getVariables,
	mapToObjectRec,
	createVariable,
	createVariables
} from '../../../../redux/actions/variables';
import { executeFuntion } from '../../../../redux/actions/executeFuntion';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import { Container, PageWrapper, PageBody, SaveButtonContaier, SaveButton } from '../../../../styles/inventory/Style';
import PurchaseIndentDetail from './PurchaseIndentDetail';
import Lottie from 'react-lottie';
import * as loadingData from '../../../main/loading.json';
import LoadingOverlay from 'react-loading-overlay';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loadingData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

class PurchaseIndent extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			loading: false,
			visibleSection: 'invoice',
			createPurchaseIndent: true,
			isCreateInvoiceModalOpen: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			productOrdered: {},
			variable: new Map([
				[ 'typeName', 'PurchaseIndent' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'date', '' ],
						[ 'indentNumber', '' ],
						[ 'raisedBy', '' ],
						[ 'approvedBy', '' ],
						[ 'authorizedBy', '' ],
						[ 'indentPurpose', '' ],
						[ 'isApproved', false ],
						[ 'isAuthorized', false ]
					])
				]
			]),
			indentItems: []
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateIndentItems = this.updateIndentItems.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseAlert = this.onCloseAlert.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.PurchaseIndent &&
			nextProps.variables.PurchaseIndentItem
		) {
			const variable = nextProps.variables.PurchaseIndent.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const indentItems = nextProps.variables.PurchaseIndentItem
					.filter((items) => items.values.purchaseIndent === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					indentItems: indentItems
				};
			}
		}
		return prevState;
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Product');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('PurchaseIndent');
		this.props.getVariables('PurchaseIndentItem');
	}

	componentDidMount() {
		window.scrollTo(0, 0);
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

	addKeyToList(items, key, value) {
		return items.map((listVariable) => {
			const values = listVariable.get('values');
			values.set(key, value);
			listVariable.set('values', values);
			return listVariable;
		});
	}

	checkRequiredField(variable) {
		// let message = ''; // To show error in one popUp
		if (variable.get('indentNummber') === '') {
			// message = message + ' Please choose the Status \n';
			customErrorMessage('indentNummber is missing');
			this.setState({ createPurchaseIndent: false });
		}
		if (variable.get('date') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage(' Date is missing');
			this.setState({ createPurchaseIndent: false });
		}
	}

	updateDetails(details) {
		const variable = cloneDeep(this.state.variable);
		variable.set('values', details);
		this.setState({
			variable: variable
		});
	}
	updateIndentItems(indentItems) {
		this.setState({
			indentItems: indentItems
		});
	}

	onCloseAlert() {
		this.setState({
			createPurchaseIndent: true,
			variable: new Map([
				[ 'typeName', 'PurchaseIndent' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'date', '' ],
						[ 'indentNumber', '' ],
						[ 'raisedBy', '' ],
						[ 'approvedBy', '' ],
						[ 'authorizedBy', '' ],
						[ 'indentPurpose', '' ],
						[ 'isApproved', false ],
						[ 'isAuthorized', false ]
					])
				]
			]),
			indentItems: []
		});
	}

	alert() {
		confirmAlert({
			title: 'Create New PurchaseIndent',
			buttons: [
				{
					label: 'Continue',
					onClick: () => this.onCloseAlert()
				},
				{
					label: 'Exit',
					onClick: () => this.props.history.push('/purchaseIndentList')
				}
			],
			closeOnEscape: false,
			closeOnClickOutside: false
		});
	}

	render() {
		return (
			<LoadingOverlay
				active={this.state.loading}
				spinner={<Lottie options={defaultOptions} height={240} width={240} />}
			>
				<Container mediaPadding="20px 20px 0 20px">
					<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
					<CustomNotification limit={2} />
					<PageWrapper>
						<PageBody>
							{this.props.match.params.variableName ? (
								undefined
							) : (
								<SaveButtonContaier>
									<SaveButton
										onClick={(e) => {
											new Promise((resolve) => {
												resolve(this.checkRequiredField(this.state.variable.get('values')));
											}).then(() => {
												if (this.state.createPurchaseIndent) {
													// this.setState({ loading: true });
													this.props.createVariable(this.state.variable).then((response) => {
														if (response.status === 200) {
															this.props.createVariables(
																this.addKeyToList(
																	this.state.indentItems,
																	'purchaseIndent',
																	response.data.variableName
																)
															);
															//TODo Add reidrect confirmation modal
															new Promise((resolve) => {
																resolve(successMessage('Purchase Indent Created'));
															}).then(() => {
																// setTimeout(() => {
																// 	this.setState({ loading: false });
																// }, 1000)
																this.alert();
															});
														}
													});
												}
											});
										}}
									>
										<CheckIcon />
									</SaveButton>
								</SaveButtonContaier>
							)}
							<PurchaseIndentDetail
								variable={this.state.variable.get('values')}
								indentItems={this.state.indentItems}
								updateDetails={this.updateDetails}
								updateIndentItems={this.updateIndentItems}
								isdisabled={this.props.match.params.variableName ? true : false}
							/>
						</PageBody>
					</PageWrapper>
				</Container>
			</LoadingOverlay>
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
	getVariable,
	getVariables,
	executeFuntion,
	createVariables,
	createVariable
})(PurchaseIndent);
