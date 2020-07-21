import React from 'react';
import styled from 'styled-components';
// import Select from 'react-select'
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';

class SupplierDetails extends React.Component {
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
		this.props.getVariables("Currency")
		this.props.getVariables("PaymentTerm")
		this.props.getVariables("SalesTaxRule")
		this.props.getVariables("Status")
		this.props.getVariables("CarrierService")
		this.props.getVariables("AttributeSet")
	}

	onVariableNameChange(e) {
		const variable = cloneDeep(this.state.variable)
		variable.set('variableName', e.target.value)
		this.setState({ variable: variable })
		this.props.updateDetails(variable)
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable)
		const values = variable.get('values')
		values.set(e.target.name, e.target.value)
		variable.set('values', values)
		this.setState({ variable: variable })
		this.props.updateDetails(variable)
	}

	render() {
		return (
			<PageBlock>
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Supplier</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<InputBody>
					<InputFieldContainer>
						<InputColumnWrapper>
							<FormControl>
								<Input
									name="supplierName"
									type="text"
									placeholder="Supplier Name"
									value={this.state.variable.get('variableName')}
									onChange={this.onVariableNameChange}
								/>{' '}
								<InputLabel>Name<Required>*</Required></InputLabel>
							</FormControl>
							<Select
								name="currency"
								value={this.state.variable.get('values').get('currency')}
								onChange={this.onChange}
							>
								<option value="none" disabled hidden>
									Select Currency
								</option>
								{this.props.variables.Currency ? this.props.variables.Currency.map((variable) => {
									console.log(variable)
									return (
										<option key={variable.variableName} value={variable.variableName}>
											{variable.variableName}
										</option>
									);
								}) : undefined}
							</Select>
							{/* <Select
								name="currency"
								value={this.state.variable.get('values').get('currency')}
								onChange={(option) => {
									this.onChange({ target: { name: 'currency', value: option.value } })
								}}
								options={[{ value: 'SSSSSSSSSSSSS', label: 'LLLLLLLLLLLL' }]}
							/> */}
							<FormControl>
								<Input
									name="paymentTerm"
									type="text"
									placeholder="Default"
									value={this.state.variable.get('values').get('paymentTerm')}
									onChange={this.onChange}
								/>
								<InputLabel>
									Payment Term
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input />
								<InputLabel>
									Accounts Payable
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputColumnWrapper>
						<InputColumnWrapper>
							<FormControl>
								<Input
									name="taxRule"
									type="text"
									placeholder="Defult"
									value={this.state.variable.get('values').get('taxRule')}
									onChange={this.onChange}
								/>
								<InputLabel>
									Tax Rule<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="status"
									type="text"
									placeholder="default"
									value={this.state.variable.get('values').get('status')}
									onChange={this.onChange}
								/>
								<InputLabel>
									Status<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="defaultCarrier"
									type="text"
									placeholder="default"
									value={this.state.variable.get('values').get('defaultCarrier')}
									onChange={this.onChange}
								/>
								<InputLabel>Default Carrier</InputLabel>
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
									name="attributeSet"
									type="text"
									placeholder="default"
									value={this.state.variable.get('values').get('attributeSet')}
									onChange={this.onChange}
								/>
								<InputLabel>Attribute Set </InputLabel>
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
		)
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
})(SupplierDetails);


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
`;

const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%'
}))`
flex-basis: ${(props) => props.flexBasis};`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
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

export const Select = styled.select.attrs((props) => ({
	marginBottom: props.marginBottom || '1.4rem',
	padding: props.padding || 'none',
	paddingLeft: props.paddingLeft || props.padding
}))`
	font-size: 1.4rem;
	max-height: 4.5rem;
	font-family: Helvetica, Arial, sans-serif;
	margin-bottom:${(props) => props.marginBottom};
	padding: ${(props) => props.padding};
	padding-left:${(props) => props.paddingLeft}
	&:focus {
		outline: none;
	}
`;
