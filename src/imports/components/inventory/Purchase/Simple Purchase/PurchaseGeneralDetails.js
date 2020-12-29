import React from 'react';
import styled from 'styled-components';
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
	Input,
	PageBlock,
	PageToolbar,
	ToolbarItems,
	LeftItemWrapper,
	LeftItemH1,
	InputBody,
	InputFieldContainer,
	InputColumnWrapper,
	InputRowWrapper,
	FormControl,
	SelectWrapper,
	InputLabel,
	Required
} from '../../../../styles/inventory/Style';

class PurchaseGeneralDetails extends React.Component {
	constructor(props) {
		super();
		this.state = {
			variable: props.variable,
			contact: '',
			line1: '',
			line2: '',
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
		const values = variable.get('values');
		values.set('supplierName', e.target.value);
		if (e.target.data.contacts.length !== 0) {
			const contact = values.get('contact');
			contact.set('variableName', e.target.data.contacts[0].variableName);
			contact.set('context', e.target.data.contacts[0].context);
			values.set('contact', contact);
			values.set('phone', e.target.data.contacts[0].values.phone);
			this.setState({ contact: e.target.data.contacts[0].values.name });
		}
		if (e.target.data.addresses.length !== 0) {
			const address = values.get('vendorAddressLine1');
			address.set('variableName', e.target.data.addresses[0].variableName);
			address.set('context', e.target.data.addresses[0].context);
			values.set('vendorAddressLine1', address);
			values.set('vendorAddressLine2', address);
			this.setState({ line1: e.target.data.addresses[0].values.line1 });
			this.setState({ line2: e.target.data.addresses[0].values.line2 });
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
			<PageBlock style={{ display: 'block' }} paddingBottom="0">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemWrapper backgroundColor="#f9e491" color="black">
							Draft
						</LeftItemWrapper>
						<LeftItemH1>Simple Purchase</LeftItemH1>
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
								<H3>Supplier Details</H3>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value:this.state.variable.get('values').get('supplierName') ,
												label:this.state.variable.get('values').get('supplierName')
											}}
											isDisabled={this.props.creatable}
											onChange={(option) => {
												this.onVariableNameChange({
													target: {
														name: 'supplierName',
														value: option.value,
														data: option.data
													}
												});
											}}
											options={
												this.props.variables.Supplier !== undefined ? (
													this.props.variables.Supplier
														.filter(
															(supplier) =>
																supplier.values.general.values.status === 'Active'
														)
														.map((variable) => {
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
										value={this.state.contact}
										disabled
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
										value={this.state.line1}
										disabled
										onChange={this.onChange}
									/>
									<InputLabel>Vendor Address Line 1</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="vendorAddressLine2"
										type="text"
										placeholder="line 2"
										value={this.state.line2}
										disabled
										onChange={this.onChange}
									/>
									<InputLabel> Vendor Address Line 2</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper>
								<H3>Accounting Details</H3>
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
									<InputLabel> Payment Term</InputLabel>
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
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('values').get('account'),
												label: this.state.variable.get('values').get('account')
											}}
											isDisabled={this.props.creatable}
											onChange={(option) => {
												this.onChange({
													target: {
														name: 'account',
														value: option.value,
														data: option.data
													}
												});
											}}
											options={
												this.props.variables.Account !== undefined ? (
													this.props.variables.Account.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.values.name,
															data: variable.values
														};
													})
												) : (
													[]
												)
											}
										/>
									</SelectWrapper>
									<InputLabel>Inventory Account</InputLabel>
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
												this.props.variables.TaxRule !== undefined ? (
													this.props.variables.TaxRule
														.filter((taxRule) => taxRule.values.isTaxForPurchase === true)
														.map((variable) => {
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

								<FormControl>
									<Input
										name="date"
										type="date"
										placeholder="date"
										value={this.state.variable.get('values').get('date')}
										onChange={this.onChange}
										style={{ height: '38px' }}
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
})(PurchaseGeneralDetails);

const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;
