import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import {
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	EmptyRow,
	HeaderBody,
	HeaderBodyContainer,
	Input,
	InputBody,
	PageBlock,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	SelectWrapper,
	RactSelectCustomStyles,
	PageToolbar,
	ToolbarItems,
	Custombutton,
	LeftItemH1
} from '../../../styles/inventory/Style';

class SupplierAddresses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: props.supplierAddresses,
			area: []
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
			list: nextProps.supplierAddresses
		};
	}

	onChange(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				if (e.target.name === 'postCode') {
					const area = e.target.data.area;
					if (area.length === 1) {
						values.set('city', area[0].variableName);
					}
					this.setState({ area: area });
				}
				if (this.props.updatable) {
					values.set('supplier', this.props.supplier);
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateAddresses(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.push(
			new Map([
				[ 'typeName', 'SupplierAddress' ],
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'line1', '' ],
						[ 'line2', '' ],
						[ 'city', '' ],
						[ 'state', '' ],
						[ 'postCode', '' ],
						[ 'country', '' ],
						[ 'addressType', '' ],
						[ 'supplier', '' ],
						[ 'isDefault', false ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateAddresses(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateAddresses(list);
	}

	renderInputFields() {
		const rows = [];
		this.state.list.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="5%" left="0px">
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
					</TableData>
					<TableData width="10%" left="7%">
						<TableHeaderInner>
							<Input
								name="name"
								type="text"
								value={listVariable.get('values').get('name')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="16%">
						<TableHeaderInner>
							<Input
								name="line1"
								type="text"
								value={listVariable.get('values').get('line1')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="25%">
						<TableHeaderInner>
							<Input
								name="line2"
								type="text"
								value={listVariable.get('values').get('line2')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="75%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									styles={RactSelectCustomStyles}
									value={{
										value: listVariable.get('values').get('country'),
										label: listVariable.get('values').get('country')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'country', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Country !== undefined ? (
											this.props.variables.Country.map((variable) => {
												return { value: variable.variableName, label: variable.variableName };
											})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="50%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									styles={RactSelectCustomStyles}
									value={{
										value: listVariable.get('values').get('state'),
										label: listVariable.get('values').get('state')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'state', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.States !== undefined ? listVariable
											.get('values')
											.get('country') !== '' ? (
											this.props.variables.States
												.filter(
													(state) =>
														state.values.country ===
														listVariable.get('values').get('country')
												)
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.variableName
													};
												})
										) : (
											[]
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="62%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									styles={RactSelectCustomStyles}
									value={{
										value: listVariable.get('values').get('postCode'),
										label: listVariable.get('values').get('postCode')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'postCode', value: option.value, data: option.data } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.PinCode !== undefined ? listVariable
											.get('values')
											.get('state') !== '' ? (
											this.props.variables.PinCode
												.filter(
													(pincode) =>
														pincode.values.state === listVariable.get('values').get('state')
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
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="37%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									styles={RactSelectCustomStyles}
									value={{
										value: listVariable.get('values').get('city'),
										label: listVariable.get('values').get('city')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'city', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={this.state.area}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="86%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									styles={RactSelectCustomStyles}
									value={{
										value: listVariable.get('values').get('addressType'),
										label: listVariable.get('values').get('addressType')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'addressType', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.AddressType !== undefined ? (
											this.props.variables.AddressType.map((variable) => {
												return { value: variable.variableName, label: variable.variableName };
											})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock id="address">
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Supplier Address</LeftItemH1>
					</ToolbarItems>
					<ToolbarItems>
						{this.props.updatable ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.updateSupplierAddress();
								}}
							>
								Update
							</Custombutton>
						) : (
							undefined
						)}
					</ToolbarItems>
				</PageToolbar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>
											<TableRow>
												<TableHeaders width="6%" left="0px">
													<SelectIconContainer>
														<SelectSpan>
															<SelectSpanInner>
																<i className="large material-icons">create</i>
															</SelectSpanInner>
														</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="7%">
													<SelectIconContainer>
														<SelectSpan>Name</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="16%">
													<SelectIconContainer>
														<SelectSpan>Line 1</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="25%">
													<SelectIconContainer>
														<SelectSpan textAlign="right">Line 2</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="75%">
													<SelectIconContainer>
														<SelectSpan>Country</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="12%" left="50%">
													<SelectIconContainer>
														<SelectSpan> State / Province</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="11%" left="62%">
													<SelectIconContainer>
														<SelectSpan>PostCode</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="37%">
													<SelectIconContainer>
														<SelectSpan>City / Suburb</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="86%">
													<SelectIconContainer>
														<SelectSpan>Type</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderInputFields()}
										</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? <EmptyRow>No Addresses found.</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add More Addresess
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(SupplierAddresses);
