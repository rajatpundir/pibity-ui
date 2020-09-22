import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';

class CustomerGeneralDetails extends React.Component {
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
		this.props.getVariables('Country');
		this.props.getVariables('Currency');
		this.props.getVariables('CarrierService');
		this.props.getVariables('PaymentTerm');
		this.props.getVariables('Status');
		this.props.getVariables('SalesTaxRule');
		this.props.getVariables('AttributeSet');
		this.props.getVariables('PriceTierName');
		this.props.getVariables('Location');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable
		};
	}

	onVariableNameChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set('variableName', e.target.value);
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
			<PageBlock style={{ display: 'block' }} id="customer">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Customer</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<InputBody>
					<InputFieldContainer>
						<InputColumnWrapper>
							<FormControl>
								<Input
									name="customerName"
									type="text"
									placeholder="Customer Name"
									value={this.state.variable.get('variableName')}
									onChange={this.onVariableNameChange}
								/>{' '}
								<InputLabel>
									Name
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('status'),
											label: this.state.variable.get('values').get('status')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'status', value: option.value } });
										}}
										options={
											this.props.variables.Status !== undefined ? (
												this.props.variables.Status.map((variable) => {
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
									Status<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('currency'),
											label: this.state.variable.get('values').get('currency')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'currency', value: option.value } });
										}}
										options={
											this.props.variables.Currency !== undefined ? (
												this.props.variables.Currency.map((variable) => {
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
									Currency <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('paymentTerm'),
											label: this.state.variable.get('values').get('paymentTerm')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'paymentTerm', value: option.value } });
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
								<InputLabel>
									Payment Term
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input />
								<InputLabel>
									Accounts Receivable
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('salesPriceTier'),
											label: this.state.variable.get('values').get('salesPriceTier')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'salesPriceTier', value: option.value } });
										}}
										options={
											this.props.variables.PriceTierName !== undefined ? (
												this.props.variables.PriceTierName.map((variable) => {
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
									Sales Price Tier<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<FormControl>
								<Input />
								<InputLabel>
									Sale Account
									<Required>*</Required>
								</InputLabel>
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
											this.props.variables.SalesTaxRule !== undefined ? (
												this.props.variables.SalesTaxRule.map((variable) => {
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
									Tax Rule<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input />
								<InputLabel>Sales Representative</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('defaultCarrier'),
											label: this.state.variable.get('values').get('defaultCarrier')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'defaultCarrier', value: option.value } });
										}}
										options={
											this.props.variables.CarrierService !== undefined ? (
												this.props.variables.CarrierService.map((variable) => {
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
								<InputLabel>Default Carrier</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('defaultLocation'),
											label: this.state.variable.get('values').get('defaultLocation')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'defaultLocation', value: option.value } });
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
								<InputLabel>Default Location</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="taxNumber"
									type="text"
									placeholder="tax Number"
									value={this.state.variable.get('values').get('taxNumber')}
									onChange={this.onChange}
								/>
								<InputLabel> Tax Number</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<FormControl>
								<Input
									name="discount"
									type="number"
									placeholder="discount"
									value={this.state.variable.get('values').get('discount')}
									onChange={this.onChange}
								/>
								<InputLabel>Discount</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="creditLimit"
									type="number"
									placeholder="creditLimit"
									value={this.state.variable.get('values').get('creditLimit')}
									onChange={this.onChange}
								/>
								<InputLabel>Credit Limit</InputLabel>
							</FormControl>
							<FormControl style={{ alignItems: 'center' }}>
								<CheckBoxWapper>
									<CheckBoxTable>
										<TBody>
											<TR>
												<TD>
													<CheckBoxInput
														type="checkbox"
														checked={this.state.variable.get('values').get('onCreditHold')}
														tabindex="55"
														onChange={(option) => {
															this.onChange({
																target: {
																	name: 'onCreditHold',
																	value: !this.state.variable
																		.get('values')
																		.get('onCreditHold')
																}
															});
														}}
													/>
												</TD>
											</TR>
										</TBody>
									</CheckBoxTable>
								</CheckBoxWapper>
								<CheckBoxLabel>On Credit Hold</CheckBoxLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('values').get('attributeSet'),
											label: this.state.variable.get('values').get('attributeSet')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'attributeSet', value: option.value } });
										}}
										options={
											this.props.variables.AttributeSet !== undefined ? (
												this.props.variables.AttributeSet.map((variable) => {
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
								<InputLabel>Attribute Set </InputLabel>
							</FormControl>
							<FormControl>
								<Input />
								<InputLabel>comma-delimited tags</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputRowWrapper>
							<FormControl>
								<Input
									name="comments"
									type="text"
									placeholder="comments"
									value={this.state.variable.get('values').get('comments')}
									onChange={this.onChange}
								/>
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
})(CustomerGeneralDetails);

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

const PageBlock = styled.div`
	display: block;
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
