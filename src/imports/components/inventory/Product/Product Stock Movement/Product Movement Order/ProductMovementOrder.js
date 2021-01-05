import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../../main/Notification';
import { clearErrors } from '../../../../../redux/actions/errors';
import CheckIcon from '@material-ui/icons/Check';
import { getVariable, objToMapRec, getVariables, mapToObjectRec } from '../../../../../redux/actions/variables';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import SelectorganizationModal from '../../../../main/Modal/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,
	SaveButtonContaier,
	SaveButton
} from '../../../../../styles/inventory/Style';
import ProductMovementOrderDetails from './ProductMovementOrderDetails';
import CreateProductMovementModal from '../Product Movement Invoice/CreateProductMovementInvoiceModal';

class ProductMovementOrder extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			createProductMovementOrder: true,
			isCreateInvoiceModalOpen: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			fromProductStore: {},
			productOrdered: {},
			variable: new Map([
				[ 'typeName', 'ProductMovementOrder' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'product', '' ],
						[ 'date', '' ],
						[ 'toLocation', '' ],
						[ 'fromLocation', '' ],
						[ 'toProductStore', '' ],
						[ 'fromProductStore', '' ],
						[ 'availableQuantity', '' ],
						[ 'requestedQuantity', '' ],
						[ 'movementType', 'Internal' ],
						[ 'status', '' ],
						[ 'comments', '' ]
					])
				]
			])
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseCreateInvoiceModal = this.onCloseCreateInvoiceModal.bind(this);
		this.onOpenCreateInvoiceModal = this.onOpenCreateInvoiceModal.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.ProductMovementOrder &&
			nextProps.variables.ProductStore &&
			nextProps.variables.Product
		) {
			const variable = nextProps.variables.ProductMovementOrder.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const fromProductStore = nextProps.variables.ProductStore.filter(
					(productStore) => productStore.variableName === variable.values.fromProductStore
				)[0];
				const productOrdered = nextProps.variables.Product.filter(
					(product) => product.variableName === variable.values.product
				)[0];
				console.log(fromProductStore);
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					fromProductStore: fromProductStore,
					productOrdered: productOrdered
				};
			}
		}
		return prevState;
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Product');
		this.props.getVariables('TaxRule');
		this.props.getVariables('ProductStore');
		this.props.getVariables('Location');
		this.props.getVariables('ProductMovementType');
		this.props.getVariables('ProductMovementOrderStatus');
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
		if (variable.get('product') === '') {
			// message = message + ' Please provide a Customer Name  \n';
			customErrorMessage(' Product Name is missing');
			this.setState({ createProductMovementOrder: false });
		}
		if (variable.get('toLocation') === '') {
			// message = message + ' Please choose the Status \n';
			customErrorMessage('location is missing');
			this.setState({ createProductMovementOrder: false });
		}
		if (variable.get('fromLocation') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage('location is missing');
			this.setState({ createProductMovementOrder: false });
		}
		if (variable.get('date') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage(' Date is missing');
			this.setState({ createProductMovementOrder: false });
		}
		if (variable.get('requestedQuantity') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage(' requestedQuantity is missing');
			this.setState({ createProductMovementOrder: false });
		}
	}

	updateDetails(details, selectedProduct, selectedLocationVariable) {
		const variable = cloneDeep(this.state.variable);
		variable.set('values', details);
		this.setState({
			variable: variable
		});
	}

	onOpenCreateInvoiceModal() {
		this.setState({ isCreateInvoiceModalOpen: true });
	}

	onCloseCreateInvoiceModal() {
		this.setState({ isCreateInvoiceModalOpen: false });
	}

	render() {
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={2} />
				{this.props.match.params.variableName &&
				this.state.variable.get('values').get('status') === 'Awaiting Order Confirmation' ? (
					<CreateProductMovementModal
						isOpen={this.state.isCreateInvoiceModalOpen}
						onClose={this.onCloseCreateInvoiceModal}
						productMovementOrder={mapToObjectRec(this.state.variable)}
						fromProductStore={this.state.fromProductStore}
						product={this.state.productOrdered}
					/>
				) : (
					undefined
				)}
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
											if (this.state.createProductMovementOrder) {
												this.props
													.executeFuntion(
														mapToObjectRec(this.state.variable.get('values')),
														'createProductMovementOrder'
													)
													.then((response) => {
														if (response.status === 200) {
															successMessage('Order Placed');
														}
													});
											}
											this.setState({ createProductMovementOrder: true });
										});
									}}
								>
									<CheckIcon />
								</SaveButton>
							</SaveButtonContaier>
						)}
						<ProductMovementOrderDetails
							variable={this.state.variable.get('values')}
							updateDetails={this.updateDetails}
							variableName={this.props.match.params.variableName}
							isdisabled={this.props.match.params.variableName ? true : false}
							onOpenCreateInvoiceModal={this.onOpenCreateInvoiceModal}
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
	getVariable,
	getVariables,
	executeFuntion
})(ProductMovementOrder);
