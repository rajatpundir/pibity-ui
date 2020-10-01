import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, CustomNotification, successMessage } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import {
	createVariable,
	getVariables,
	getVariable,
	updateVariable,
	objToMapRec
} from '../../../redux/actions/variables';
import ProductDimension from './ProductDimension';
import CustomPrice from './CustomPrice';
import Stock from './Stock';
import ReorderLevels from './ReorderLevels';
import SupplierProduct from './SupplierProduct';
import ProductGeneralDetails from './ProductGeneralDetails';
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from '../../main/SelectorganizationModal';
import {
	PageWrapper,
	PageBody,
	PageBlock,
	PageToolbar,
	ToolbarLeftItems,
	LeftItemH1,
	InputBody,
	SaveButtonContaier,
	SaveButton
} from '../Purchase/Style';

class Product extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			createProduct: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Product' ],
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
										[ 'additionalAttributeSet', '' ],
										[ 'barcode', '' ],
										[ 'billOfMaterial', '' ],
										[ 'brand', '' ],
										[ 'comment', '' ],
										[ 'defaultLocation', '' ],
										[ 'description', '' ],
										[ 'dropShip', '' ],
										[ 'minimumBeforeReorder', '' ],
										[ 'minimumReorderQuantity', '' ],
										[ 'productCostingMethod', '' ],
										[ 'productSKU', '' ],
										[ 'productStatus', '' ],
										[ 'productType', '' ],
										[ 'productWarranty', '' ],
										[ 'purchaseTaxRule', '' ],
										[ 'salesTaxRule', '' ],
										[ 'shortDescription', '' ],
										[ 'stockLocator', '' ],
										[ 'unitOfMeasure', '' ],
										[ 'productDiscount', '' ],
										[ 'internalNote', '' ]
									])
								]
							])
						],
						[ 'productHeight', '0' ],
						[ 'productLength', '0' ],
						[ 'productWidth', '0' ],
						[ 'unitOfDimension', '' ],
						[ 'productWeight', '0' ],
						[ 'unitForWeights', '' ],
						[ 'productCustomPrice', [] ],
						[ 'productStock', [] ],
						[ 'productReorderLevels', [] ],
						[ 'supplierLocation', [] ],
						[ 'supplierProduct', [] ]
					])
				]
			]),
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.updateCustomPrice = this.updateCustomPrice.bind(this);
		this.updateProductStock = this.updateProductStock.bind(this);
		this.updateProductReorderLevels = this.updateProductReorderLevels.bind(this);
		this.updateSupplierLocation = this.updateSupplierLocation.bind(this);
		this.updateSupplierProduct = this.updateSupplierProduct.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.onClose = this.onClose.bind(this);
		// this.customErrorMessage = this.customErrorMessage.bind(this);
	}

	divVisibility(divId) {
		var visibleDivId = null;
		if (visibleDivId !== divId) {
			visibleDivId = divId;
		}
		this.hideNonVisibleDivs(visibleDivId);
	}

	hideNonVisibleDivs(visibleDivId) {
		var divs = [
			'product',
			'price',
			'additionalUnitOfMeasure',
			'discounts',
			'reorderLevel',
			'customPrices',
			'suppliers',
			'dimensions',
			'stock',
			'additionalDescription',
			'channels'
		];
		var i, divId, div;
		for (i = 0; i < divs.length; i++) {
			divId = divs[i];
			div = document.getElementById(divId);
			if (div != null) {
				if (visibleDivId === divId) {
					div.style.display = 'block';
				} else if (divId !== 'product') {
					div.style.display = 'none';
				}
			}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Product) {
			const variable = nextProps.variables.Product.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable
				};
			}
		}
		return prevState;
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Customer');
		this.props.getVariables('UnitForWeights');
		this.props.getVariables('UnitForDimensions');
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
		this.props.getVariables('Supplier');
		this.props.getVariables('Currency');
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
					this.setState({ prevVariable: variable });
				});
		}
		this.getData();
	}

	checkRequiredField(variable) {
		if (variable.get('values').get('productSKU') === '') {
			customErrorMessage('Product SKU is missing');
			this.setState({ createProduct: false });
		}
		if (variable.get('variableName') === '') {
			customErrorMessage('Product Name is missing');
			this.setState({ createProduct: false });
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

	updateDimensions(variable) {
		this.setState({ variable: variable });
	}

	updateCustomPrice(customPrice) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('productCustomPrice', customPrice);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateProductStock(productStock) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('productStock', productStock);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateProductReorderLevels(reorderLevel) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('productReorderLevels', reorderLevel);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateSupplierLocation(supplierLocation) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('supplierLocation', supplierLocation);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateSupplierProduct(supplierProduct) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('supplierProduct', supplierProduct);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit="2" />

				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton
								onClick={(e) => {
									if (this.props.match.params.variableName) {
										this.props.updateVariable(this.state.prevVariable, this.state.variable);
									} else {
										new Promise((resolve) => {
											resolve(
												this.checkRequiredField(
													this.state.variable.get('values').get('general')
												)
											);
										}).then(() => {
											if (this.state.createProduct) {
												this.props.createVariable(this.state.variable).then((status) => {
													if (status === 200) {
														successMessage(' Product Created');
													}
												});
											}
											this.setState({ createProduct: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<PageSidebar>
							<HorizontalNavWrapper>
								<HorizontalNav>
									<NavList>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('product')}>
												<ButtonText>General</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('price')}>
												<ButtonText>Price</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('stock')}>
												<ButtonText>Stock</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('dimensions')}>
												<ButtonText>Dimension</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('suppliers')}>
												<ButtonText>Supplier</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('customPrices')}>
												<ButtonText>Custom Price</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('reorderLevel')}>
												<ButtonText>Reorder Levels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('discounts')}>
												<ButtonText>Discount</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('additionalUnitOfMeasure')}>
												<ButtonText>Additional Units of Measure</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('additionalDescription')}>
												<ButtonText>Additional Descriptions</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
										<NavListItems>
											<NavButton onClick={(e) => this.divVisibility('channels')}>
												<ButtonText>Channels</ButtonText>
											</NavButton>
										</NavListItems>
									</NavList>
								</HorizontalNav>
								<HorizontalNavActionWrapper>
									<Arrow>
										<i className="large material-icons">arrow_back</i>
									</Arrow>
									<RightArrow>
										<i className="large material-icons">arrow_forward</i>
									</RightArrow>
								</HorizontalNavActionWrapper>
							</HorizontalNavWrapper>
						</PageSidebar>
						<ProductGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>

						<ProductDimension variable={this.state.variable} updateDimensions={this.updateDimensions} />
						<ReorderLevels
							list={this.state.variable.get('values').get('productReorderLevels')}
							updateProductReorderLevels={this.updateProductReorderLevels}
						/>

						<CustomPrice
							id="customPrices"
							list={this.state.variable.get('values').get('productCustomPrice')}
							updateCustomPrice={this.updateCustomPrice}
						/>
						<PageBlock id="channels">
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>Channels</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody />
						</PageBlock>
						<PageBlock id="additionalDescription">
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>Additional Description</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody />
						</PageBlock>
						<Stock
							list={this.state.variable.get('values').get('productStock')}
							updateProductStock={this.updateProductStock}
						/>
						<SupplierProduct
							list={this.state.variable.get('values').get('supplierProduct')}
							updateSupplierProduct={this.updateSupplierProduct}
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
	updateVariable
})(Product);

export const Container = styled.div.attrs((props) => ({
	mediaPadding: props.mediaPadding,
	backgroundColor: props.backgroundColor || '#e3e4e8'
}))`
	padding: 0;
	width: 100%;
	min-width: 860px;
	position: relative;
	margin-top: 65px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	background-color:${(props) => props.backgroundColor};
	@media (max-width: 1200px) {
		padding: ${(props) => props.mediaPadding};
	}
`;

const PageSidebar = styled.div`
	width: 100%;
	height: auto;
	padding: 10px;
	margin-bottom: 20px;
	background: #fff;
	border-right: 0 !important;
	border-radius: 6px;
	position: static;
	overflow: hidden;

	// width: 236px;
	// min-width: 236px;
	// padding: 20px 20px 0 20px;
	// background: #fff;
	// border-right: 1px solid #e0e1e7;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
	// @media (max-width: 1200px) {
	// 	width: 100%;
	// 	height: auto;
	// 	padding: 10px;
	// 	margin-bottom: 20px;
	// 	background: #fff;
	// 	border-right: 0 !important;
	// 	border-radius: 6px;
	// 	position: static;
	// 	overflow: hidden;
	// }
	// @media (min-width: 1201px) {
	// 	margin: 20px 0 20px 5px;
	// }
`;

const VerticalWrapper = styled.div`
	display: block;
	width: 100%;
	@media (max-width: 1200px) {
		display: none;
	}
`;

const NavList = styled.div`
	width: 100%;
	margin-bottom: 20px;
	list-style: none;
	height: 40px;
	@media (max-width: 1200px) {
		width: inherit;
		padding: 0px 32px;
		transform: translate3d(0px, 0px, 0px);
		overflow: auto;
		margin-bottom: 0;
	}
`;
const NavListItems = styled.div`
	display: inline-block;
	width: 100%;
	float: left;
	white-space: nowrap;
	@media (max-width: 1200px) {
		width: auto;
		float: left;
		margin-right: 8px;
		white-space: nowrap;
	}
`;
const NavButton = styled.button`
	height: 40px;
	width: 100%;
	font-size: 13px;
	border-radius: 4px;
	font-size: 13px;
	color: #707887;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-weight: 500;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	outline: none;
	&:active {
		background: #f1f6fb;
		color: #05cbbf;
		outline: none;
		border: 0;
		outline: none;
	}
	&:hover {
		color: black;
	}
	&:hover {
		outline: none;
	}
`;

const ButtonText = styled.span`padding-left: 5px;`;

const HorizontalNavWrapper = styled.div`
	width: 100%;
	position: relative;
	overflow: hidden;
	display: block;
`;
const HorizontalNav = styled.div`
	width: calc(100% - 80px);
	width: 100%;
	overflow: scroll;
	position: relative;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
`;

const HorizontalNavActionWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 40px;
	z-index: 10;
	pointer-events: none;
`;
const Arrow = styled.a`
	border-color: #05cbbf;
	left: 0;
	top: 5px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border-width: 1px;
	border-style: solid;
	border-color: #dadbdc;
	position: absolute;
	pointer-events: all;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	cursor: pointer;
	-webkit-transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, color 0.15s ease-in-out;
	&:hover {
		text-decoration: none;
		outline: none;
	}
`;
const RightArrow = styled.a`
	border-color: #05cbbf;
	right: 0;
	top: 5px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border-width: 1px;
	border-style: solid;
	border-color: #dadbdc;
	position: absolute;
	pointer-events: all;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	cursor: pointer;
	-webkit-transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out, color 0.15s ease-in-out;
	&:hover {
		text-decoration: none;
		outline: none;
	}
`;

const Label = styled.div`
	float: left;
	margin-right: 10px;
`;

const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
