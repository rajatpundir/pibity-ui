import React from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

class ProductGeneralDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            productName: '',
			additionalAttributeSet: '',
			barcode: '',
			billOfMaterial: '',
			brand: '',
			comment: '',
			defaultLocation: '',
			description: '',
			dropShip: '',
			minimumBeforeReorder: '',
			minimumReorderQuantity: '',
			productCostingMethod: '',
			productSKU: '',
			productStatus: '',
			productType: '',
			productWarranty: '',
			purchaseTaxRule: '',
			salesTaxRule: '',
			shortDescription: '',
			stockLocator: '',
			unitOfMeasure: '',
			productDiscount: '',
			internalNote: '',
			tags: '',
			pickZones: '',
			value: {},
			type: {},
			generalDetails:{},
			variableName: '',
            values: new Map(),
            general:{}
		};
        this.onChange = this.onChange.bind(this);
        this.systemTypes = Array.from([ 'Text', 'Number', 'Decimal', 'Boolean', 'Formula', 'List' ]);
    }
    
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (this.props.generalDetails !== null) {
			if (typeof this.props.generalDetails.type === 'object' && this.props.generalDetails.type !== null) {
				if (this.props.generalDetails.type.keys.hasOwnProperty(e.target.name)) {
					const values = cloneDeep(this.state.values);
					values.set(e.target.name, e.target.value);
					this.setState({ values: values });
				}
			}
		}
	}

	mapToObjectRec = (m) => {
		let lo = {};
		for (let [ k, v ] of m) {
			if (v instanceof Map) {
				lo[k] = this.mapToObjectRec(v);
			} else {
				lo[k] = v;
			}
		}
		return lo;
    };
    
	saveGeneralDetails(e){
		var productGeneralDetails={
			variableName:this.state.productName,
			values:this.mapToObjectRec(this.state.values)
		}
		this.setState({general:productGeneralDetails},()=>{
            this.props.sendData(this.state.productName,this.state.general);
		})
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
												value={this.state.productSKU}
												onChange={this.onChange}
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
												value={this.state.productName}
												onChange={this.onChange}
											/>
											<InputLabel>
												Product Name
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="productType"
												type="text"
												placeholder="Product Type"
												value={this.state.productType}
												onChange={this.onChange}
											/>
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
											<Input
												name="brand"
												type="text"
												placeholder="brand"
												value={this.state.brand}
												onChange={this.onChange}
											/>
											<InputLabel>Brand</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="productCostingMethod"
												type="text"
												placeholder="Default "
												value={this.state.productCostingMethod}
												onChange={this.onChange}
											/>
											<InputLabel>
												Costing Method
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="unitOfMeasure"
												type="text"
												placeholder="Unit Of Measure"
												value={this.state.unitOfMeasure}
												onChange={this.onChange}
											/>
											<InputLabel>
												Unit of Measure
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="dropShip"
												type="text"
												placeholder="Default"
												value={this.state.dropDhip}
												onChange={this.onChange}
											/>
											<InputLabel>Drop Shihp</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="billOfMaterial"
												type="text"
												placeholder="Default"
												value={this.state.billOfMaterial}
												onChange={this.onChange}
											/>
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
											<Input
												name="purchaseTaxRule"
												type="text"
												placeholder="Default"
												value={this.state.purchaseTaxRule}
												onChange={this.onChange}
											/>
											<InputLabel>Purchase Tax Rule</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="salesTaxRule"
												type="text"
												placeholder="Default"
												value={this.state.salesTaxRule}
												onChange={this.onChange}
											/>
											<InputLabel>Sales Tax Rule</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="productDiscount"
												type="text"
												placeholder="Default"
												value={this.state.productDiscount}
												onChange={this.onChange}
											/>
											<InputLabel>Product Discount</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="stockLocator"
												type="text"
												placeholder="stockLocator"
												value={this.state.stockLocator}
												onChange={this.onChange}
											/>
											<InputLabel>Stock Locator</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="productWarranty"
												type="text"
												placeholder="productWarranty"
												value={this.state.productWarranty}
												onChange={this.onChange}
											/>
											<InputLabel>Warrenty</InputLabel>
										</FormControl>
									</InputColumnWrapper>
									<InputColumnWrapper>
										<FormControl>
											<Input
												name="productStatus"
												type="text"
												placeholder="Default"
												value={this.state.productStatus}
												onChange={this.onChange}
											/>
											<InputLabel>Status</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="defaultLocation"
												type="text"
												placeholder="Default"
												value={this.state.defaultLocation}
												onChange={this.onChange}
											/>
											<InputLabel>Default Location</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="additionalAttributeSet"
												type="text"
												placeholder="Default"
												value={this.state.additionalAttributeSet}
												onChange={this.onChange}
											/>
											<InputLabel>Additional Attribute Set </InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="barcode"
												type="Text"
												placeholder="barcode"
												value={this.state.barcode}
												onChange={this.onChange}
											/>
											<InputLabel>Barcode</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="minimumBeforeReorder"
												type="Number"
												placeholder="minimumBeforeReorder"
												value={this.state.minimumBeforeReorder}
												onChange={this.onChange}
											/>
											<InputLabel>Minimum Before Reorder</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="minimumReorderQuantity"
												type="Number"
												placeholder="minimumReorderQuantity"
												value={this.state.minimumReorderQuantity}
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
												value={this.state.comment}
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
												value={this.state.shortDescription}
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
												value={this.state.internalNote}
												onChange={this.onChange}
											/>
											<InputLabel>Internal Note</InputLabel>
										</FormControl>
									</InputRowWrapper>
								</InputFieldContainer>
							</InputBody>
							<button onClick={(e) => this.saveGeneralDetails()}>save</button>
						</PageBlock>

		);
	}
}

export default ProductGeneralDetails;

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
	z-index: 20;
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
