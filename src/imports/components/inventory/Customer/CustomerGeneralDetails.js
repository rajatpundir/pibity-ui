import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
	InputColumnWrapper,
	InputRowWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarLeftItems,
	FormControl,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxTable,
	CheckBoxWapper,
	TR,
	TD,
	TBody
} from '../../../styles/inventory/Style';

class CustomerGeneralDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable,
			open: true
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
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Customer</LeftItemH1>
					</ToolbarLeftItems>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => this.setState({ open: !this.state.open })}
					>
						{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</PageToolbar>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody overflow="visible">
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
												this.onChange({
													target: { name: 'salesPriceTier', value: option.value }
												});
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
												this.onChange({
													target: { name: 'defaultCarrier', value: option.value }
												});
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
												this.onChange({
													target: { name: 'defaultLocation', value: option.value }
												});
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
															checked={this.state.variable
																.get('values')
																.get('onCreditHold')}
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
												this.onChange({
													target: { name: 'attributeSet', value: option.value }
												});
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
				</Collapse>
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
