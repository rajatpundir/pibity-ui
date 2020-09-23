import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {customErrorMessage} from '../main/Notification';
import { clearErrors } from '../../redux/actions/errors';
import { createVariable, getVariable, updateVariable, objToMapRec } from '../../redux/actions/variables';
import PurchaseGeneralDetails from './Purchase/PurchaseGeneralDetails';
import PurchaseOrderDetails from './Purchase/PurchaseOrderDetails';
import PurchaseInvoiceDetails from './Purchase/PurchaseInvoiceDetails';
import PurchaseStockReceived from './Purchase/PurchaseStockReceived';
import CheckIcon from '@material-ui/icons/Check';

class Purchase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createPurchaseOrder: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'organization', 'pibity' ],
				[ 'typeName', 'SimplePurchase' ],
				[ 'variableName', '' ], //supllier name is variable name
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
										[ 'supplierName', '' ],
										[ 'blindReceipt', false ],
										[ 'term', '' ],
										[ 'taxRule', '' ],
										[ 'date', '' ],
										[ 'contact', new Map([
											["context",''],
											['variableName','']
										]) ],
										[ 'stockOrInvoice', 'Stock First' ],
										[ 'phone', '' ],
										[ 'taxInclusive', false ],
										[ 'shippingAddress1', '' ],
										[ 'shippingAddress2', '' ],
										[ 'location', '' ],
										[ 'vendorAddressLine1', '' ],
										[ 'vendorAddressLine2', '' ],
										[ 'requiredBy', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[
							'invoiceDetails',
							[
								new Map([
									[ 'variableName', '0' ],
									[
										'values',
										new Map([
											[ 'additionalCost', [] ],
											[ 'productInvoiceDetails', [] ],
											[ 'supplierDeposit', [] ],
											[ 'invoiceDate', '' ],
											[ 'dueDate', '' ],
											[ 'invoiceNumber', '' ],
											[ 'total', '' ],
											[ 'purchaseOrderMemo', '' ]
										])
									]
								])
							]
						],
						[
							'orderDetails',
							[
								new Map([
									[ 'variableName', '0' ],
									[
										'values',
										new Map([
											[ 'additionalCost', [] ],
											[ 'productInvoiceDetails', [] ],
											[ 'supplierDeposit', [] ],
											[ 'total', '' ],
											[ 'purchaseOrderMemo', '' ]
										])
									]
								])
							]
						],
						[ 'stockReceived', [] ]
					])
				]
			]),
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateInvoice = this.updateInvoice.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.updateStock = this.updateStock.bind(this);
	}

	divVisibility(divId) {
		var visibleDivId = null;
		if (visibleDivId !== divId) {
			visibleDivId = divId;
		}
		this.hideNonVisibleDivs(visibleDivId);
	}

	hideNonVisibleDivs(visibleDivId) {
		var divs = [ 'purchase', 'order', 'invoice', 'stockReceived' ];
		var i, divId, div;
		for (i = 0; i < divs.length; i++) {
			divId = divs[i];
			div = document.getElementById(divId);
			if (div != null) {
				if (visibleDivId === divId) {
					div.style.display = 'block';
				} else if (divId !== 'purchase') {
					div.style.display = 'none';
				}
			}
		}
	}

	componentDidMount() {
		if (this.props.match.params.variableName) {
			this.props
				.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
				.then((variable) => {
					this.setState({ prevVariable: variable });
				});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.SimplePurchase) {
			const variable = nextProps.variables.SimplePurchase.filter(
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

	checkRequiredField(variable) {
		if (variable.get('values').get('supplierName') === '') {
			customErrorMessage('Supplier Name  is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('location') === '') {
			customErrorMessage(' Location is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('term') === '') {
			customErrorMessage(' Term is missing');
			this.setState({ createPurchaseOrder: false });
		}
		if (variable.get('values').get('taxRule') === '') {
			customErrorMessage(' Tax Rule is missing');
			this.setState({ createPurchaseOrder: false });
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

	updateInvoice(invoiceDetails) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('invoiceDetails', [ invoiceDetails ]);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateOrder(orderDetails) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('orderDetails', [ orderDetails ]);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateStock(productStock) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('stockReceived', productStock);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container>
				<ToastContainer limit={3} />
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
											if (this.state.createPurchaseOrder) {
												this.props.createVariable(this.state.variable);
											}
											this.setState({ createPurchaseOrder: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<PurchaseGeneralDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						<HorizontalistPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList style={{ justifyContent: 'space-evenly' }}>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('order')}>
												Order
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('invoice')}>
												Invoice
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('stockReceived')}>
												Stock Received
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('creditNote')}>
												Credit Note
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('unStock')}>
												Unstock
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton onClick={(e) => this.divVisibility('manualJournals')}>
												Manual Journals
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontalistPageBlock>
						<PurchaseOrderDetails
							variable={this.state.variable.get('values').get('orderDetails')[0]}
							updateInvoice={this.updateOrder}
						/>
						<PurchaseInvoiceDetails
							variable={this.state.variable.get('values').get('invoiceDetails')[0]}
							updateInvoice={this.updateInvoice}
						/>
						<PurchaseStockReceived
							list={this.state.variable.get('values').get('stockReceived')}
							updateStock={this.updateStock}
						/>
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	createVariable,
	getVariable,
	updateVariable
})(Purchase);

export const HorizontalistPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const HorizontalBlockListOuter = styled.div`
	width: 100%;
	position: relative;
	display: block;
`;
export const HorizontalBlockListInnerWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
`;
export const HoizontalBlockList = styled.ul`
	width: 212px;
	height: 40px;
	padding-bottom: 0%;
	transform: translate3d(0px, 0px, 0px);
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	z-index: 1;
	min-width: 100%;
	padding-left: 0;
	list-style: none outside none;
	transition: all 1s;
	transition-property: transform, height;
	justify-content: start;
	float: left;
`;

export const HoizontalBlockListItems = styled.li`
	margin-right: 0px;
	display: flex;
	white-space: nowrap;
	height: 40px;
	float: left;
	margin-right: 10px;
	text-align: -webkit-match-parent;
	list-style: none outside none;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockListItemBUtton = styled.button`
	height: 40px;
	width: 100%;
	border-radius: 4px;
	font-size: 13px;
	font-size: 13px;
	font-weight: 600;
	color: #3b3b3b;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;

	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;
const Container = styled.div`
	padding: 0;
	width: 100%;
	min-width: 860px;
	border-radius: 6px;
  position: relative;
  margin-top: 65px;
	min-height: 100vh;
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
	@media (min-width: 1440px) {
		max-width: 1200px;
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
		max-width: 1200px;
	}
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
