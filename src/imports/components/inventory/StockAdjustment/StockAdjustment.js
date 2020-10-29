import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import CheckIcon from '@material-ui/icons/Check';
import {
	createVariable,
	getVariable,
	objToMapRec,
	getVariables,
	updateProductStockVariable
} from '../../../redux/actions/variables';
import StockAdjustmentDetail from './StockAdjustmentDetail';
import SelectorganizationModal from '../../main/SelectorganizationModal';
import { Container, PageWrapper, PageBody, SaveButtonContaier, SaveButton } from '../../../styles/inventory/Style';

class StockAdjustment extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			adjustStock: true,
			prevPropVariable: {},
			selectedProduct: {},
			selectedLocationVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'StockAdjustment' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'product', '' ],
						[ 'date', '' ],
						[ 'unit', '' ],
						[ 'location', '' ],
						[ 'onHand', '' ],
						[ 'newQuantity', 0 ],
						[ 'variance', 0 ],
						[ 'account', '' ],
						[ 'comments', '' ]
					])
				]
			])
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateProductVariabe = this.updateProductVariabe.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.StockAdjustment) {
			const variable = nextProps.variables.StockAdjustment.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
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
		this.props.getVariables('Product');
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
			this.setState({ adjustStock: false });
		}
		if (variable.get('location') === '') {
			// message = message + ' Please choose the Status \n';
			customErrorMessage('location is missing');
			this.setState({ adjustStock: false });
		}
		if (variable.get('newQuantity') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage(' Add New Quantity is missing');
			this.setState({ adjustStock: false });
		}
		if (variable.get('date') === '') {
			// message = message + ' Please choose the TaxRule  \n';
			customErrorMessage(' Add New Quantity is missing');
			this.setState({ adjustStock: false });
		}
	}

	updateDetails(details, selectedProduct, selectedLocationVariable) {
		const variable = cloneDeep(this.state.variable);
		variable.set('values', details);
		this.setState({
			variable: variable,
			selectedProduct: selectedProduct,
			selectedLocationVariable: selectedLocationVariable
		});
	}

	updateProductVariabe() {
		const variable = {
			organization: this.state.selectedProduct.organization,
			typeName: this.state.selectedProduct.typeName,
			variableName: this.state.selectedProduct.variableName,
			values: {
				productStock: {
					update: [
						{
							variableName: this.state.selectedLocationVariable.variableName,
							values: {
								onHand: this.state.variable.get('values').get('newQuantity'),
								stockValue: this.state.variable.get('values').get('newQuantity'),
								available: this.state.variable.get('values').get('newQuantity')
							}
						}
					]
				}
			}
		};
		this.props.updateProductStockVariable(variable);
	}

	render() {
		return (
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
											if (this.state.adjustStock) {
												this.props.createVariable(this.state.variable).then((status) => {
													if (status === 200) {
														this.updateProductVariabe();
														successMessage(' Stock Updated');
													}
												});
											}
											this.setState({ adjustStock: true });
										});
									}}
								>
									<CheckIcon />
								</SaveButton>
							</SaveButtonContaier>
						)}

						<StockAdjustmentDetail
							variable={this.state.variable.get('values')}
							updateDetails={this.updateDetails}
							isdisabled={this.props.match.params.variableName ? true : false}
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
	getVariables,
	updateProductStockVariable
})(StockAdjustment);
