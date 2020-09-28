import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage } from '../main/Notification';
import { clearErrors } from '../../redux/actions/errors';
import { createVariable, getVariables, getVariable, updateVariable, objToMapRec } from '../../redux/actions/variables';
import ProductDimension from './Product/ProductDimension';
import CustomPrice from './Product/CustomPrice';
import Stock from './Product/Stock';
import ReorderLevels from './Product/ReorderLevels';
import SupplierProduct from './Product/SupplierProduct';
import ProductGeneralDetails from './Product/ProductGeneralDetails';
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from './../main/SelectorganizationModal';

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
			<Container>
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<ToastContainer />
				<PageSidebar>
					<VerticalWrapper>
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
						</NavList>
					</VerticalWrapper>
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
												this.props.createVariable(this.state.variable);
											}
											this.setState({ createProduct: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<ProductGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						<PageBlock id="price">
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>PRICES</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<PageBar>
								<PageBarAlignLeft>
									<Label>Current Average 0.00000</Label>
								</PageBarAlignLeft>
							</PageBar>
							<InputBody borderTop="0">
								<RoundedBlock>
									<TableFieldContainer>
										<Headers>
											<HeaderContainer>
												<HeaderContainerInner>
													<ColumnName width="58px" left="0">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="267px" left="58px">
														<SelectIconContainer>
															<SelectSpan>Price Tier</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="100px" left="286px">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Price</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="100px" left="386px">
														<SelectIconContainer>
															<SelectSpan>Calculated </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="228px" left="486px">
														<SelectIconContainer>
															<SelectSpan>Type </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="228px" left="714px">
														<SelectIconContainer>
															<SelectSpan>Use </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="100px" left="924px">
														<SelectIconContainer>
															<SelectSpan>Value </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
												</HeaderContainerInner>
											</HeaderContainer>
										</Headers>
									</TableFieldContainer>
								</RoundedBlock>
							</InputBody>
						</PageBlock>
						<ProductDimension variable={this.state.variable} updateDimensions={this.updateDimensions} />
						<ReorderLevels
							list={this.state.variable.get('values').get('productReorderLevels')}
							updateProductReorderLevels={this.updateProductReorderLevels}
						/>
						<PageBlock id="discounts">
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>Discounts</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<PageBar>
								<PageBarAlignLeft>
									<PlusButton>
										<i className="large material-icons">add</i>
									</PlusButton>
								</PageBarAlignLeft>
							</PageBar>
							<InputBody borderTop="0">
								<RoundedBlock>
									<TableFieldContainer>
										<Headers>
											<HeaderContainer>
												<HeaderContainerInner>
													<ColumnName width="5%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="30%" left="5%">
														<SelectIconContainer>
															<SelectSpan>Customer </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="30%" left="30%">
														<SelectIconContainer>
															<SelectSpan>Customer Tag </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="30%" left="65%">
														<SelectIconContainer>
															<SelectSpan>Discount </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
												</HeaderContainerInner>
											</HeaderContainer>
										</Headers>
										<HeaderBodyContainer>
											<HeaderBody>
												<BodyTable>
													<TableBody>
														<TableRow>
															<TableHeader width="58px" />
															<TableHeader width="168px" />
															<TableHeader width="168px" />
															<TableHeader width="168px" />
															<TableHeader width="167px" />
															<TableHeader width="167px" />
															<TableHeader width="58px" />
														</TableRow>
													</TableBody>
												</BodyTable>
											</HeaderBody>
											<EmptyRow>
												You do not have any Customer Specific Discount for this Product
											</EmptyRow>
										</HeaderBodyContainer>
										<AddMoreBlock>
											<AddMoreButton>
												<i className="large material-icons">add</i>Add More Discounts
											</AddMoreButton>
										</AddMoreBlock>
									</TableFieldContainer>
								</RoundedBlock>
							</InputBody>
						</PageBlock>
						<PageBlock id="additionalUnitOfMeasure">
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>Additional Unit Of Measure</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<PageBar>
								<PageBarAlignLeft>
									<PlusButton>
										<i className="large material-icons">add</i>
									</PlusButton>
								</PageBarAlignLeft>
							</PageBar>
							<InputBody borderTop="0">
								<RoundedBlock>
									<TableFieldContainer>
										<Headers>
											<HeaderContainer>
												<HeaderContainerInner>
													<ColumnName width="5%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="20%" left="3%">
														<SelectIconContainer>
															<SelectSpan>Product</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="15%" left="24%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Unit of Measure</SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="15%" left="40%">
														<SelectIconContainer>
															<SelectSpan>Conversion Rate </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="15%" left="55%">
														<SelectIconContainer>
															<SelectSpan>I am Selling This Product </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
													<ColumnName width="20%" left="65%">
														<SelectIconContainer>
															<SelectSpan>Tier 1 </SelectSpan>
														</SelectIconContainer>
													</ColumnName>
												</HeaderContainerInner>
											</HeaderContainer>
										</Headers>
										<HeaderBodyContainer>
											<HeaderBody>
												<BodyTable>
													<TableBody>
														<TableRow>
															<TableHeader width="58px" />
															<TableHeader width="168px" />
															<TableHeader width="168px" />
															<TableHeader width="168px" />
															<TableHeader width="167px" />
															<TableHeader width="167px" />
															<TableHeader width="58px" />
														</TableRow>
													</TableBody>
												</BodyTable>
											</HeaderBody>
											<EmptyRow>
												{' '}
												You do not have any additional Unit of Measure for this Product
											</EmptyRow>
										</HeaderBodyContainer>
									</TableFieldContainer>
								</RoundedBlock>
							</InputBody>
						</PageBlock>
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

const Container = styled.div`
    margin-top:65px
	padding: 0;
	width: 100%;
	min-width: 860px;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	background-color: #e3e4e8;
	@media (max-width: 1200px) {
		flex-direction: column !important;
		padding: 20px 20px 0 20px !important;
	}
	
`;
const PageSidebar = styled.div`
	width: 236px;
	min-width: 236px;
	padding: 20px 20px 0 20px;
	background: #fff;
	border-right: 1px solid #e0e1e7;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
	@media (max-width: 1200px) {
		width: 100%;
		height: auto;
		padding: 10px;
		margin-bottom: 20px;
		background: #fff;
		border-right: 0 !important;
		border-radius: 6px;
		position: static;
		overflow: hidden;
	}
	@media (min-width: 1201px) {
		margin: 20px 0 20px 5px;
	}
`;

const VerticalWrapper = styled.div`
	display: block;
	width: 100%;
	@media (max-width: 1200px) {
		display: none;
	}
`;

const NavList = styled.ul`
	width: 100%;
	float: left;
	margin-bottom: 20px;
	list-style: none;
	height: 40px;

	@media (max-width: 1200px) {
		width: max-content;
		padding: 0px 32px;
		transform: translate3d(0px, 0px, 0px);
		overflow: hidden;
		margin-bottom: 0;
	}
`;
const NavListItems = styled.li`
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
	@media (min-width: 1201px) {
		display: none;
	}
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

const PageWrapper = styled.div`
	 flex: 1;
    overflow: hidde
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		margin: 20px 20px 0 20px;
		width: 75%;

	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 90%;
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
	font-family: "IBM Plex Sans", sans-serif;
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

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
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
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
`;

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
  border-top: ${(props) => props.borderTop};
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px 0 20px;
  padding-bottom: 20px !important;
`;

const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;
const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const Label = styled.div`
	float: left;
	margin-right: 10px;
`;
const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0'
}))`
  border: 1px solid #b9bdce;
  border-radius: 4px;
  width: 100%;
  float: left;
  overflow: hidden;
  margin-top: ${(props) => props.marginTop};
`;
const TableFieldContainer = styled.div`
	width: 100% !important;
	min-height: auto !important;
	text-align: center;
	position: relative !important;
	top: 0 !important;
	height: inherit !important;
	float: left;
	overflow: hidden !important;
`;
const Headers = styled.div`
	border-width: 0px;
	width: 100%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	border-top: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;
const HeaderContainer = styled.div`
	width: 100%;
	height: 100% !important;
	overflow: hidden;
	zoom: 1;
	position: relative;
	left: 0;
	top: 0;
`;

const HeaderContainerInner = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100% !important;
	width: 100% !important;
`;
const ColumnName = styled.div.attrs((props) => ({
	width: props.width,
	left: props.left
}))`
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  border-width: 1px;
  height: auto;
  margin: 0px;
  top: 0px;
  font-size: 11px;
  font-weight: bold;
  font-family: inherit;
  color: #707887;
  text-transform: uppercase;
  letter-spacing: -0.4px;
  vertical-align: middle;
  position: absolute;
  bottom: 0;
`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;
const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-align: ${(props) => props.textAlign};
  cursor: pointer;
`;
const SelectSpanInner = styled.span`white-space: nowrap;`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: auto;
	height: inherit !important;
	float: left;
	height: auto !important;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 1158px;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-collapse: collapse;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0'
}))`
  width: ${(props) => props.width};
`;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;
const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;
const AddMoreButton = styled.button`
	background-color: transparent;
	color: #05cbbf;
	border-color: transparent;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:hover {
		outline: none;
	}
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;
const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;
const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none;
`;
