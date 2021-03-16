import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables,objToMapRec } from '../../../../redux/actions/variables';
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
			supplierContacts: [],
			supplierAddresses: [],
			address: props.address,
			contact: props.contact,
			open: true
		};
		this.onChange = this.onChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable,
			address: nextProps.address,
			contact: nextProps.contact
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const selectedAddress = cloneDeep(this.state.address);
		const selectedContact = cloneDeep(this.state.contact);
		switch (e.target.name) {
			case 'supplierName':
				values.set(e.target.name, e.target.value);
				const supplierContacts =
					this.props.variables !== undefined
						? this.props.variables.SupplierContact !== undefined
							? this.props.variables.SupplierContact.filter(
									(contact) => contact.values.supplier === e.target.value
								)
							: []
						: [];
				const supplierAddresses =
					this.props.variables !== undefined
						? this.props.variables.SupplierAddress !== undefined
							? this.props.variables.SupplierAddress.filter(
									(address) => address.values.supplier === e.target.value
								)
							: []
						: [];
				this.setState({ supplierAddresses: supplierAddresses, supplierContacts: supplierContacts });
				break;
			case 'contact':
				values.set(e.target.name, e.target.value);
				selectedContact.set('variableName', e.target.value);
				selectedContact.set('values', objToMapRec(e.target.data.values));
				break;
			case 'address':
				values.set(e.target.name, e.target.value);
				selectedAddress.set('variableName', e.target.value);
				selectedAddress.set('values',objToMapRec(e.target.data.values));
				break;
			default:
				values.set(e.target.name, e.target.value);
				break;
		}
		variable.set('values', values);
		this.setState({ variable: variable, address: selectedAddress, contact: selectedContact });
		this.props.updateDetails(variable, selectedAddress, selectedContact);
	}

	render() {
		console.log(this.state.supplierAddresses)
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
												value: this.state.variable.get('values').get('supplierName'),
												label: this.state.variable.get('values').get('supplierName')
											}}
											isDisabled={this.props.creatable}
											onChange={(option) => {
												this.onChange({
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
									<SelectWrapper>
										<Select
											value={{
												value: this.state.contact.get('values').get('name'),
												label: this.state.contact.get('values').get('name')
											}}
											onChange={(option) => {
												this.onChange({
													target: {
														name: 'contact',
														value: option.value,
														data: option.data
													}
												});
											}}
											options={this.state.supplierContacts.map((variable) => {
												return {
													value: variable.variableName,
													label: variable.values.name,
													data: variable
												};
											})}
										/>
									</SelectWrapper>
									<InputLabel>
										Contact
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="phone"
										type="text"
										value={this.state.contact.get('values').get('phone')}
										readOnly
									/>{' '}
									<InputLabel>
										Phone
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.address.get('values').get('line1'),
												label: this.state.address.get('values').get('line1')
											}}
											onChange={(option) => {
												this.onChange({
													target: {
														name: 'address',
														value: option.value,
														data: option.data
													}
												});
											}}
											options={this.state.supplierAddresses.map((variable) => {
												return {
													value: variable.variableName,
													label: variable.values.line1,
													data: variable
												};
											})}
										/>
									</SelectWrapper>
									<InputLabel>
										Vendor Address Line 1
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="vendorAddressLine2"
										type="text"
										value={this.state.address.get('values').get('line2')}
										readOnly
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
										type="date"
										value={this.state.variable.get('values').get('requiredBy')}
										onChange={this.onChange}
										style={{ height: '38px' }}
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
