import React from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { getTypeDetails, createVariable } from '../../redux/actions/product';
import { connect } from 'react-redux';
// import { cloneDeep } from 'lodash';
import PurchaseGeneralDetails from './Purchase/PurchaseGeneralDetails';
import PurchaseOrderDetails from './Purchase/PurchaseOrderDetails';
import PurchaseInvoiceDetails from './Purchase/PurchaseInvoiceDetails'
import PurchaseStockReceived from './Purchase/PurchaseStockReceived'

class Purchase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			generalDetails: {},
			type: {},
		    PurchaseValues: new Map(),
			//purchaseOrderKeys
			general:{},
			invoiceDetails:[],
			//based on selection it can be not defined for that purchase order,if object avalue is needed buta list can have no values
			orderDetails:[],
			stockReceived:[]
		};

		this.onChange = this.onChange.bind(this);
		this.getGeneralDetails = this.getGeneralDetails.bind(this);
		this.getInvoiceDetails=this.getInvoiceDetails.bind(this);
		this.getStockReceived=this.getStockReceived.bind(this);
	}

	divVisibility(divId) {
		var visibleDivId = null;
		if (visibleDivId !== divId) {
			visibleDivId = divId;
		}
		this.hideNonVisibleDivs(visibleDivId);
	}

	hideNonVisibleDivs(visibleDivId) {
		var divs = [ 'purchase', 'order' ,'invoice','stockReceived'];
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

	onChange(e) {
		this.setState({ [e.target.name]: [ e.target.value ] });
	}

	componentDidMount() {
		this.props.getTypeDetails('SimplePurchase');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			type:nextProps.type === undefined ? null :nextProps.type[0],
			generalDetails: nextProps.type[0] === undefined ? null : nextProps.type[0].keys['general']
		};
	}

	getGeneralDetails(supplierName, purchaseGeneralDetails) {
		this.setState({
			general: purchaseGeneralDetails,
			supplierName: supplierName
		});
	}

	getOrderDetails(orderDetails){
		this.setState({ orderDetails: [ ...this.state.orderDetails, ...orderDetails ] });
	}

	getInvoiceDetails(invoicedetails){
		this.setState({invoiceDetails:[this.state.invoiceDetails,...invoicedetails]})
	}
	getStockReceived(stockReceivedDetails){
		this.setState(
			{
				stockRecieved: []
			},
			() => {
			 var variableArray=[]
				Object.entries(stockReceivedDetails).forEach((item) => {
					var variable = {
						variableName: item[1].name,
						values: item[1]
					};
					variableArray.push(variable)
				});
				this.setState({ stockRecieved: [ ...this.state.stockRecieved, ...variableArray ] });
			}
		);

	}

	createVariable(e) {
		const values = cloneDeep(this.state.PurchaseValues);
		values.set('general', this.state.general);
		values.set('orderDetails', this.state.orderDetails);
		values.set('invoiceDetails', this.state.invoiceDetails);
		values.set('stockRecieved', this.state.stockReceived);
		this.setState({ PurchaseValues: values }, () => {
			this.props.createVariable('SimplePurchase', this.state.supplierName, this.state.PurchaseValues);
			this.setState({
				values: new Map(),
				variableName: ''
			});
		});
	}

	render() {
		return (
			<Container>
				<PageWrapper>
					<PageBody>
					<button onClick={(e) => this.createVariable()}>save</button>

						<PurchaseGeneralDetails
							sendData={this.getGeneralDetails}
							generalDetails={this.state.generalDetails}
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
						<PurchaseOrderDetails sendData={this.getOrderDetails} />
						<PurchaseInvoiceDetails sendData={this.getInvoiceDetails}/>
						<PurchaseStockReceived sendData={this.getStockReceived}/>
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	type: state.type
});

export default connect(mapStateToProps, {
	getTypeDetails,
	createVariable
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
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
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
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
