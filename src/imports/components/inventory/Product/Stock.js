import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import { customErrorMessage, CustomNotification, successMessage } from '../../main/Notification';
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
	ToolbarLeftItems,
	FormControl,
	ButtonWithOutline
} from '../../../styles/inventory/Style';

class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: props.list,
			selectedlocation: []
		};
		this.onChange = this.onChange.bind(this);
		this.onLocationChange = this.onLocationChange.bind(this);
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

	onLocationChange(e, variableName) {
		if (
			this.state.list.filter((variable) => {
				return variable.get('values').get('location') === e.target.value;
			}).length === 0
		) {
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
			this.props.updateProductStock(list);
		} else {
			customErrorMessage('Location Can not be same Add another location');
		}
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
		this.props.updateProductStock(list);
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
						[ 'location', '' ],
						[ 'bin', '' ],
						[ 'stockValue', '' ],
						[ 'allocated', '' ],
						[ 'available', '' ],
						[ 'batch', '' ],
						[ 'expiryDate', '' ],
						[ 'nextDelivery', '' ],
						[ 'onHand', '' ],
						[ 'onOrder', '' ]
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
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
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

					<TableData width="8%" left="15%">
						<TableHeaderInner>
							<Input
								name="bin"
								type="text"
								value={listVariable.get('values').get('bin')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="23%">
						<TableHeaderInner>
							<Input
								name="batch"
								type="Decimal"
								value={listVariable.get('values').get('batch')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="34%">
						<TableHeaderInner>
							<Input
								name="expiryDate"
								type="text"
								value={listVariable.get('values').get('expiryDate')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="43%">
						<TableHeaderInner>
							<Input
								name="stockValue"
								type="decimal"
								value={listVariable.get('values').get('stockValue')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="50%">
						<TableHeaderInner>
							<Input
								name="onHand"
								type="number"
								value={listVariable.get('values').get('onHand')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%" left="59%">
						<TableHeaderInner>
							<Input
								name="available"
								type="decimal"
								value={listVariable.get('values').get('available')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="9%" left="69%">
						<TableHeaderInner>
							<Input
								name="onOrder"
								type="number"
								value={listVariable.get('values').get('onOrder')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%" left="78%">
						<TableHeaderInner>
							<Input
								name="allocated"
								type="number"
								value={listVariable.get('values').get('allocated')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="90%">
						<TableHeaderInner>
							<Input
								name="nextDelivery"
								type="number"
								value={listVariable.get('values').get('nextDelivery')}
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
			<PageBlock id="stock">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Stock</LeftItemH1>
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
													<TableHeaders width="10%" left="5%">
														<SelectIconContainer>
															<SelectSpan>Location</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="15%">
														<SelectIconContainer>
															<SelectSpan>Bin</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="23%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Batch</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="34%">
														<SelectIconContainer>
															<SelectSpan>Expiery Date</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="43%">
														<SelectIconContainer>
															<SelectSpan>Stock Value</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="50%">
														<SelectIconContainer>
															<SelectSpan>On Hand</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="59%">
														<SelectIconContainer>
															<SelectSpan>Available</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="9%" left="69%">
														<SelectIconContainer>
															<SelectSpan>On Order</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="78%">
														<SelectIconContainer>
															<SelectSpan>Allocated</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="90%">
														<SelectIconContainer>
															<SelectSpan>Net Delivery</SelectSpan>
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
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add More Items
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

export default connect(mapStateToProps, { clearErrors, getVariables })(Stock);
