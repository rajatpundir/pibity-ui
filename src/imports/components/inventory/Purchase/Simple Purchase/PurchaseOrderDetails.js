import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import Select from 'react-select';
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
	H3,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	Input,
	InputBody,
	InputLabel,
	LeftBlock,
	LeftItemH1,
	PageBar,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	PlusButton,
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
	ToolbarItems
} from '../../../../styles/inventory/Style';
import { customErrorMessage } from '../../../main/Notification';

class PurchaseOrderDetails extends React.Component {
	constructor(props) {
		super();
		this.state = {
			variable: props.variable,
			purchaseOrderItems: props.purchaseOrderItems,
			purchaseOrderServiceItems: props.purchaseOrderServiceItems,
			productSupplier: []
		};
		this.onChange = this.onChange.bind(this);
		this.addVariableToadditionalCostList = this.addVariableToadditionalCostList.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable,
			purchaseOrderItems: nextProps.purchaseOrderItems,
			purchaseOrderServiceItems: nextProps.purchaseOrderServiceItems,
			productSupplier:
				nextProps.variables !== undefined
					? nextProps.variables.ProductSupplier !== undefined ? nextProps.variables.ProductSupplier : []
					: []
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);	
		variable.set('values', values);
		this.setState({ variable: variable });
		this.props.updateOrder(variable);
	}

	onAdditionalCostChange(e, variableName) {
		const purchaseOrderServiceItems = this.state.purchaseOrderServiceItems.map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				switch (e.target.name) {
					case 'product':
						values.set(e.target.name, e.target.value);
						values.set('taxRule', e.target.data.values.purchaseTaxRule);
						break;
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
						if(e.target.value<=100){
							values.set(e.target.name, e.target.value);
							values.set(
								'total',
								listVariable.get('values').get('quantity') *
									listVariable.get('values').get('price') *
									((100 - e.target.value) / 100)
							);
						}
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
		this.setState({ purchaseOrderServiceItems });
		this.props.updatePurchaseOrderServiceItems(purchaseOrderServiceItems);
	}

	onProductOrderInputChange(e, variableName) {
		const purchaseOrderItems = this.state.purchaseOrderItems.map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				switch (e.target.name) {
					case 'product':
						values.set(e.target.name, e.target.value);
						const supplierProduct = this.state.productSupplier.filter(
							(item) =>
								item.values.supplier === this.props.supplier && item.values.product === e.target.value
						)[0];
						values.set('supplierSKU', supplierProduct.values.supplierSKU);
						values.set('price', supplierProduct.values.latestPrice);
						values.set(
							'total',
							listVariable.get('values').get('quantity') *
							supplierProduct.values.latestPrice *
								((100 - listVariable.get('values').get('discount')) / 100)
						);
						values.set('unit', e.target.data.values.unitOfMeasure);
						values.set('taxRule', e.target.data.values.purchaseTaxRule);
						break;
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
						if(e.target.value<=100){
							values.set(e.target.name, e.target.value);
							values.set(
								'total',
								listVariable.get('values').get('quantity') *
									listVariable.get('values').get('price') *
									((100 - e.target.value) / 100)
							);
						}
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
		this.setState({ purchaseOrderItems });
		this.props.updatePurchaseOrderItems(purchaseOrderItems);
	}

	addVariableToadditionalCostList() {
		const purchaseOrderServiceItems = cloneDeep(this.state.purchaseOrderServiceItems);
		purchaseOrderServiceItems.unshift(
			new Map([
				[ 'typeName', 'PurchaseOrderServiceItem' ],
				[
					'variableName',
					String(
						purchaseOrderServiceItems.length === 0
							? 0
							: Math.max(...purchaseOrderServiceItems.map((o) => o.get('variableName'))) + 1
					)
				],
				[
					'values',
					new Map([
						[ 'purchase', this.props.purchase ],
						[ 'purchaseOrder', '' ],
						[ 'description', '' ],
						[ 'discount', 0 ],
						[ 'price', 0 ],
						[ 'quantity', 0 ],
						[ 'reference', '' ],
						[ 'taxRule', '' ],
						[ 'total', 0 ]
					])
				]
			])
		);
		this.setState({ purchaseOrderServiceItems });
		this.props.updatePurchaseOrderServiceItems(purchaseOrderServiceItems);
	}

	addVariableToProductOrderInputList() {
		const purchaseOrderItems = cloneDeep(this.state.purchaseOrderItems);
		purchaseOrderItems.unshift(
			new Map([
				[ 'typeName', 'PurchaseOrderItem' ],
				[
					'variableName',
					String(
						purchaseOrderItems.length === 0
							? 0
							: Math.max(...purchaseOrderItems.map((o) => o.get('variableName'))) + 1
					)
				],
				[
					'values',
					new Map([
						[ 'purchase', '' ],
						[ 'purchaseOrder', '' ],
						[ 'comment', '' ],
						[ 'discount', 0 ],
						[ 'price', 0 ],
						[ 'quantity', 0 ],
						[ 'unit', '' ],
						[ 'taxRule', '' ],
						[ 'total', 0 ],
						[ 'supplierSKU', '' ],
						[ 'product', '' ]
					])
				]
			])
		);
		this.setState({ purchaseOrderItems });
		this.props.updatePurchaseOrderItems(purchaseOrderItems);
	}

	onRemoveProductOrderInputListKey(e, variableName) {
		const purchaseOrderItems = this.state.purchaseOrderItems.filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ purchaseOrderItems });
		this.props.updatePurchaseOrderItems(purchaseOrderItems);
	}

	onRemoveAdditionalCostListKey(e, variableName) {
		const purchaseOrderServiceItems = this.state.purchaseOrderServiceItems.filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ purchaseOrderServiceItems });
		this.props.updatePurchaseOrderServiceItems(purchaseOrderServiceItems);
	}

	renderAdditionalCostInputFields() {
		const rows = [];
		this.state.purchaseOrderServiceItems.forEach((listVariable) =>
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
										value: listVariable.get('values').get('description'),
										label: listVariable.get('values').get('description')
									}}
									onChange={(option) => {
										this.onAdditionalCostChange(
											{ target: { name: 'description', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter((product) => product.values.productType === 'Service')
												.filter((product) => {
													return !this.state.purchaseOrderServiceItems
														.map((item) => {
															return item.get('values').get('product');
														})
														.includes(product.variableName);
												})
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.values.productName,
														data: variable
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
								name="reference"
								type="text"
								value={listVariable.get('values').get('reference')}
								onChange={(e) => this.onAdditionalCostChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onAdditionalCostChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%">
						<TableHeaderInner>
							<Input
								name="price"
								type="text"
								value={listVariable.get('values').get('price')}
								onChange={(e) => this.onAdditionalCostChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%">
						<TableHeaderInner>
							<Input
								name="discount"
								type="text"
								value={listVariable.get('values').get('discount')}
								onChange={(e) => this.onAdditionalCostChange(e, listVariable.get('variableName'))}
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
										this.onAdditionalCostChange(
											{ target: { name: 'taxRule', value: option.value } },
											listVariable.get('variableName')
										);
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
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="total"
								type="number"
								value={listVariable.get('values').get('total')}
								onChange={(e) => this.onAdditionalCostChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	renderProductOrderInputFields() {
		const rows = [];
		const supplierProducts = this.state.productSupplier
			.filter((productSupplier) => productSupplier.values.supplier === this.props.supplier)
			.map((item) => item.values.product);
		this.state.purchaseOrderItems.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="6%" left="0px">
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveProductOrderInputListKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('product'),
										label: listVariable.get('values').get('product')
									}}
									onChange={(option) => {
										this.onProductOrderInputChange(
											{ target: { name: 'product', value: option.value, data: option.data } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter((product) => product.values.productType !== 'Service')
												.filter((variable) => supplierProducts.includes(variable.variableName))
												.filter((product) => {
													return !this.state.purchaseOrderItems
														.map((item) => {
															return item.get('values').get('product');
														})
														.includes(product.variableName);
												})
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.values.productName,
														data: variable
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
								name="comment"
								type="text"
								value={listVariable.get('values').get('comment')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="supplierSKU"
								type="text"
								value={listVariable.get('values').get('supplierSKU')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('unit'),
										label: listVariable.get('values').get('unit')
									}}
									onChange={(option) => {
										this.onProductOrderInputChange(
											{ target: { name: 'unit', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.UnitOfMeasure !== undefined ? (
											this.props.variables.UnitOfMeasure.map((variable) => {
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
					<TableData width="11%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="price"
								type="number"
								value={listVariable.get('values').get('price')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="discount"
								type="number"
								value={listVariable.get('values').get('discount')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
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
										this.onProductOrderInputChange(
											{ target: { name: 'taxRule', value: option.value } },
											listVariable.get('variableName')
										);
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
						</TableHeaderInner>
					</TableData>
					<TableData width="12%">
						<TableHeaderInner>
							<Input
								name="total"
								type="number"
								value={listVariable.get('values').get('total')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
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
			<PageBlock id="order">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Order</LeftItemH1>
					</ToolbarItems>
				</PageToolbar>
				<PageBar>
					<PageBarAlign>
						<PlusButton onClick={(e) => this.addVariableToProductOrderInputList()}>
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
													<TableHeaders width="6%">
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
															<SelectSpan>Product</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Comment</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Supplier SKU</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%">
														<SelectIconContainer>
															<SelectSpan>Unit</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%">
														<SelectIconContainer>
															<SelectSpan>Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Discount</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Tax Rule</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="12%">
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
										<TableBody>{this.renderProductOrderInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.purchaseOrderItems.length === 0 ? (
									<EmptyRow>You do not have any Purchase Order Lines.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton
									onClick={(e) =>
										this.props.supplier
											? this.addVariableToProductOrderInputList()
											: customErrorMessage('Please Select A Supplier First')}
								>
									<i className="large material-icons">add</i>Add more items
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
					<H3 style={{ paddingTop: '20px' }}>Additional Cost</H3>
					<PageBarAlign style={{ paddingBottom: '20px' }}>
						<PlusButton onClick={(e) => this.addAdditionalCostListVariable()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlign>
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
													<TableHeaders width="11%" left="8%">
														<SelectIconContainer>
															<SelectSpan>Service</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="22%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Reference</SelectSpan>
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
								{this.state.purchaseOrderServiceItems.length === 0 ? (
									<EmptyRow>You do not have any Additional Costs in your Purchase Order.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToadditionalCostList()}>
									<i className="large material-icons">add</i>Add more items
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
				</InputBody>

				<EqualBlockContainer>
					<LeftBlock>
						<TextAreaContainer>
							<TextArea
								name="purchaseOrderMemo"
								value={this.state.purchaseOrderMemo}
								placeholder="Write a note here..."
								onChange={this.onChange}
							/>
							<InputLabel>Purchase Order Memo </InputLabel>
						</TextAreaContainer>
					</LeftBlock>
					<RightBlock>
						<RightBlockTable>
							<BlockTableHead>
								<TableRow>
									<BlockTableHeader width="25%" />
									<BlockTableHeader width="25%">Order Lines</BlockTableHeader>
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
														{this.state.variable.get('values').get('productCostBeforeTax')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable.get('values').get('totalTaxOnProduct')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable.get('values').get('productCostBeforeTax') +
															this.state.variable.get('values').get('totalTaxOnProduct')}
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
														{this.state.variable
															.get('values')
															.get('additionalCostBeforeTax')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable
															.get('values')
															.get('totalTaxOnAdditionalCost')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable
															.get('values')
															.get('additionalCostBeforeTax') +
															this.state.variable
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
														{this.state.variable.get('values').get('productCostBeforeTax') +
															this.state.variable
																.get('values')
																.get('additionalCostBeforeTax')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable
															.get('values')
															.get('totalTaxOnAdditionalCost') +
															this.state.variable.get('values').get('totalTaxOnProduct')}
													</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														{this.state.variable.get('values').get('total')}
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

				{/* supplier deposit */}

				<InputBody style={{ border: 'none' }} overflow="visible">
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
													<TableHeaders width="15%" left="14%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Account</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="38%">
														<SelectIconContainer>
															<SelectSpan>Reference </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="59%">
														<SelectIconContainer>
															<SelectSpan>Date Paid </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="20%" left="77%">
														<SelectIconContainer>
															<SelectSpan>Amount </SelectSpan>
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
										<TableBody>
											<TableRow>
												<TableData width="58px" />
												<TableData width="168px" />
												<TableData width="168px" />
												<TableData width="168px" />
											</TableRow>
										</TableBody>
									</BodyTable>
								</HeaderBody>
								<EmptyRow>You do not have any supplier deposits</EmptyRow>
							</HeaderBodyContainer>
						</TableFieldContainer>
					</RoundedBlock>
					<RoundedBlock style={{ marginTop: '20px' }}>
						<RoundBlockOuterDiv>
							<RoundBlockInnerDiv>
								<Span color="#b5b9c2">Total Amount</Span>
								<Span color="#41454e" marginLeft="10px">
									{this.state.variable.get('values').get('total')}
								</Span>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseOrderDetails);
