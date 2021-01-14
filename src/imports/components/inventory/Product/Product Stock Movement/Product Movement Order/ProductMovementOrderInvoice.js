import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';
import Select from 'react-select';
import { clearErrors } from '../../../../../redux/actions/errors';
import { successMessage } from '../../../../main/Notification';
import { createVariable, getVariables, updateVariable, objToMapRec } from '../../../../../redux/actions/variables';
import {
	AddMoreBlock,
	AddMoreButton,
	BlockInnerTable,
	BlockTableBody,
	BlockTableHead,
	BlockTableHeader,
	BlockTableTd,
	BodyTable,
	EmptyRow,
	EqualBlockContainer,
	FormControl,
	H3,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	Input,
	InputBody,
	InputColumnWrapper,
	InputLabel,
	LeftBlock,
	LeftItemH1,
	PageBar,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	PlusButton,
	Required,
	RightBlock,
	RightBlockTable,
	RoundBlockInnerDiv,
	RoundBlockOuterDiv,
	RoundedBlock,
	Span,
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
	TextArea,
	TextAreaContainer,
	ToolbarItems,
	Custombutton,
	InputRowWrapper,
	CheckBoxContainer,
	CheckBoxInput,
	CheckBoxLabel
} from '../../../../../styles/inventory/Style';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class ProductMovementOrderInvoice extends React.Component {
	constructor(props) {
		super();
		this.state = {
			includeProductPrice: false,
			productStore: [],
			prevPropVariable: {},
			prevVariable: new Map(),
			invoice: new Map([
				[ 'typeName', 'ProductMovementOrderInvoice' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'movementType', '' ],
						[ 'productMovementOrder', '' ],
						[ 'toLocation', '' ],
						[ 'fromLocation', '' ],
						[ 'invoiceDate', '' ],
						[ 'invoiceNumber', '' ],
						[ 'date', '' ],
						[ 'status', 'Waiting For Dispatch' ],
						[ 'total', 0 ],
						[ 'balanceDue', 0 ],
						[ 'paymentStatus', 'Due' ],
						[ 'totalAdditionalCostBeforeTax', 0 ],
						[ 'totalTaxOnAdditionalCost', 0 ],
						[ 'totalProductCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ],
						[ 'comments', '' ]
					])
				]
			]),
			additionalCost: [],
			orderItems: []
		};
		this.onChange = this.onChange.bind(this);
		this.onInvocieChange = this.onInvocieChange.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('ProductMovementOrderInvoice');
		this.props.getVariables('ProductMovementInvoiceAdditionalCost');
		this.props.getVariables('ProductMovementOrderInvoiceItems');
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.variables.ProductMovementOrderInvoice &&
			nextProps.variables.ProductMovementInvoiceAdditionalCost &&
			nextProps.variables.ProductMovementOrderInvoiceItems
		) {
			const invoice = nextProps.variables.ProductMovementOrderInvoice.filter(
				(variable) => variable.values.productMovementOrder === nextProps.productMovementOrder
			)[0];

			if (invoice && prevState.prevPropVariable !== invoice) {
				const orderItems = nextProps.variables.ProductMovementOrderInvoiceItems
					.filter((items) => items.values.orderId === invoice.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const additionalCost = nextProps.variables.ProductMovementInvoiceAdditionalCost
					.filter((additionalItem) => additionalItem.values.orderId === invoice.variableName)
					.map((item) => {
						return objToMapRec(item);
					});
				const variableMap = objToMapRec(invoice);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					additionalCost: additionalCost,
					orderItems: orderItems,
					invoice: variableMap,
					prevPropVariable: invoice,
					prevVariable: prevVariableMap
				};
			}
		}
		return {
			...prevState
		};
	}

	onInvocieChange(e) {
		const invoice = cloneDeep(this.state.invoice);
		const values = invoice.get('values');
		values.set(e.target.name, e.target.value);
		if (e.target.name === 'invoiceDate') {
			values.set('date', e.target.value);
		}
		invoice.set('values', values);
		this.setState({ invoice: invoice });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			this.onCalculateTotal();
		});
	}

	onItemChange(e, variableName, listName) {
		const Items = listName === 'orderItems' ? this.state.orderItems : this.state.additionalCost;
		const list = Items.map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				switch (e.target.name) {
					case 'quantity':
						values.set(e.target.name, e.target.value);
						values.set(
							'total',
							listVariable.get('values').get('price') *
								e.target.value *
								((100 - listVariable.get('values').get('discount')) / 100)
						);
						break;
					case 'price':
						values.set(e.target.name, e.target.value);
						values.set(
							'total',
							listVariable.get('values').get('quantity') *
								e.target.value *
								((100 - listVariable.get('values').get('discount')) / 100)
						);
						break;
					case 'discount':
						values.set(e.target.name, e.target.value);
						values.set(
							'total',
							listVariable.get('values').get('quantity') *
								listVariable.get('values').get('price') *
								((100 - e.target.value) / 100)
						);
						break;
					default:
						values.set(e.target.name, e.target.value);
						break;
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		if (listName === 'orderItems') {
			this.setState({ orderItems: list }, () => {
				this.onCalculateTotal();
			});
		} else {
			this.setState({ additionalCost: list }, () => {
				this.onCalculateTotal();
			});
		}
	}

	addVariableToadditionalCostList() {
		const list = cloneDeep(this.state.additionalCost);
		list.push(
			new Map([
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[ 'typeName', 'ProductMovementInvoiceAdditionalCost' ],

				[
					'values',
					new Map([
						[ 'orderId', '' ],
						[ 'service', '' ],
						[ 'discount', 0 ],
						[ 'price', 0 ],
						[ 'quantity', 0 ],
						[ 'taxRule', '' ],
						[ 'total', 0 ]
					])
				]
			])
		);
		this.setState({ additionalCost: list });
	}

	onRemoveAdditionalCostListKey(e, variableName) {
		const list = this.state.additionalCost.filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ additionalCost: list }, () => {
			this.onCalculateTotal();
		});
	}

	onCalculateTotal() {
		var productCostBeforeTax = 0;
		var totalTaxOnProduct = 0;
		var additionalCostBeforeTax = 0;
		var totalTaxOnAdditionalCost = 0;
		var totalCost = 0;
		// Product Cost
		this.state.orderItems.forEach((listVariable) => {
			const taxRule = this.props.variables.TaxRule.filter(
				(taxRule) => taxRule.variableName === listVariable.get('values').get('taxRule')
			)[0];
			if (taxRule) {
				switch (taxRule.values.taxType) {
					case 'Exclusive':
						totalTaxOnProduct =
							totalTaxOnProduct +
							listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total');
						break;
					case 'Inclusive':
						const tax = listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalTaxOnProduct = totalTaxOnProduct + tax;
						productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total') - tax;
						break;
					default:
						break;
				}
			} else {
				productCostBeforeTax = productCostBeforeTax + listVariable.get('values').get('total');
			}
		});
		//AdditionalCost
		this.state.additionalCost.forEach((listVariable) => {
			const taxRule = this.props.variables.TaxRule.filter(
				(taxRule) => taxRule.variableName === listVariable.get('values').get('taxRule')
			)[0];
			if (taxRule) {
				switch (taxRule.values.taxType) {
					case 'Exclusive':
						totalTaxOnAdditionalCost =
							totalTaxOnAdditionalCost +
							listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						additionalCostBeforeTax = additionalCostBeforeTax + listVariable.get('values').get('total');
						break;
					case 'Inclusive':
						const tax = listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalTaxOnAdditionalCost = totalTaxOnAdditionalCost + tax;
						additionalCostBeforeTax =
							additionalCostBeforeTax + listVariable.get('values').get('total') - tax;
						break;
					default:
						break;
				}
			} else {
				additionalCostBeforeTax = additionalCostBeforeTax + listVariable.get('values').get('total');
			}
		});
		if (this.state.includeProductPrice) {
			totalCost = productCostBeforeTax + totalTaxOnProduct + additionalCostBeforeTax + totalTaxOnAdditionalCost;
		} else {
			totalCost = additionalCostBeforeTax + totalTaxOnAdditionalCost;
		}
		const variable = cloneDeep(this.state.invoice);
		const values = variable.get('values');
		values.set('balanceDue', totalCost);
		values.set('total', totalCost);
		values.set('totalProductCostBeforeTax', productCostBeforeTax);
		values.set('totalTaxOnProduct', totalTaxOnProduct);
		values.set('totalAdditionalCostBeforeTax', additionalCostBeforeTax);
		values.set('totalTaxOnAdditionalCost', totalTaxOnAdditionalCost);
		if (totalCost === 0) {
			values.set('paymentStatus', 'Paid');
		} else {
			values.set('paymentStatus', 'Due');
		}
		variable.set('values', values);
		this.setState({
			invoice: variable
		});
	}

	renderOrderItemsFields() {
		const rows = [];
		this.state.orderItems.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="6%">
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveAdditionalCostListKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
					</TableData>

					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="product"
								type="text"
								value={listVariable.get('values').get('product')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="availableQuantity"
								type="number"
								value={listVariable.get('values').get('availableQuantity')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="requestedQuantity"
								type="number"
								value={listVariable.get('values').get('requestedQuantity')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onItemChange(e, listVariable.get('variableName'), 'orderItems')}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="price"
								type="text"
								value={listVariable.get('values').get('price')}
								onChange={(e) => this.onItemChange(e, listVariable.get('variableName'), 'orderItems')}
							/>
						</TableHeaderInner>
					</TableData>
					{/* <TableData width="10%">
						<TableHeaderInner>
							<Input
								name="discount"
								type="text"
								value={listVariable.get('values').get('discount')}
								onChange={(e) => this.onItemChange(e, listVariable.get('variableName'),'orderItems')}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('taxRule'),
										label: listVariable.get('values').get('taxRule')
									}}
									onChange={(option) => {
										this.onItemChange(
											{ target: { name: 'taxRule', value: option.value } },
											listVariable.get('variableName'),
											'orderItems'
										);
									}}
									options={
										this.props.variables.TaxRule !== undefined ? (
											this.props.variables.TaxRule
												.filter((taxRule) => taxRule.values.isTaxForPurchase === true)
												.map((invoice) => {
													return {
														value: invoice.variableName,
														label: invoice.variableName
													};
												})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData> */}
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="total"
								type="number"
								value={listVariable.get('values').get('total')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	renderAdditionalCostInputFields() {
		const rows = [];
		this.state.additionalCost.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="6%">
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveAdditionalCostListKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
					</TableData>
					<TableData width="11%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('service'),
										label: listVariable.get('values').get('service')
									}}
									onChange={(option) => {
										this.onItemChange(
											{ target: { name: 'service', value: option.value } },
											listVariable.get('variableName'),
											'additionalCost'
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter(
													(product) => product.values.general.values.productType === 'Service'
												)
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
					<TableData width="11%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) =>
									this.onItemChange(e, listVariable.get('variableName'), 'additionalCost')}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%">
						<TableHeaderInner>
							<Input
								name="price"
								type="text"
								value={listVariable.get('values').get('price')}
								onChange={(e) =>
									this.onItemChange(e, listVariable.get('variableName'), 'additionalCost')}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%">
						<TableHeaderInner>
							<Input
								name="discount"
								type="text"
								value={listVariable.get('values').get('discount')}
								onChange={(e) =>
									this.onItemChange(e, listVariable.get('variableName'), 'additionalCost')}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('taxRule'),
										label: listVariable.get('values').get('taxRule')
									}}
									onChange={(option) => {
										this.onItemChange(
											{ target: { name: 'taxRule', value: option.value } },
											listVariable.get('variableName'),
											'additionalCost'
										);
									}}
									options={
										this.props.variables.TaxRule !== undefined ? (
											this.props.variables.TaxRule
												.filter((taxRule) => taxRule.values.isTaxForPurchase === true)
												.map((invoice) => {
													return {
														value: invoice.variableName,
														label: invoice.variableName
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
								name="total"
								type="number"
								value={listVariable.get('values').get('total')}
								readOnly
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
			<PageBlock id="invoice">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Invoice</LeftItemH1>
					</ToolbarItems>
				</PageToolbar>
				<PageBar>
					<FormControl flexBasis={style.flexBasis}>
						<Input
							style={{
								height: ' 38px'
							}}
							name="invoiceDate"
							type="date"
							value={this.state.invoice.get('values').get('invoiceDate')}
							readOnly
						/>{' '}
						<InputLabel>
							Invoice Date
							<Required>*</Required>
						</InputLabel>
					</FormControl>
					<FormControl flexBasis={style.flexBasis}>
						<Input
							name="invoiceNumber"
							type="text"
							value={this.state.invoice.get('values').get('invoiceNumber')}
							readOnly
						/>{' '}
						<InputLabel>
							Invoice Number
							<Required>*</Required>
						</InputLabel>
					</FormControl>
					<FormControl flexBasis={style.flexBasis}>
						<Input
							name="fromLocation"
							type="text"
							value={this.state.invoice.get('values').get('fromLocation')}
							backgroundColor="hsl(0,0%,95%)"
							borderColor="hsl(0,0%,95%)"
							readOnly
						/>{' '}
						<InputLabel>From Location</InputLabel>
					</FormControl>
					<FormControl flexBasis={style.flexBasis}>
						<Input
							name="toLocation"
							type="text"
							value={this.state.invoice.get('values').get('toLocation')}
							backgroundColor="hsl(0,0%,95%)"
							borderColor="hsl(0,0%,95%)"
							readOnly
						/>{' '}
						<InputLabel>To Location</InputLabel>
					</FormControl>
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
													<TableHeaders width="6%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="8%">
														<SelectIconContainer>
															<SelectSpan>Product</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="35%">
														<SelectIconContainer>
															<SelectSpan>Available Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="50%">
														<SelectIconContainer>
															<SelectSpan>Requested Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="50%">
														<SelectIconContainer>
															<SelectSpan>Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="60%">
														<SelectIconContainer>
															<SelectSpan>Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													{/* <TableHeaders width="10%" left="60%">
															<SelectIconContainer>
																<SelectSpan>Discount</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%" left="73%">
															<SelectIconContainer>
																<SelectSpan>Tax Rule</SelectSpan>
															</SelectIconContainer>
														</TableHeaders> */}
													<TableHeaders width="10%" left="85%">
														<SelectIconContainer>
															<SelectSpan>Total</SelectSpan>
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
										<TableBody>{this.renderOrderItemsFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.orderItems.length === 0 ? (
									<EmptyRow>You do not have any Order Lines.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							{/* <AddMoreBlock>
									<AddMoreButton onClick={(e) => this.addVariableToadditionalCostList()}>
										<i className="large material-icons">add</i>Add Additional Services Charges
									</AddMoreButton>
								</AddMoreBlock> */}
						</TableFieldContainer>
					</RoundedBlock>

					<RoundedBlock overflow="visible" marginTop="20px">
						<TableFieldContainer overflow="visible">
							<Headers>
								<HeaderContainer>
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
													<TableHeaders width="11%" left="8%">
														<SelectIconContainer>
															<SelectSpan>Service</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="35%">
														<SelectIconContainer>
															<SelectSpan>Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="50%">
														<SelectIconContainer>
															<SelectSpan>Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="60%">
														<SelectIconContainer>
															<SelectSpan>Discount</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="73%">
														<SelectIconContainer>
															<SelectSpan>Tax Rule</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="85%">
														<SelectIconContainer>
															<SelectSpan>Total</SelectSpan>
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
										<TableBody>{this.renderAdditionalCostInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.additionalCost.length === 0 ? (
									<EmptyRow>You do not have any Additional Cost Lines.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToadditionalCostList()}>
									<i className="large material-icons">add</i>Add Additional Services Charges
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
					<InputRowWrapper paddingTop="15px">
						<TextAreaContainer>
							<TextArea
								name="comments"
								type="text"
								placeholder="Wrtie a note here"
								value={this.state.invoice.get('values').get('comments')}
								height="50px"
								onChange={this.onChange}
							/>
							<InputLabel>Note</InputLabel>
						</TextAreaContainer>
					</InputRowWrapper>
					<EqualBlockContainer>
						<LeftBlock>
							<CheckBoxContainer>
								<CheckBoxInput
									type="checkbox"
									checked={this.state.includeProductPrice}
									tabindex="55"
									onChange={(option) => {
										this.onChange({
											target: {
												name: 'includeProductPrice',
												value: !this.state.includeProductPrice
											}
										});
									}}
								/>
								<CheckBoxLabel>Include Product Price</CheckBoxLabel>
							</CheckBoxContainer>
							{/* <TextAreaContainer>
								<TextArea
									name="comments"
									value=""
									placeholder="Write a note here..."
									onChange={this.onChange}
								/>
								<InputLabel>Note</InputLabel>
							</TextAreaContainer> */}
						</LeftBlock>
						<RightBlock>
							<RightBlockTable>
								<BlockTableHead>
									<TableRow>
										<BlockTableHeader width="25%" />
										<BlockTableHeader width="25%">Product Lines</BlockTableHeader>
										<BlockTableHeader width="25%">Additional Cost</BlockTableHeader>
										<BlockTableHeader width="25%">Total</BlockTableHeader>
									</TableRow>
								</BlockTableHead>
								<BlockTableBody>
									<TableRow>
										<BlockTableTd style={{ border: 'none' }}>
											<BlockInnerTable>
												<TableBody>
													<TableRow>
														<BlockTableTd>
															<Span color="#41454e">BEFORE TAX</Span>
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															<Span color="#41454e">TAX</Span>
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															<Span color="#41454e">TOTAL </Span>
														</BlockTableTd>
													</TableRow>
												</TableBody>
											</BlockInnerTable>
										</BlockTableTd>
										<BlockTableTd style={{ border: 'none' }}>
											<BlockInnerTable>
												<TableBody>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalProductCostBeforeTax')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice.get('values').get('totalTaxOnProduct')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalProductCostBeforeTax') +
																this.state.invoice
																	.get('values')
																	.get('totalTaxOnProduct')}
														</BlockTableTd>
													</TableRow>
												</TableBody>
											</BlockInnerTable>
										</BlockTableTd>
										<BlockTableTd style={{ border: 'none' }}>
											<BlockInnerTable>
												<TableBody>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalAdditionalCostBeforeTax')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalTaxOnAdditionalCost')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalAdditionalCostBeforeTax') +
																this.state.invoice
																	.get('values')
																	.get('totalTaxOnAdditionalCost')}
														</BlockTableTd>
													</TableRow>
												</TableBody>
											</BlockInnerTable>
										</BlockTableTd>
										<BlockTableTd style={{ border: 'none' }}>
											<BlockInnerTable>
												<TableBody>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalProductCostBeforeTax') +
																this.state.invoice
																	.get('values')
																	.get('totalAdditionalCostBeforeTax')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice
																.get('values')
																.get('totalTaxOnAdditionalCost') +
																this.state.invoice
																	.get('values')
																	.get('totalTaxOnProduct')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice.get('values').get('total')}
														</BlockTableTd>
													</TableRow>
												</TableBody>
											</BlockInnerTable>
										</BlockTableTd>
									</TableRow>
								</BlockTableBody>
							</RightBlockTable>
						</RightBlock>
					</EqualBlockContainer>
					<RoundedBlock style={{ marginTop: '20px' }}>
						<RoundBlockOuterDiv>
							<RoundBlockInnerDiv>
								<Span color="#b5b9c2">Total</Span>
								<Span color="#41454e" marginLeft="10px" />
								{this.state.invoice.get('values').get('total')}
							</RoundBlockInnerDiv>
						</RoundBlockOuterDiv>
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

export default connect(mapStateToProps, { clearErrors, getVariables, createVariable, updateVariable })(
	ProductMovementOrderInvoice
);
export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
