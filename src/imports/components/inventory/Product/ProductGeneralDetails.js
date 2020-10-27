import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import GlobalVariableModal from '../../main/GlobalVariableModal';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
	InputColumnWrapper,
	InputRowWrapper,
	LeftItemWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	SelectAddButton,
	ToolbarLeftItems,
	FormControl
} from '../../../styles/inventory/Style';

class ProductGeneralDetails extends React.Component {
	constructor(props) {
		super();
		this.state = {
			variable: props.variable,
			open: true,
			isCreateTypeVariableModalOpen: false,
			createGlobalVariableTypeName: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onVariableNameChange = this.onVariableNameChange.bind(this);
		this.openCreateVariableModal=this.openCreateVariableModal.bind(this);
		this.onCloseModal=this.onCloseModal.bind(this);
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

	onVariableNameChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set('variableName', e.target.value);
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	}

	openCreateVariableModal(typeName){
		console.log(typeName)
		this.setState({ createGlobalVariableTypeName : typeName },()=>{
			this.setState({isCreateTypeVariableModalOpen:true})
		});
	}

	onCloseModal() {
		this.setState({ isCreateTypeVariableModalOpen : false });
	}

	render() {
		return (
			<React.Fragment>
				<GlobalVariableModal
					onClose={this.onCloseModal}
					isOpen={this.state.isCreateTypeVariableModalOpen}
					typeName={this.state.createGlobalVariableTypeName}
				/>
				<PageBlock paddingBottom="0">
					<PageToolbar>
						<ToolbarLeftItems>
							<LeftItemWrapper backgroundColor="#25c99f">Active</LeftItemWrapper>
							<LeftItemH1>New Product</LeftItemH1>
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
						<InputBody>
							<InputFieldContainer>
								<InputColumnWrapper>
									<FormControl>
										<Input
											name="productSKU"
											type="text"
											placeholder="Product SKU"
											value={this.state.variable.get('values').get('productSKU')}
											onChange={this.onChange}
											required
										/>
										<InputLabel>
											SKU
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="productName"
											type="text"
											placeholder="Product Name"
											value={this.state.variable.get('variableName')}
											onChange={this.onVariableNameChange}
											required
										/>
										<InputLabel>
											Product Name
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('productType'),
													label: this.state.variable.get('values').get('productType')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'productType', value: option.value }
													});
												}}
												options={
													this.props.variables.ProductType !== undefined ? (
														this.props.variables.ProductType.map((variable) => {
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
											Type
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>
											Categoy
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('brand'),
													label: this.state.variable.get('values').get('brand')
												}}
												onChange={(option) => {
													this.onChange({ target: { name: 'brand', value: option.value } });
												}}
												options={
													this.props.variables.Brand !== undefined ? (
														this.props.variables.Brand.map((variable) => {
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
										<InputLabel>Brand</InputLabel>
										<SelectAddButton
											onClick={(e) => {
												this.openCreateVariableModal("Brand")
											}}
										>
											<AddIcon fontSize="large" />{' '}
										</SelectAddButton>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable
														.get('values')
														.get('productCostingMethod'),
													label: this.state.variable.get('values').get('productCostingMethod')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'productCostingMethod', value: option.value }
													});
												}}
												options={
													this.props.variables.CostingMethod !== undefined ? (
														this.props.variables.CostingMethod.map((variable) => {
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
											Costing Method
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('unitOfMeasure'),
													label: this.state.variable.get('values').get('unitOfMeasure')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'unitOfMeasure', value: option.value }
													});
												}}
												options={
													this.props.variables.UnitOfMeasure !== undefined ? (
														this.props.variables.UnitOfMeasure.map((variable) => {
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
											Unit of Measure
											<Required>*</Required>
										</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('dropShip'),
													label: this.state.variable.get('values').get('dropShip')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'dropShip', value: option.value }
													});
												}}
												options={
													this.props.variables.DropShip !== undefined ? (
														this.props.variables.DropShip.map((variable) => {
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
										<InputLabel>Drop Shihp</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('billOfMaterial'),
													label: this.state.variable.get('values').get('billOfMaterial')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'billOfMaterial', value: option.value }
													});
												}}
												options={
													this.props.variables.BOM !== undefined ? (
														this.props.variables.BOM.map((variable) => {
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

										<InputLabel>Bill of Materials</InputLabel>
									</FormControl>
								</InputColumnWrapper>
								<InputColumnWrapper>
									<FormControl>
										<Input />
										<InputLabel>Inventory Account</InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>Revenue Account</InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>COGS Account</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('purchaseTaxRule'),
													label: this.state.variable.get('values').get('purchaseTaxRule')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'purchaseTaxRule', value: option.value }
													});
												}}
												options={
													this.props.variables.PurchaseTaxRule !== undefined ? (
														this.props.variables.PurchaseTaxRule.map((variable) => {
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
										<InputLabel>Purchase Tax Rule</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('salesTaxRule'),
													label: this.state.variable.get('values').get('salesTaxRule')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'salesTaxRule', value: option.value }
													});
												}}
												options={
													this.props.variables.SalesTaxRule !== undefined ? (
														this.props.variables.SalesTaxRule.map((variable) => {
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
										<InputLabel>Sales Tax Rule</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('productDiscount'),
													label: this.state.variable.get('values').get('productDiscount')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'productDiscount', value: option.value }
													});
												}}
												options={
													this.props.variables.ProductDiscount !== undefined ? (
														this.props.variables.ProductDiscount.map((variable) => {
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
										<InputLabel>Product Discount</InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="stockLocator"
											type="text"
											placeholder="stockLocator"
											value={this.state.variable.get('values').get('stockLocator')}
											onChange={this.onChange}
										/>
										<InputLabel>Stock Locator</InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="productWarranty"
											type="text"
											placeholder="productWarranty"
											value={this.state.variable.get('values').get('productWarranty')}
											onChange={this.onChange}
										/>
										<InputLabel>Warrenty</InputLabel>
									</FormControl>
								</InputColumnWrapper>
								<InputColumnWrapper>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('productStatus'),
													label: this.state.variable.get('values').get('productStatus')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'productStatus', value: option.value }
													});
												}}
												options={
													this.props.variables.ProductStatus !== undefined ? (
														this.props.variables.ProductStatus.map((variable) => {
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
										<InputLabel>Status</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable.get('values').get('defaultLocation'),
													label: this.state.variable.get('values').get('defaultLocation')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'defaultLocation', value: option.value }
													});
												}}
												options={
													this.props.variables.Location !== undefined ? (
														this.props.variables.Location.map((variable) => {
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
										<InputLabel>Default Location</InputLabel>
									</FormControl>
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.variable
														.get('values')
														.get('additionalAttributeSet'),
													label: this.state.variable
														.get('values')
														.get('additionalAttributeSet')
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'additionalAttributeSet', value: option.value }
													});
												}}
												options={
													this.props.variables.AttributeSet !== undefined ? (
														this.props.variables.AttributeSet.map((variable) => {
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
										<InputLabel>Additional Attribute Set </InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="barcode"
											type="Text"
											placeholder="barcode"
											value={this.state.variable.get('values').get('barcode')}
											onChange={this.onChange}
										/>
										<InputLabel>Barcode</InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="minimumBeforeReorder"
											type="Number"
											placeholder="minimumBeforeReorder"
											value={this.state.variable.get('values').get('minimumBeforeReorder')}
											onChange={this.onChange}
										/>
										<InputLabel>Minimum Before Reorder</InputLabel>
									</FormControl>
									<FormControl>
										<Input
											name="minimumReorderQuantity"
											type="Number"
											placeholder="minimumReorderQuantity"
											value={this.state.variable.get('values').get('minimumReorderQuantity')}
											onChange={this.onChange}
										/>
										<InputLabel>Reorder Quantity</InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>Tags </InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>Pick Zones</InputLabel>
									</FormControl>
									<FormControl>
										<Input />
										<InputLabel>I am Selling this Product</InputLabel>
									</FormControl>
								</InputColumnWrapper>
								<InputRowWrapper>
									<FormControl>
										<Input
											name="comment"
											type="Text"
											placeholder="comment"
											value={this.state.variable.get('values').get('comment')}
											onChange={this.onChange}
										/>
										<InputLabel>Comment</InputLabel>
									</FormControl>
								</InputRowWrapper>
								<InputRowWrapper>
									<FormControl>
										<Input
											name="shortDescription"
											type="Text"
											placeholder="shortDescription"
											value={this.state.variable.get('values').get('shortDescription')}
											onChange={this.onChange}
										/>
										<InputLabel>Description</InputLabel>
									</FormControl>
								</InputRowWrapper>
								<InputRowWrapper>
									<FormControl>
										<Input
											name="internalNote"
											type="Text"
											placeholder="internalNote"
											value={this.state.variable.get('values').get('internalNote')}
											onChange={this.onChange}
										/>
										<InputLabel>Internal Note</InputLabel>
									</FormControl>
								</InputRowWrapper>
							</InputFieldContainer>
						</InputBody>
					</Collapse>
				</PageBlock>
			</React.Fragment>
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
})(ProductGeneralDetails);
