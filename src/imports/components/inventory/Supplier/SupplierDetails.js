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
	ToolbarItems,
	FormControl
} from '../../../styles/inventory/Style';

class SupplierDetails extends React.Component {
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
					<ToolbarItems>
						<LeftItemH1>Supplier</LeftItemH1>
					</ToolbarItems>
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
										name="supplierName"
										type="text"
										placeholder="Supplier Name"
										value={this.state.variable.get('variableName')}
										onChange={this.onVariableNameChange}
										disabled={this.props.params.variableName?true:false}
									/>{' '}
									<InputLabel>
										Name<Required>*</Required>
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
									<InputLabel>Currency</InputLabel>
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
										PaymentTerm<Required>*</Required>
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
												this.props.variables.TaxRule !== undefined ? (
													this.props.variables.TaxRule.map((variable) => {
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
									<InputLabel>Carrier Service</InputLabel>
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
									<InputLabel>Attribute Set</InputLabel>
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
})(SupplierDetails);
