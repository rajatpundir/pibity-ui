import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../../main/Notification';
import { clearErrors } from '../../../../../redux/actions/errors';
import CheckIcon from '@material-ui/icons/Check';
import {
	getVariable,
	objToMapRec,
	getVariables,
	mapToObjectRec,
	createVariables
} from '../../../../../redux/actions/variables';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import SelectorganizationModal from '../../../../main/Modal/SelectorganizationModal';
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
} from '../../../../../styles/inventory/Style';
import ProductMovementOrderDetails from './ProductMovementOrderDetails';
import ProductMovementOrderInvoice from './ProductMovementOrderInvoice';
import CreateProductMovementModal from '../Product Movement Invoice/CreateProductMovementInvoiceModal';
import ProductMovementRecord from './ProductMovementRecord';

class ProductMovementOrder extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			visibleSection:'invoice',
			createProductMovementOrder: true,
			isCreateInvoiceModalOpen: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			productOrdered: {},
			variable: new Map([
				[ 'typeName', 'ProductMovementOrder' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'date', '' ],
						[ 'toLocation', '' ],
						[ 'fromLocation', '' ],
						[ 'movementType', 'Internal' ],
						[ 'status', '' ],
						[ 'comments', '' ]
					])
				]
			]),
			orderItems: [],
			productMovementRecords: []
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateOrderItems = this.updateOrderItems.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseCreateInvoiceModal = this.onCloseCreateInvoiceModal.bind(this);
		this.onOpenCreateInvoiceModal = this.onOpenCreateInvoiceModal.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.ProductMovementOrder &&
			nextProps.variables.ProductMovementOrderItems &&
			nextProps.variables.ProductMovementOrderInvoice &&
			nextProps.variables.ProductMovementRecord
		) {
			const variable = nextProps.variables.ProductMovementOrder.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const invoice = nextProps.variables.ProductMovementOrderInvoice.filter(
					(variable) => variable.values.productMovementOrder === nextProps.match.params.variableName
				)[0];
				const productMovementRecords = nextProps.variables.ProductMovementRecord.filter(
					(variable) => variable.values.referenceInvoice === invoice.variableName
				);
				const orderItems = nextProps.variables.ProductMovementOrderItems
					.filter((items) => items.values.orderId === variable.variableName)
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
					orderItems: orderItems,
					productMovementRecords: productMovementRecords
				};
			}
			if (variable) {
				const invoice = nextProps.variables.ProductMovementOrderInvoice.filter(
					(variable) => variable.values.productMovementOrder === nextProps.match.params.variableName
				)[0];
				const productMovementRecords = nextProps.variables.ProductMovementRecord.filter(
					(variable) => variable.values.referenceInvoice === invoice.variableName
				);
				return {
					...prevState,
					productMovementRecords: productMovementRecords
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
		this.props.getVariables('ProductMovementOrder');
		this.props.getVariables('ProductMovementOrderItems');
		this.props.getVariables('ProductMovementOrderInvoice');
		this.props.getVariables('ProductMovementRecord');
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
	}

	updateDetails(details) {
		const variable = cloneDeep(this.state.variable);
		variable.set('values', details);
		this.setState({
			variable: variable
		});
	}
	updateOrderItems(orderItems) {
		this.setState({
			orderItems: orderItems
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
						orderItems={this.state.orderItems}
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
										console.log(this.state);

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
															console.log(response.data.variableName);
															this.props.createVariables(
																this.addKeyToList(
																	this.state.orderItems,
																	'orderId',
																	response.data.productMovementOrder.variableName
																)
															);
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
							orderItems={this.state.orderItems}
							updateDetails={this.updateDetails}
							updateOrderItems={this.updateOrderItems}
							variableName={this.props.match.params.variableName}
							isdisabled={this.props.match.params.variableName ? true : false}
							onOpenCreateInvoiceModal={this.onOpenCreateInvoiceModal}
						/>
						<HorizontalListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'invoice' });
												}}
											>
												Invocie
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'movementRecord' });
												}}
											>
												Product Movement Record
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						{this.state.variable.get('values').get('status') === 'Order Accepted' &&
						this.state.visibleSection === 'invoice' ? (
							<ProductMovementOrderInvoice productMovementOrder={this.props.match.params.variableName} />
						) : (
							undefined
						)}
						{this.state.variable.get('values').get('status') === 'Order Accepted' &&
						this.state.visibleSection === 'movementRecord' ? (
							<ProductMovementRecord productMovementRecords={this.state.productMovementRecords} />
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
	getVariable,
	getVariables,
	executeFuntion,
	createVariables
})(ProductMovementOrder);
