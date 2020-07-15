import React from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

class PurchaseGeneralDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			general: {},
			values: new Map(),
			supplierName: '',
			blindReceipt: '',
			comments: '',
			contact: '',
			date: '',
			location: '',
			phone: '',
			requiredBy: '',
			shippingAddress1: '',
			shippingAddress2: '',
			stockOrInvoice: '',
			taxInclusive: '',
			taxRule: '',
			term: '',
			vendorAddressLine1: '',
			vendorAddressLine2: ''
		};
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		if (typeof this.props.generalDetails.type === 'object' && this.props.generalDetails.type !== null) {
			if (this.props.generalDetails.type.keys.hasOwnProperty(e.target.name)) {
				this.setState({ [e.target.name]: e.target.value });
				const values = cloneDeep(this.state.values);
				values.set(e.target.name, e.target.value);
				this.setState({ values: values });
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

	saveGeneralDetails(e) {
		var generalDetails = {
			variableName: this.state.supplierName,
			values: this.mapToObjectRec(this.state.values)
		};
		this.setState({ general: generalDetails }, () => {
			this.props.sendData(this.state.supplierName, this.state.general);
		});
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
								<Input
									name="supplierName"
									type="text"
									placeholder="Default"
									value={this.state.supplierName}
									onChange={this.onChange}
								/>
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
									value={this.state.contact}
									onChange={this.onChange}
								/>
								<InputLabel>Contact</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="phone"
									type="text"
									placeholder="Phone"
									value={this.state.phone}
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
									value={this.state.vendorAddressLine1}
									onChange={this.onChange}
								/>
								<InputLabel>Vendor Address Line 1</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="vendorAddressLine2"
									type="text"
									placeholder="line 2"
									value={this.state.vendorAddressLine2}
									onChange={this.onChange}
								/>
								<InputLabel> Vendor Address Line 2</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<H3>Accounting Details</H3>
							<FormControl style={{ alignItems: 'center' }}>
								<FormControl minHeight="0" paddingBottom="0">
									<RadioInput type="radio" name="StockFirst" defaultChecked="false" tabindex="35" />
									<RadioLabel>Stock First</RadioLabel>
								</FormControl>
								<FormControl minHeight="0" paddingBottom="0">
									<RadioInput type="radio" name="InvoiceFirst" tabindex="35" />
									<RadioLabel>Invoice First</RadioLabel>
								</FormControl>
							</FormControl>
							<FormControl>
								<Input
									name="term"
									type="text"
									placeholder="Default-----payment term"
									value={this.state.term}
									onChange={this.onChange}
								/>

								<InputLabel>Terms</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="requiredBy"
									type="text"
									placeholder="requiredy"
									value={this.state.requiredBy}
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
														checked={this.state.taxInclusive}
														tabindex="55"
														onChange={() => {
															this.setState(
																{ taxInclusive: !this.state.taxInclusive },
																() => {
																	const values = cloneDeep(this.state.values);
																	values.set('taxInclusive', this.state.taxInclusive);
																	this.setState({ values: values });
																}
															);
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
								<Input
									name="taxRule"
									type="text"
									placeholder="Default"
									value={this.state.taxRule}
									onChange={this.onChange}
								/>{' '}
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
														name="blindReceipt"
														checked={this.state.blindReceipt}
														tabindex="55"
														onChange={() => {
															this.setState(
																{ blindReceipt: !this.state.blindReceipt },
																() => {
																	const values = cloneDeep(this.state.values);
																	values.set('blindReceipt', this.state.blindReceipt);
																	this.setState({ values: values });
																}
															);
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
									value={this.state.date}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>
									Date <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="location"
									type="text"
									placeholder="Default"
									value={this.state.location}
									onChange={this.onChange}
								/>{' '}
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
									value={this.state.shippingAddress1}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Shipping Address Line 1</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="shippingAddress2"
									type="text"
									placeholder="Default"
									value={this.state.shippingAddress2}
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
									value={this.state.comments}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Comment</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</InputBody>
				<button onClick={(e) => this.saveGeneralDetails()}>save</button>
			</PageBlock>
		);
	}
}
export default PurchaseGeneralDetails;

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
	opacity: 0;
	width: 0;
	height: 0;
	overflow: hidden;
	box-sizing: border-box;
	background-color: initial;
	color: -internal-light-dark-color(black, white);
	cursor: default;
	-webkit-appearance: radio;
	margin: 3px 3px 0px 5px;
	border: initial;
	font-size: 100%;
	outline: none;
	font: 400 13.3333px Arial;
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
	&:before {
		content: '';
		width: 16px;
		height: 16px;
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		font-size: 21px;
		display: flex;
		background-color: transparent;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: #b9bdce;
		border-radius: 50%;
	}
	&:after {
		background-color: #05cbbf;
		opacity: 1;
		content: '';
		position: absolute;
		text-align: center;
		font-size: 21px;
		display: flex;
		width: 8px !important;
		height: 8px !important;
		top: 4px !important;
		left: 4px !important;
		border-radius: 50%;
	}
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
	z-index: 20;
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
