import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, CustomNotification, successMessage } from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import {
	createVariable,
	createVariables,
	addKeyToList,
	getVariables,
	getVariable,
	updateVariable,
	updateVariables,
	objToMapRec
} from '../../../redux/actions/variables';
import ProductDimension from './ProductDimension';
import CustomPrice from './CustomPrice';
import Stock from './Stock';
import ReorderLevels from './ReorderLevels';
import SupplierProduct from './SupplierProduct';
import ProductGeneralDetails from './ProductGeneralDetails';
import AdditionalUnitOfMeasure from './AdditionalUnitOfMeasure';
// import ProductPrice from './PorudctPrice'
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from '../../main/Modal/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,
	PageBlock,
	PageToolbar,
	ToolbarItems,
	BlockListItemButton,
	LeftItemH1,
	InputBody,
	SaveButtonContaier,
	SaveButton,
	HorizontalListPageBlock,
	HorizontalBlockListOuter,
	HorizontalBlockListInnerWrapper,
	HoizontalBlockList,
	HoizontalBlockListItems
} from '../../../styles/inventory/Style';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Product extends React.Component {
	constructor(props) {
		super();
		this.state = {
			ref: React.createRef(),
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
						[ 'additionalAttributeSet', '' ],
						[ 'barcode', '' ],
						[ 'billOfMaterial', '' ],
						[ 'brand', '' ],
						[ 'category', '' ],
						[ 'comment', '' ],
						[ 'defaultLocation', '' ],
						[ 'description', '' ],
						[ 'dropShip', '' ],
						[ 'minimumBeforeReorder', '' ],
						[ 'minimumReorderQuantity', '' ],
						[ 'productCostingMethod', '' ],
						[ 'productName', '' ],
						[ 'productStatus', '' ],
						[ 'productType', '' ],
						[ 'productWarranty', '' ],
						[ 'purchaseTaxRule', '' ],
						[ 'salesTaxRule', '' ],
						[ 'shortDescription', '' ],
						[ 'stockLocator', '' ],
						[ 'unitOfMeasure', '' ],
						[ 'productDiscount', '' ],
						[ 'internalNote', '' ],
						[ 'productHeight', '0' ],
						[ 'productLength', '0' ],
						[ 'productWidth', '0' ],
						[ 'unitOfDimension', '' ],
						[ 'productWeight', '0' ],
						[ 'unitForWeights', '' ]
					])
				]
			]),
			productStore: [],
			productSuppliers: [],
			prevProductSuppliers:[],
			visibleSection: 'price',
			ceateSupplierProducts:true
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.updateCustomPrice = this.updateCustomPrice.bind(this);
		this.updateProductStock = this.updateProductStock.bind(this);
		this.updateProductReorderLevels = this.updateProductReorderLevels.bind(this);
		this.updateSupplierLocation = this.updateSupplierLocation.bind(this);
		this.updateSupplierProduct = this.updateSupplierProduct.bind(this);
		this.createSupplierProducts = this.createSupplierProducts.bind(this);
		this.updateProducts = this.updateProducts.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.onCloseAlert = this.onCloseAlert.bind(this);
		
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.Product &&
			nextProps.variables.ProductStore &&
			nextProps.variables.ProductSupplier
		) {
			const variable = nextProps.variables.Product.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const productStore = nextProps.variables.ProductStore
					.filter((store) => store.values.product === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const productSuppliers = nextProps.variables.ProductSupplier
					.filter((supplier) => supplier.values.product === variable.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable); 
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					productStore: productStore,
					productSuppliers: productSuppliers,
					prevProductSuppliers: productSuppliers.length !== 0 ? productSuppliers : prevState.productSuppliers,
					ceateSupplierProducts: productSuppliers.length === 0 ? true : false

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
		this.props.getVariables('TaxRule');
		this.props.getVariables('AttributeSet');
		this.props.getVariables('Brand');
		this.props.getVariables('ProductCategory');
		this.props.getVariables('TaxRule');
		this.props.getVariables('UnitOfMeasure');
		this.props.getVariables('CostingMethod');
		this.props.getVariables('Location');
		this.props.getVariables('Supplier');
		this.props.getVariables('Currency');
		this.props.getVariables('ProductStore');
		this.props.getVariables('ProductSupplier');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName);
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			this.props.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName);
		}
		this.getData();
	}

	checkRequiredField(variable) {
		if (variable.get('variableName') === '') {
			customErrorMessage('Product Name is missing');
			this.setState({ createProduct: false });
		}
	}

	updateDetails(variable) {
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

	updateProductStock(productStore) {
		this.setState({ productStore: productStore });
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

	updateSupplierProduct(productSuppliers) {
		this.setState({ productSuppliers: productSuppliers });
	}

	onScroll(scrollOffset) {
		document.getElementById('listnav').scrollLeft += scrollOffset;
	}

	createSupplierProducts() {
		this.props.createVariables(this.state.productSuppliers).then((response) => {
			if (response.status === 200) {
				this.setState({ ceateSupplierProducts: false });
				this.props.getVariables('ProductSupplier');
				successMessage('Product Supplier Added');
			}
		});
	}

	updateProducts() {
		console.log(this.state.prevProductSuppliers)
		this.props.updateVariables(this.state.prevProductSuppliers, this.state.productSuppliers).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('ProductSupplier');
				successMessage('  Supplier Product updated');
			}
		});
	}

	onCloseAlert() {
		this.setState({
			createProduct: true,
			variable: new Map([
				[ 'typeName', 'Product' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'additionalAttributeSet', '' ],
						[ 'barcode', '' ],
						[ 'billOfMaterial', '' ],
						[ 'brand', '' ],
						[ 'category', '' ],
						[ 'comment', '' ],
						[ 'defaultLocation', '' ],
						[ 'description', '' ],
						[ 'dropShip', '' ],
						[ 'minimumBeforeReorder', '' ],
						[ 'minimumReorderQuantity', '' ],
						[ 'productCostingMethod', '' ],
						[ 'productName', '' ],
						[ 'productStatus', '' ],
						[ 'productType', '' ],
						[ 'productWarranty', '' ],
						[ 'purchaseTaxRule', '' ],
						[ 'salesTaxRule', '' ],
						[ 'shortDescription', '' ],
						[ 'stockLocator', '' ],
						[ 'unitOfMeasure', '' ],
						[ 'productDiscount', '' ],
						[ 'internalNote', '' ],
						[ 'productHeight', '0' ],
						[ 'productLength', '0' ],
						[ 'productWidth', '0' ],
						[ 'unitOfDimension', '' ],
						[ 'productWeight', '0' ],
						[ 'unitForWeights', '' ]
					])
				]
			]),
			productStore: []
		});
	}

	alert() {
		confirmAlert({
			title: 'Add New Product',
			buttons: [
				{
					label: 'Continue',
					onClick: () => this.onCloseAlert()
				},
				{
					label: 'Exit',
					onClick: () => this.props.history.push('/productList')
				}
			],
			closeOnEscape: true,
			closeOnClickOutside: true
		});
	}

	createVariable() {
		new Promise((resolve) => {
			resolve(this.checkRequiredField(this.state.variable));
		}).then(() => {
			if (this.state.createProduct) {
				this.props.createVariable(this.state.variable).then((response) => {
					if (response.status === 200) {
						const productRelation = [];
						if (this.state.productStore.length !== 0) {
							addKeyToList(
								this.state.productStore,
								'product',
								response.data.variableName
							).forEach((element) => {
								productRelation.push(element);
							});
						}
						if (this.state.productSuppliers.length !== 0) {
							addKeyToList(
								this.state.productSuppliers,
								'product',
								response.data.variableName
							).forEach((element) => {
								productRelation.push(element);
							});
						}
						productRelation.length !== 0
							? this.props.createVariables(productRelation).then((response) => {
									if (response.status === 200) {
										successMessage(' Product Created');
										//Enable after Testing
										// this.alert()
									}
								})
							: successMessage(' Product Created');
					}
				});
			}
			this.setState({ createProduct: true });
		});
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
										this.props
											.updateVariable(this.state.prevVariable, this.state.variable)
											.then((status) => {
												if (status === 200) {
													this.onClose(e);
													successMessage(`Updated Succesfully`);
												}
											});
									} else {
										this.createVariable();
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<HorizontalListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper padding="0 35px">
									<HoizontalBlockList height="auto" id="listnav">
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'price' });
												}}
											>
												Price
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'stock' });
												}}
											>
												Stock
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'dimensions' });
												}}
											>
												Dimensions
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'supplier' });
												}}
											>
												Supplier
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'customPrice' });
												}}
											>
												Custom Prices
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'reorderLevels' });
												}}
											>
												Reorder levels
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'discounts' });
												}}
											>
												Discounts
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'additionalUnitOfMeasure' });
												}}
											>
												Aditional Unit Of Measure
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'additionalDescription' });
												}}
											>
												Additional Description
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
								<HorizontalNavActionWrapper>
									<Arrow color="#05cbbf" top="5px" left="0" onClick={(e) => this.onScroll(-100)}>
										<i className="large material-icons">arrow_back</i>
									</Arrow>
									<Arrow color="#05cbbf" top="5px" right="0" onClick={(e) => this.onScroll(100)}>
										<i className="large material-icons">arrow_forward</i>
									</Arrow>
								</HorizontalNavActionWrapper>
							</HorizontalBlockListOuter>
						</HorizontalListPageBlock>
						<ProductGeneralDetails
							updatable={this.props.match.params.variableName ? true : false}
							variable={this.state.variable}
							updateDetails={this.updateDetails}
						/>
						{this.state.visibleSection === 'dimensions' && (
							<ProductDimension variable={this.state.variable} updateDimensions={this.updateDimensions} />
						)}
						{/* {this.state.visibleSection === 'reorderLevels' && (
							<ReorderLevels
								list={this.state.variable.get('values').get('productReorderLevels')}
								updateProductReorderLevels={this.updateProductReorderLevels}
							/>
						)} */}
						{this.state.visibleSection === 'additionalUnitOfMeasure' && (
							<AdditionalUnitOfMeasure list={[]} />
						)}
						{/* {this.state.visibleSection === 'customPrice' && (
							<CustomPrice
								list={this.state.variable.get('values').get('productCustomPrice')}
								updateCustomPrice={this.updateCustomPrice}
							/>
						)} */}
						{/* {this.state.visibleSection === 'channels' && (
							<PageBlock>
								<PageToolbar>
									<ToolbarItems>
										<LeftItemH1>Channels</LeftItemH1>
									</ToolbarItems>
								</PageToolbar>
								<InputBody />
							</PageBlock>
						)} */}
						{this.state.visibleSection === 'additionalDescription' && (
							<PageBlock>
								<PageToolbar>
									<ToolbarItems>
										<LeftItemH1>Additional Description</LeftItemH1>
									</ToolbarItems>
								</PageToolbar>
								<InputBody />
							</PageBlock>
						)}
						{this.state.visibleSection === 'stock' && (
							<Stock
								list={this.state.productStore}
								updateProductStock={this.updateProductStock}
								params={this.props.match.params}
							/>
						)}
						{this.state.visibleSection === 'supplier' && (
							<SupplierProduct
							    ceateSupplierProducts={this.state.ceateSupplierProducts}
								list={this.state.productSuppliers}
								updateSupplierProduct={this.updateSupplierProduct}
								updatable={this.props.match.params.variableName ? true : false}
								params={this.props.match.params}
								update={this.updateProducts}
								createSupplierProducts={this.createSupplierProducts}
							/>
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
	createVariable,
	createVariables,
	getVariable,
	getVariables,
	updateVariable,
	updateVariables
})(Product);

const HorizontalNavActionWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 40px;
	z-index: 10;
	pointer-events: none;
`;
const Arrow = styled.a.attrs((props) => ({
	top: props.top,
	left: props.left,
	right: props.right,
	position: props.position || 'absolute',
	color: props.color,
	size: props.size || '30px' // for height and width
}))`
    position: ${(props) => props.position};
	left: ${(props) => props.left};
	top:  ${(props) => props.top};
	right:${(props) => props.right};
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	color:  ${(props) => props.color};
	border-color: ${(props) => props.color};
	border-radius: 50%;
	border-width: 1px;
	border-style: solid;
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
		color:  ${(props) => props.color};
	}
`;
