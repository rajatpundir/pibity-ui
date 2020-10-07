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
	HeaderContainer,
	Headers,
	Input,
	InputBody,
	LeftItemH1,
	PageBar,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	PlusButton,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	SelectWrapper,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	ToolbarLeftItems,
	FormControl,
	ButtonWithOutline
} from '../../../styles/inventory/Style';

class CustomPrice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: props.list
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
			list: nextProps.list
		};
	}

	onChange(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateCustomPrice(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.unshift(
			new Map([
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'customer', '' ],
						[ 'customerCurrency', '' ],
						[ 'latestPrice', '' ],
						[ 'customPrice', '' ],
						[ 'lastSold', '' ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateCustomPrice(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateCustomPrice(list);
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
					<TableData width="20%" left="6%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('customer'),
										label: listVariable.get('values').get('customer')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'customer', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Customer !== undefined ? (
											this.props.variables.Customer.map((variable) => {
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
						</TableHeaderInner>
					</TableData>

					<TableData width="15%" left="25%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('customerCurrency'),
										label: listVariable.get('values').get('customerCurrency')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'customerCurrency', value: option.value } },
											listVariable.get('variableName')
										);
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
						</TableHeaderInner>
					</TableData>
					<TableData width="15%" left="46%">
						<TableHeaderInner>
							<Input
								name="latestPrice"
								type="text"
								value={listVariable.get('values').get('latestPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="15%" left="62%">
						<TableHeaderInner>
							<Input
								name="customPrice"
								type="text"
								value={listVariable.get('values').get('customPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="20%" left="79%">
						<TableHeaderInner>
							<Input
								name="lastSold"
								type="text"
								value={listVariable.get('values').get('lastSold')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock id="customPrices">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Custom Prices</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<PageBar>
					<PageBarAlign>
						<FormControl>
							<Input placeholder="Type text to search" />
						</FormControl>
						<FormControl>
							<ButtonWithOutline>Search</ButtonWithOutline>
						</FormControl>
					</PageBarAlign>
					<PageBarAlign float="right">
						<PlusButton onClick={(e) => this.addVariableToList()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlign>
				</PageBar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<Headers>
								<HeaderContainer>
									<HeaderBody>
										<BodyTable>
											<TableBody>
												<TableRow>
													<TableHeaders width="5%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="20%" left="6%">
														<SelectIconContainer>
															<SelectSpan>Customer</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="25%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Customer Currency</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="46%">
														<SelectIconContainer>
															<SelectSpan>Latest Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="62%">
														<SelectIconContainer>
															<SelectSpan>Custom Price </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="20%" left="79%">
														<SelectIconContainer>
															<SelectSpan>Last Sold</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
												</TableRow>
											</TableBody>
										</BodyTable>
									</HeaderBody>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>{this.renderInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? (
									<EmptyRow>There are no Custom Prices at the moment.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add Custom Prices
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

export default connect(mapStateToProps, { clearErrors, getVariables })(CustomPrice);
