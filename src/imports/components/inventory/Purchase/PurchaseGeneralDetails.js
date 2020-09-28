import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';

class PurchaseGeneralDetails extends React.Component {
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
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable
		};
	}

	onVariableNameChange(e) {
		console.log(e.target);
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('supplierName', e.target.value);
		if (e.target.data.contacts.length !== 0) {
			values.set('contact', e.target.data.contacts[0].values.name);
			values.set('phone', e.target.data.contacts[0].values.phone);
		}
		if (e.target.data.addresses.length !== 0) {
			values.set('vendorAddressLine1', e.target.data.addresses[0].values.line1);
			values.set('vendorAddressLine2', e.target.data.addresses[0].values.line2);
		}
		values.set('term', e.target.data.general.values.paymentTerm);
		values.set('taxRule', e.target.data.general.values.taxRule);

		variable.set('variableName', e.target.value);
		variable.set('values', values);
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
			<PageBlock style={{ display: 'block' }} id="purchase">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemWrapper backgroundColor="#f9e491" color="black">
							Draft
						</LeftItemWrapper>
						<LeftItemH1>New Purchase</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<InputBody>
					<InputFieldContainer>
						<InputColumnWrapper>
							<H3>Supplier Details</H3>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('variableName'),
											label: this.state.variable.get('variableName')
										}}
										onChange={(option) => {
											this.onVariableNameChange({
												target: { name: 'variableName', value: option.value, data: option.data }
											});
										}}
										options={
											this.props.variables.Supplier !== undefined ? (
												this.props.variables.Supplier.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.variableName,
														data: variable.values
													};
												})
											) : (
												[]
											)
										}
									/>
								</SelectWrapper>

								<InputLabel>
									Supplier
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="contact"
									type="text"
									placeholder="Default"
									value={this.state.variable.get('values').get('contact')}
									onChange={this.onChange}
								/>
								<InputLabel>Contact</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="phone"
									type="text"
									placeholder="Phone"
									value={this.state.variable.get('values').get('phone')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>
									Phone
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="vendorAddressLine1"
									type="text"
									placeholder="Default"
									value={this.state.variable.get('values').get('vendorAddressLine1')}
									onChange={this.onChange}
								/>
								<InputLabel>Vendor Address Line 1</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="vendorAddressLine2"
									type="text"
									placeholder="line 2"
									value={this.state.variable.get('values').get('vendorAddressLine2')}
									onChange={this.onChange}
								/>
								<InputLabel> Vendor Address Line 2</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<H3>Accounting Details</H3>
							<FormControl style={{ alignItems: 'center' }}>
								<FormControl minHeight="0" paddingBottom="0">
									<RadioLabel>
										{' '}
										<RadioInput type="radio" name="StockFirst" value="false" tabindex="35" />
										Stock First
									</RadioLabel>
								</FormControl>
								<FormControl minHeight="0" paddingBottom="0">
									<RadioLabel>
										{' '}
										<RadioInput type="radio" name="InvoiceFirst" tabindex="35" /> Invoice First
									</RadioLabel>
								</FormControl>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('term'),
											label: this.state.variable.get('values').get('term')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'term', value: option.value } });
										}}
										options={
											this.props.variables.PaymentTerm !== undefined ? (
												this.props.variables.PaymentTerm.map((variable) => {
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
								<InputLabel>Terms</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="requiredBy"
									type="text"
									placeholder="requiredy"
									value={this.state.variable.get('values').get('requiredBy')}
									onChange={this.onChange}
								/>
								<InputLabel>Required By</InputLabel>
							</FormControl>
							<FormControl>
								<Input />
								<InputLabel>Inventory Account</InputLabel>
							</FormControl>
							<FormControl style={{ alignItems: 'center' }}>
								<CheckBoxWapper>
									<CheckBoxTable>
										<TBody>
											<TR>
												<TD>
													<CheckBoxInput
														type="checkbox"
														tabindex="55"
														checked={this.state.variable.get('values').get('taxInclusive')}
														onChange={(option) => {
															this.onChange({
																target: {
																	name: 'taxInclusive',
																	value: !this.state.variable
																		.get('values')
																		.get('taxInclusive')
																}
															});
														}}
													/>
												</TD>
											</TR>
										</TBody>
									</CheckBoxTable>
								</CheckBoxWapper>
								<CheckBoxLabel>Tax Inclusive</CheckBoxLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('taxRule'),
											label: this.state.variable.get('values').get('taxRule')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'taxRule', value: option.value } });
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

								<InputLabel>
									Tax Rule <Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<H3>Shipping Details</H3>
							<FormControl style={{ alignItems: 'center' }}>
								<CheckBoxWapper>
									<CheckBoxTable>
										<TBody>
											<TR>
												<TD>
													<CheckBoxInput
														type="checkbox"
														tabindex="55"
														checked={this.state.variable.get('values').get('blindReceipt')}
														onChange={(option) => {
															this.onChange({
																target: {
																	name: 'blindReceipt',
																	value: !this.state.variable
																		.get('values')
																		.get('blindReceipt')
																}
															});
														}}
													/>
												</TD>
											</TR>
										</TBody>
									</CheckBoxTable>
								</CheckBoxWapper>
								<CheckBoxLabel>Blind Reciept</CheckBoxLabel>
							</FormControl>
							<FormControl>
								<Input
									name="date"
									type="text"
									placeholder="date"
									value={this.state.variable.get('values').get('date')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>
									Date <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('location'),
											label: this.state.variable.get('values').get('location')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'location', value: option.value } });
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
								<InputLabel>
									Location <Required>*</Required>{' '}
								</InputLabel>
							</FormControl>
							<FormControl style={{ alignItems: 'center' }}>
								<CheckBoxWapper>
									<CheckBoxTable>
										<TBody>
											<TR>
												<TD>
													<CheckBoxInput type="checkbox" tabindex="55" />
												</TD>
											</TR>
										</TBody>
									</CheckBoxTable>
								</CheckBoxWapper>
								<CheckBoxLabel>Ship To Different Company</CheckBoxLabel>
							</FormControl>
							<FormControl>
								<Input
									name="shippingAddress1"
									type="text"
									placeholder="Default"
									value={this.state.variable.get('values').get('shippingAddress1')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Shipping Address Line 1</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="shippingAddress2"
									type="text"
									placeholder="Default"
									value={this.state.variable.get('values').get('shippingAddress2')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Shipping Address Line 2</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputRowWrapper>
							<FormControl>
								<Input
									name="comments"
									type="text"
									placeholder="comment"
									value={this.state.variable.get('values').get('comments')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Comment</InputLabel>
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
})(PurchaseGeneralDetails);

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

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const LeftItemWrapper = styled.div.attrs((props) => ({
	backgroundColor: props.backgroundColor,
	color: props.color || ' #f1f6fb'
}))`
	background-color: ${(props) => props.backgroundColor};
	border: 1px solid ${(props) => props.backgroundColor};
	color:  ${(props) => props.color};
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

const InputFieldContainer = styled.div`
	display: flex;
	display: -ms-flexbox;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
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
}
`;
const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%'
}))`
flex-basis: ${(props) => props.flexBasis};`;

const FormControl = styled.div.attrs((props) => ({
	minHeight: props.minHeight || '60px',
	paddingBottom: props.paddingBottom || '20px'
}))`
	padding-bottom: ${(props) => props.paddingBottom};
	min-height:${(props) => props.minHeight};
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
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

const RadioInput = styled.input`
	overflow: hidden;
	box-sizing: border-box;
	border-style: solid;
	border-color: #05cbbf;
	color: #05cbbf;

	border-radius: 50%;
	cursor: default;
	-webkit-appearance: radio;
	margin: 3px 3px 0px 5px;
	font-size: 100%;
	outline: none;
	font: 400 13.3333px Arial;
	width: 16px;
	height: 16px;
	justify-content: center;
	
	
`;
const RadioLabel = styled.label`
	cursor: pointer;
	height: 16px;
	font-size: 14px;
	left: 0;
	top: 0;
	pointer-events: all;
	padding: 0px 0 0 25px;
	line-height: 16px;
	position: relative;
	background-color: #fff;
	white-space: nowrap;
	color: #3b3b3b;
	background: transparent;
	user-select: none;
`;

const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
	width: 100% !important;
	height: 16px;
	line-height: 1px;
	position: relative;
	font-weight: normal;
	overflow: hidden;
	cursor: pointer;
	vertical-align: top;
	// &:before {
	// 	border-width: 1px;
	// 	border-style: solid;
	// 	border-radius: 4px;
	// 	border-color: #b9bdce;
	// 	content: '';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	-webkit-transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
	// &:after {
	// 	content: '\e81a';
	// 	line-height: 18px;
	// 	font-style: normal;
	// 	color: transparent;
	// 	font-family: 'icons_2019';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
`;

const CheckBoxInput = styled.input`
	width: 16px;
	height: 16px;
	padding: 0;
	-webkit-appearance: button;
	cursor: pointer;
	font-size: 100%;
	outline: none;
	vertical-align: baseline;
	line-height: normal;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
	user-select: none;
	white-space: pre;
	align-items: flex-start;
	text-align: center;
`;

const CheckBoxLabel = styled.label`
	position: static;
	padding: 0 0 0 10px;
	pointer-events: all !important;
	cursor: pointer;
	top: -6px;
	left: 7px;
	background-color: #fff;
	white-space: nowrap;
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
`;

const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;
