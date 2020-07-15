import React from 'react';
import styled from 'styled-components';
import { getTypeDetails, createVariable } from '../../../redux/actions/product'; 
import {getVariables,getVariable} from '../../../redux/actions/variables'
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import CustomerGeneralDetails from './CustomerGeneralDetails';
import CustomerAddresses from './CustomerAddresses';
import CustomerContact from './CustomerContact';
class Supplier extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customerName: '',
			generalDetails: {},
			variableName: '',
			values: new Map(),
			type: {},
			//supplier keys//
			customerValues: new Map(),
			general: {},
			addresses: [],
			contacts: [],
			counter: 0
		};
		this.onChange = this.onChange.bind(this);
		this.getGeneralDetails = this.getGeneralDetails.bind(this);
		this.getCustomerAddress = this.getCustomerAddress.bind(this);
		this.getCustomerContact = this.getCustomerContact.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	divVisibility(divId) {
		var visibleDivId = null;
		if (visibleDivId !== divId) {
			visibleDivId = divId;
		}
		this.hideNonVisibleDivs(visibleDivId);
	}

	hideNonVisibleDivs(visibleDivId) {
		var divs = [ 'address', 'contact' ];
		var i, divId, div;
		for (i = 0; i < divs.length; i++) {
			divId = divs[i];
			div = document.getElementById(divId);
			if (div != null) {
				if (visibleDivId === divId) {
					div.style.display = 'block';
				} else if (divId !== 'customer') {
					div.style.display = 'none';
				}
			}
		}
	}

	componentDidMount() {
		this.props.getTypeDetails('Customer')
		this.props.getVariables('Country')
		this.props.getVariables('Currency')
		this.props.getVariables('CarrierService')
		this.props.getVariables('PaymentTerm')
		this.props.getVariables('Status')
		this.props.getVariables('SalesTaxRule')
		this.props.getVariables('AttributeSet')
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			type:nextProps.type === undefined ? null :nextProps.type[0],
			generalDetails: nextProps.type[0] === undefined ? null : nextProps.type[0].keys['general']
		};
	}

	getGeneralDetails(customerName, customerGeneralDetails) {
		this.setState({
			general: customerGeneralDetails,
			customerName: customerName
		});
	}

	getCustomerAddress(customerAddresses) {
		this.setState(
			{
				addresses: []
			},
			() => {
				var variableArray = [];
				Object.entries(customerAddresses).forEach((item) => {
					var variable = {
						variableName: item[1].name,
						values: item[1]
					};
					variableArray.push(variable);
				});
				this.setState({ addresses: [ ...this.state.addresses, ...variableArray ] });
			}
		);
	}

	getCustomerContact(customerContacts) {
		this.setState(
			{
				contacts: []
			},
			() => {
				var variableArray = [];
				Object.entries(customerContacts).forEach((item) => {
					var variable = {
						variableName: item[1].name,
						values: item[1]
					};
					variableArray.push(variable);
				});
				this.setState({ contacts: [ ...this.state.contacts, ...variableArray ] });
			}
		);
	}
	createVariable(e) {
		const values = cloneDeep(this.state.customerValues);
		values.set('general', this.state.general);
		values.set('contacts', this.state.contacts);
		values.set('addresses', this.state.addresses);
		this.setState({ customerValues: values }, () => {
			this.props.createVariable('Customer', this.state.customerName, this.state.customerValues);
			this.setState({
				values: new Map(),
				variableName: ''
			});
		});
	}

	render() {
		return (
			<Container>
				<PageSidebar>
					<VerticalWrapper>
						<NavList>
							<NavListItems>
								<NavButton onClick={(e) => this.divVisibility('customer')}>
									<ButtonText>General</ButtonText>
								</NavButton>
							</NavListItems>
							<NavListItems>
								<NavButton onClick={(e) => this.divVisibility('address')}>
									<ButtonText>Addresses</ButtonText>
								</NavButton>
							</NavListItems>
							<NavListItems>
								<NavButton onClick={(e) => this.divVisibility('contact')}>
									<ButtonText>Contact</ButtonText>
								</NavButton>
							</NavListItems>
						</NavList>
					</VerticalWrapper>
					<HorizontalNavWrapper>
						<HorizontalNav>
							<NavList>
								<NavListItems>
									<NavButton onClick={(e) => this.divVisibility('customer')}>
										<ButtonText>General</ButtonText>
									</NavButton>
								</NavListItems>
								<NavListItems>
									<NavButton onClick={(e) => this.divVisibility('address')}>
										<ButtonText>Addresses</ButtonText>
									</NavButton>
								</NavListItems>
								<NavListItems>
									<NavButton onClick={(e) => this.divVisibility('contact')}>
										<ButtonText>Contact</ButtonText>
									</NavButton>
								</NavListItems>

							</NavList>
						</HorizontalNav>
				
					</HorizontalNavWrapper>
				</PageSidebar>
				<PageWrapper>
					<PageBody>
						<button onClick={(e) => this.createVariable()}>save</button>
						<CustomerGeneralDetails
							sendData={this.getGeneralDetails}
							generalDetails={this.state.generalDetails}
							currency={this.props.variable.Currency}
							country={this.props.variable.Country}
                            salesTaxRule={this.props.variable.SalesTaxRule}
							carrierServices={this.props.variable.CarrierService}
							paymentTerm={this.props.variable.PaymentTerm}
							status={this.props.variable.Status}
							attributeSet={this.props.variable.AttributeSet}
						/>
						<CustomerContact sendData={this.getCustomerContact}/>
						<CustomerAddresses sendData={this.getCustomerAddress}/>
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	type: state.types,
	variable:state.variables
});

export default connect(mapStateToProps, {
	getTypeDetails,
	getVariables,
	getVariable,
	createVariable
})(Supplier);

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
