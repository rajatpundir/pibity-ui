import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';

class ProductGeneralDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable
		};
		this.onChange = this.onChange.bind(this);
		this.onVariableNameChange = this.onVariableNameChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('BOM');
		this.props.getVariables('ProductStatus');
		this.props.getVariables('DropShip');
		this.props.getVariables('ProductType');
		this.props.getVariables('ProductDiscount');
		this.props.getVariables('PurchaseTaxRule');
		this.props.getVariables('AttributeSet');
		this.props.getVariables('Brand');
		this.props.getVariables('SalesTaxRule');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('CostingMethod');
		this.props.getVariables('Location');
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

	render() {
		return (
			<PageBlock style={{ display: 'block' }} id="product">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemWrapper>Active</LeftItemWrapper>
						<LeftItemH1>New Product</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
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
											this.onChange({ target: { name: 'productType', value: option.value } });
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
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('productCostingMethod'),
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
											this.onChange({ target: { name: 'unitOfMeasure', value: option.value } });
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
											this.onChange({ target: { name: 'dropShip', value: option.value } });
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
											this.onChange({ target: { name: 'billOfMaterial', value: option.value } });
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
											this.onChange({ target: { name: 'purchaseTaxRule', value: option.value } });
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
											this.onChange({ target: { name: 'salesTaxRule', value: option.value } });
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
											this.onChange({ target: { name: 'productDiscount', value: option.value } });
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
											this.onChange({ target: { name: 'productStatus', value: option.value } });
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
											this.onChange({ target: { name: 'defaultLocation', value: option.value } });
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
											value: this.state.variable.get('values').get('additionalAttributeSet'),
											label: this.state.variable.get('values').get('additionalAttributeSet')
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
})(ProductGeneralDetails);

const LeftItemWrapper = styled.div`
	background-color: #25c99f;
	border: 1px solid #25c99f;
	color: #f1f6fb;
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
	margin-right: 10px;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;

const InputFieldContainer = styled.div`
	display: flex;
	display: -ms-flexbox;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
`;
const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bold;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;
const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%'
}))`
flex-basis: ${(props) => props.flexBasis};`;

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;
const Required = styled.span`
	display: inline-block;
	padding: 0 !important;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	white-space: nowrap;
	color: #3b3b3b;
	user-select: none;
	pointer-events: none;
`;
const InputColumnWrapper = styled.div`
	flex-basis: calc(100% / 3 - 12px) !important;
	width: 30%;
	@media (max-width: 991px) {
		flex-basis: 100% !important;
		justify-content: space-between;
		display: flex;
		flex-flow: wrap;
	}
`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;
const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const SelectWrapper = styled.div`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	position: absolute;
	top: -6px;
	left: 7px;
	padding: 0 3px;
	background-color: #fff;
	white-space: nowrap;
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	&:before {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const PageBlock = styled.div`
	display: none;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const PageToolbar = styled.div`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px;
`;
