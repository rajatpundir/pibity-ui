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
			visibleSection: 'price'
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
		this.onScroll = this.onScroll.bind(this);
		// this.customErrorMessage = this.customErrorMessage.bind(this);
	}

	

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Product) {
			const variable = nextProps.variables.Product.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
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
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				this.props
					.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			this.props
				.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
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

	onScroll(scrollOffset) {
		document.getElementById('listnav').scrollLeft += scrollOffset;
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
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						{this.state.visibleSection === 'dimensions' && (
							<ProductDimension variable={this.state.variable} updateDimensions={this.updateDimensions} />
						)}
						{this.state.visibleSection === 'reorderLevels' && (
							<ReorderLevels
								list={this.state.variable.get('values').get('productReorderLevels')}
								updateProductReorderLevels={this.updateProductReorderLevels}
							/>
						)}
						{this.state.visibleSection === 'additionalUnitOfMeasure' && (
							<AdditionalUnitOfMeasure list={[]} />
						)}
						{this.state.visibleSection === 'customPrice' && (
							<CustomPrice
								list={this.state.variable.get('values').get('productCustomPrice')}
								updateCustomPrice={this.updateCustomPrice}
							/>
						)}
						{this.state.visibleSection === 'channels' && (
							<PageBlock>
								<PageToolbar>
									<ToolbarItems>
										<LeftItemH1>Channels</LeftItemH1>
									</ToolbarItems>
								</PageToolbar>
								<InputBody />
							</PageBlock>
						)}
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
								list={this.state.variable.get('values').get('productStock')}
								updateProductStock={this.updateProductStock}
							/>
						)}
						{this.state.visibleSection === 'supplier' && (
							<SupplierProduct
								list={this.state.variable.get('values').get('supplierProduct')}
								updateSupplierProduct={this.updateSupplierProduct}
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
	getVariable,
	getVariables,
	updateVariable
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
