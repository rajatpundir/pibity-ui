import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

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
	ToolbarItems,
	FormControl,
	ButtonWithOutline
} from '../../../styles/inventory/Style';

class Stock extends React.Component {
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
				switch (e.target.name) {
					case 'onHand':
						values.set(e.target.name, e.target.value);
						values.set('available', e.target.value);
						break;
					default:
						values.set(e.target.name, e.target.value);
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.props.updateProductStock(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.push(
			new Map([
				[ 'typeName', 'ProductStore' ],
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'location', '' ],
						[ 'product', '' ],
						[ 'allocated', 0 ],
						[ 'available', '' ],
						[ 'onHand', '' ],
						[ 'onOrder', 0 ],
						[ 'status', 'Active' ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateProductStock(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateProductStock(list);
	}

	renderInputFields() {
		const rows = [];
		this.state.list.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="5%" left="0px">
						{this.props.params.variableName ? (
							undefined
						) : (
							<i
								name={listVariable.get('variableName')}
								className="large material-icons"
								onClick={(e) => this.onRemoveKey(e, listVariable.get('variableName'))}
							>
								remove_circle_outline
							</i>
						)}
					</TableData>
					<TableData width="10%" left="5%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('location'),
										label: listVariable.get('values').get('location')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'location', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									isDisabled={this.props.params.variableName ? true : false}
									options={
										this.props.variables.Location !== undefined ? (
											this.props.variables.Location
												.filter((location) => {
													return !this.state.list
														.map((list) => {
															return list.get('values').get('location');
														})
														.includes(location.variableName);
												})
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
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="onHand"
								type="number"
								value={listVariable.get('values').get('onHand')}
								disabled={this.props.params.variableName ? true : false}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="available"
								type="decimal"
								value={listVariable.get('values').get('available')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="onOrder"
								type="number"
								value={listVariable.get('values').get('onOrder')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="allocated"
								type="number"
								value={listVariable.get('values').get('allocated')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="5%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('status'),
										label: listVariable.get('values').get('status')
									}}
									onChange={(option) => {
										this.onChange({ target: { name: 'status', value: option.value } });
									}}
									isDisabled
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
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock id="stock">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Stock</LeftItemH1>
					</ToolbarItems>
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
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Location</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>On Hand</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Available</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>On Order</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Allocated</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Status</SelectSpan>
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
									<EmptyRow>You do not have any product matching the criteria</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							{this.props.params.variableName ? (
								undefined
							) : (
								<AddMoreBlock>
									<AddMoreButton onClick={(e) => this.addVariableToList()}>
										<i className="large material-icons">add</i>Add More Items
									</AddMoreButton>
								</AddMoreBlock>
							)}
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

export default connect(mapStateToProps, { clearErrors, getVariables })(Stock);
