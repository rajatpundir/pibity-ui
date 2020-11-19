import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


import {
	InputColumnWrapper,

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

} from '../../../../styles/inventory/Style';


class InvoiceGeneralDetails extends React.Component {
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
		console.log(this.state.variable);
		// console.log(this.state.variable.get('issueDate'));

		return (
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Invoice</LeftItemH1>
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
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('values').get('to'),
												label: this.state.variable.get('values').get('to')
											}}
											onChange={(option) => {
												this.onChange({ target: { name: 'to', value: option.value } });
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
										To<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="issueDate"
										type="date"
										placeholder="date"

										//this.state.variable.get('values').get('general').get('values').get('Date')
										value={this.state.variable.get('issueDate')}

										onChange={this.onChange}
									/>
									<InputLabel>
										Issue Date <Required>*</Required>
									</InputLabel>
								</FormControl>


								<FormControl>
									<Input
										name="onlinePayment"
										placeholder="Online Payment"

										//this.state.variable.get('values').get('general').get('values').get('Date')
										value={this.state.variable.get('onlinePayment')}

										onChange={this.onChange}
									/>
									<InputLabel>
										Online Payment
										<Required>*</Required>
									</InputLabel>
								</FormControl>

							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="reference"
										type="text"
										placeholder="#"
										value={this.state.variable.get('reference')}
										onChange={this.onChange} />
									<InputLabel>
										Reference
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>

									<Input
										name="dueDate"
										type="date"
										placeholder="date"
										value={this.state.variable.get('dueDate')}
										onChange={this.onChange}
									/>

									<InputLabel>
										Due Date<Required>*</Required>
									</InputLabel>
								</FormControl>

								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('values').get('brandingTheme'),
												label: this.state.variable.get('values').get('brandingTheme')
											}}
											onChange={(option) => {
												this.onChange({
													target: { name: 'brandingTheme', value: option.value }
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
									<InputLabel>Branding Theme</InputLabel>
								</FormControl>


							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="invoiceNumber"
										type="text"
										placeholder="#"
										value={this.state.variable.get('values').get('invoiceNumber')}
										onChange={this.onChange}
									/>
									<InputLabel>Invoice Number</InputLabel>
								</FormControl>


								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('values').get('currency'),
												label: this.state.variable.get('values').get('currency')
											}}
											onChange={(option) => {
												this.onChange({
													target: { name: 'currency', value: option.value }
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
									<InputLabel>Currency </InputLabel>
								</FormControl>

							</InputColumnWrapper>
							
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
})(InvoiceGeneralDetails);
