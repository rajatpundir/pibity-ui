import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
	InputColumnWrapper,
	InputRowWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarLeftItems,
	FormControl
} from '../../../styles/inventory/Style';

class StockAdjustmentDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable,
			selectedProduct: '',
			selectedProductStockLocations: [],
			selectedLocationVariable:{},
			open: true
		};
		this.onChange = this.onChange.bind(this);
		this.onProductChange = this.onProductChange.bind(this);
		this.onSelectLocation=this.onSelectLocation.bind(this);
		this.onNewQuantityChange=this.onNewQuantityChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable
		};
	}

	onProductChange(e) {
		const variable = cloneDeep(this.state.variable);
		const selectedProduct = this.props.variables.Product.filter((product) => {
			return product.variableName === e.target.value;
		})[0];
		const productStockLocations = selectedProduct.values.productStock.map((stock) => {
			return stock.values.location;
		});
		this.setState({
			selectedProduct: selectedProduct,
			selectedProductStockLocations: productStockLocations
		});
		variable.set(e.target.name, e.target.value);
		variable.set('unit', selectedProduct.values.general.values.unitOfMeasure);
		this.setState({ variable: variable });
		this.props.updateDetails(variable,selectedProduct,this.state.selectedLocationVariable);
	}

	onSelectLocation(e){
		const variable = cloneDeep(this.state.variable);
		const selectedLocationVariable = this.state.selectedProduct.values.productStock.filter((stock) => {
			return stock.values.location === e.target.value;
		})[0]
		const onHand=selectedLocationVariable.values.onHand
		variable.set(e.target.name, e.target.value);
		variable.set("onHand",onHand)
		this.setState({ variable: variable,
			selectedLocationVariable:selectedLocationVariable });
		this.props.updateDetails(variable,this.state.selectedProduct,selectedLocationVariable);
	}

	onNewQuantityChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set(e.target.name, e.target.value);
		variable.set("variance",e.target.value - this.state.variable.get('onHand'))
		this.setState({ variable: variable });
		this.props.updateDetails(variable,this.state.selectedProduct,this.state.selectedLocationVariable);
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set(e.target.name, e.target.value);
		this.setState({ variable: variable });
		this.props.updateDetails(variable,this.state.selectedProduct,this.state.selectedLocationVariable);
	}

	render() {
		return (
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Stock Adjustment</LeftItemH1>
					</ToolbarLeftItems>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => this.setState({ open: !this.state.open })}
					>
						{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</PageToolbar>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody overflow="visible">
						<InputFieldContainer>
							<InputColumnWrapper>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('product'),
												label: this.state.variable.get('product')
											}}
											onChange={(option) => {
												this.onProductChange({
													target: { name: 'product', value: option.value }
												});
											}}
											options={
												this.props.variables.Product !== undefined ? (
													this.props.variables.Product.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.variableName
														};
													})
												) : (
													[]
												)
											}
										/>
									</SelectWrapper>
									<InputLabel>
										Product<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('location'),
												label: this.state.variable.get('location')
											}}
											onChange={(option) => {
												this.onSelectLocation({ target: { name: 'location', value: option.value } });
											}}
											options={
												this.state.selectedProductStockLocations.length !== 0 ? (
													this.state.selectedProductStockLocations.map((location) => {
														return {
															value: location,
															label: location
														};
													})
												) : (
													[]
												)
											}
										/>
									</SelectWrapper>
									<InputLabel>
										Location <Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="unit"
										type="text"
										placeholder="unit"
										value={this.state.variable.get('unit')}
										onChange={this.onChange}
										disabled
									/>
									<InputLabel>Unit</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="date"
										type="date"
										placeholder="date"
										value={this.state.variable.get('date')}
										onChange={this.onChange}
									/>
									<InputLabel> Date</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="account"
										type="number"
										placeholder="account"
										value={this.state.variable.get('account')}
										onChange={this.onChange}
										disabled
									/>
									<InputLabel>Account</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="onHand"
										type="number"
										placeholder="onHand"
										value={this.state.variable.get('onHand')}
										onChange={this.onChange}
										disabled
									/>
									<InputLabel> On Hand</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="newQuantity"
										type="number"
										placeholder="0"
										value={this.state.variable.get('newQuantity')}
										onChange={this.onNewQuantityChange}
									/>
									<InputLabel>New Quantity</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="variance"
										type="number"
										placeholder="variance"
										value={
											this.state.variable.get('newQuantity') - this.state.variable.get('onHand')
										}
										disabled
									/>
									<InputLabel>Variance</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputRowWrapper>
								<FormControl>
									<Input
										name="comments"
										type="text"
										placeholder="comments"
										value={this.state.variable.get('comments')}
										onChange={this.onChange}
									/>
									<InputLabel>Comment</InputLabel>
								</FormControl>
							</InputRowWrapper>
						</InputFieldContainer>
					</InputBody>
				</Collapse>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	getVariables
})(StockAdjustmentDetails);
