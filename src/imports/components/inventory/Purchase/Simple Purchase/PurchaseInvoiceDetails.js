import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';
import Select from 'react-select';
import ReactToPrint from 'react-to-print';
import { clearErrors } from '../../../../redux/actions/errors';
import { successMessage } from '../../../main/Notification';
import {
	createVariable,
	createVariables,
	getVariables,
	updateVariable,
	objToMapRec,
	mapToObjectRec
} from '../../../../redux/actions/variables';
import { executeFuntion } from '../../../../redux/actions/executeFuntion';
import PrintTest from '../../../main/PrintTest'
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
	Custombutton
} from '../../../../styles/inventory/Style';

class PurchaseInvoiceDetails extends React.Component {
	constructor(props) {
		super();
		this.state = {
			createInvoice: true,
			updateInvoice: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'PurchaseInvoice' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'additionalCost', [] ],
						[ 'productInvoiceDetails', [] ],
						[ 'supplierDeposit', [] ],
						[ 'invoiceDate', '' ],
						[ 'dueDate', '' ],
						[ 'invoiceNumber', '' ],
						[ 'total', 0 ],
						[ 'purchaseOrderMemo', '' ],
						[ 'transactions', [] ],
						[ 'balanceDue', 0 ],
						[ 'purchaseOrder', '' ],
						[ 'supplier', '' ],
						[ 'account', '' ],
						[ 'paymentStatus', 'Due' ],
						[ 'productCostBeforeTax', 0 ],
						[ 'additionalCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ],
						[ 'totalTaxOnAdditionalCost', 0 ]
					])
				]
			]),
			purchaseStockItems: []
		};
		this.onChange = this.onChange.bind(this);
		this.addVariableToadditionalCostList = this.addVariableToadditionalCostList.bind(this);
		this.onCopyProductOrderFromOrder = this.onCopyProductOrderFromOrder.bind(this);
		this.onCalculateTotal = this.onCalculateTotal.bind(this);
		this.createStockItems = this.createStockItems.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('PurchaseInvoice');
		this.props.getVariables('ProductStore');
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variables.PurchaseInvoice) {
			const variable = nextProps.variables.PurchaseInvoice.filter(
				(variable) => variable.values.purchaseOrder === nextProps.purchaseOrder
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					updateInvoice: variable.values.transactions.length === 0 ? true : false,
					createInvoice: false,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap
				};
			}
			if (nextProps.purchaseOrder && variable === undefined) {
				const variable = prevState.variable;
				const values = variable.get('values');
				values.set('purchaseOrder', nextProps.purchaseOrder);
				values.set('supplier', nextProps.supplier);
				values.set('account', nextProps.account);
				variable.set('values', values);
				return {
					...prevState,
					variable: variable
				};
			}
		}
		return {
			...prevState
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	onCopyProductOrderFromOrder(DataToBeCopied) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		switch (DataToBeCopied) {
			case 'productInvoiceDetails':
				values.set('productInvoiceDetails', this.props.orderDetails.get('values').get('productInvoiceDetails'));
				break;
			case 'additionalCost':
				values.set('additionalCost', this.props.orderDetails.get('values').get('additionalCost'));
				break;
			case 'supplierDeposit':
				values.set('supplierDeposit', this.props.orderDetails.get('values').get('supplierDeposit'));
				break;
			default:
				break;
		}
		variable.set('values', values);
		this.setState({ variable: variable }, () => {
			this.onCalculateTotal();
		});
	}

	onAdditionalCostChange(e, variableName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('additionalCost').map((listVariable) => {
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
		values.set('additionalCost', list);
		variable.set('values', values);
		this.setState({ variable: variable }, () => {
			this.onCalculateTotal();
		});
	}

	onProductOrderInputChange(e, variableName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('productInvoiceDetails').map((listVariable) => {
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
		values.set('productInvoiceDetails', list);
		variable.set('values', values);
		this.setState({ variable: variable }, () => {
			this.onCalculateTotal();
		});
	}

	addVariableToadditionalCostList() {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('additionalCost');
		list.unshift(
			new Map([
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
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
		values.set('additionalCost', list);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	addVariableToProductOrderInputList() {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('productInvoiceDetails');
		list.unshift(
			new Map([
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
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
		values.set('productInvoiceDetails', list);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	onRemoveProductOrderInputListKey(e, variableName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('productInvoiceDetails').filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		values.set('productInvoiceDetails', list);
		variable.set('values', values);
		this.setState({ variable: variable }, () => {
			this.onCalculateTotal();
		});
	}

	onRemoveAdditionalCostListKey(e, variableName) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		const list = values.get('additionalCost').filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		values.set('additionalCost', list);
		variable.set('values', values);
		this.setState({ variable: variable }, () => {
			this.onCalculateTotal();
		});
	}

	onCalculateTotal() {
		var productCostBeforeTax = 0;
		var totalTaxOnProduct = 0;
		var additionalCostBeforeTax = 0;
		var totalTaxOnAdditionalCost = 0;
		const values = this.state.variable.get('values');
		// Product Cost
		values.get('productInvoiceDetails').forEach((listVariable) => {
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
		values.get('additionalCost').forEach((listVariable) => {
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
		const totalCost = productCostBeforeTax + totalTaxOnProduct + additionalCostBeforeTax + totalTaxOnAdditionalCost;
		const variable = cloneDeep(this.state.variable);
		const Variablevalues = variable.get('values');
		Variablevalues.set('balanceDue', totalCost);
		Variablevalues.set('total', totalCost);
		Variablevalues.set('productCostBeforeTax', productCostBeforeTax);
		Variablevalues.set('totalTaxOnProduct', totalTaxOnProduct);
		Variablevalues.set('additionalCostBeforeTax', additionalCostBeforeTax);
		Variablevalues.set('totalTaxOnAdditionalCost', totalTaxOnAdditionalCost);
		variable.set('values', Variablevalues);
		this.setState({
			variable
		});
	}

	renderAdditionalCostInputFields() {
		const rows = [];
		const values = this.state.variable.get('values');
		values.get('additionalCost').forEach((listVariable) =>
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
												.filter(
													(product) => product.values.general.values.productType === 'Service'
												)
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.values.general.values.productName
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
		const values = this.state.variable.get('values');
		values.get('productInvoiceDetails').forEach((listVariable) =>
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
					<TableData width="10%" left="7%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('product'),
										label: listVariable.get('values').get('product')
									}}
									onChange={(option) => {
										this.onProductOrderInputChange(
											{ target: { name: 'product', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter(
													(product) => product.values.general.values.productType !== 'Service'
												)
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.values.general.values.productName
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
					<TableData width="10%" left="17%">
						<TableHeaderInner>
							<Input
								name="comment"
								type="text"
								value={listVariable.get('values').get('comment')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="30%">
						<TableHeaderInner>
							<Input
								name="supplierSKU"
								type="text"
								value={listVariable.get('values').get('supplierSKU')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="39%">
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
					<TableData width="11%" left="46%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="55%">
						<TableHeaderInner>
							<Input
								name="price"
								type="number"
								value={listVariable.get('values').get('price')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="64%">
						<TableHeaderInner>
							<Input
								name="discount"
								min="0"
								max="100"
								type="number"
								value={listVariable.get('values').get('discount')}
								onChange={(e) => this.onProductOrderInputChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="75%">
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
					<TableData width="12%" left="87%">
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

	createStore(invoice) {
		const productStores = [];
		invoice.values.productInvoiceDetails.forEach((data) => {
			const store =
				this.props.variables.ProductStore !== undefined
					? this.props.variables.ProductStore.filter(
							(store) =>
								store.values.location === this.props.location &&
								store.values.product === data.values.product
						)[0]
					: undefined;
			if (store === undefined) {
				productStores.push(
					new Map([
						[ 'typeName', 'ProductStore' ],
						[ 'variableName', '' ],
						[
							'values',
							new Map([
								[ 'status', 'Active' ],
								[ 'location', this.props.location ],
								[ 'product', data.values.product ],
								[ 'onHand', 0 ],
								[ 'onOrder', 0 ],
								[ 'available', 0 ],
								[ 'allocated', 0 ]
							])
						]
					])
				);
			}
		});
		return productStores;
	}

	createStockItems(invoice, purchaseStockRecord) {
		const purchaseStockItems = [];
		invoice.values.productInvoiceDetails.forEach((data) => {
			const productStore =
				this.props.variables.ProductStore !== undefined
					? this.props.variables.ProductStore.filter(
							(store) =>
								store.values.location === this.props.location &&
								store.values.product === data.values.product
						)[0]
					: undefined;

			purchaseStockItems.push(
				new Map([
					[ 'variableName', '' ],
					[ 'typeName', 'PurchaseOrderStockItemRecord' ],
					[
						'values',
						new Map([
							[ 'date', 1610606634582 ],
							[ 'purchaseOrder', invoice.values.purchaseOrder ],
							[ 'purchaseStockRecord', purchaseStockRecord.variableName ],
							[ 'status', purchaseStockRecord.values.status ],
							[ 'movementType', purchaseStockRecord.values.movementType ],
							[ 'location', purchaseStockRecord.values.toLocation ],
							[ 'fromSupplier', invoice.values.supplier ],
							[ 'toProductStore', productStore.variableName ],
							[ 'product', data.values.product ],
							[ 'price', data.values.price ],
							[ 'quantity', data.values.quantity ],
							[ 'total', data.values.total ]
						])
					]
				])
			);
		});
		return purchaseStockItems;
	}

	render() {
		return (
			<PageBlock id="invoice">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Invoice</LeftItemH1>
					</ToolbarItems>
					<ToolbarItems>
						{this.state.createInvoice ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.createVariable(this.state.variable).then((response) => {
										if (response.status === 200) {
											const invoice = response.data;
											const args = {
												fromSupplier: response.data.values.supplier,
												total: response.data.values.total,
												productCostBeforeTax: response.data.values.productCostBeforeTax,
												additionalCostBeforeTax: response.data.values.additionalCostBeforeTax,
												totalTaxOnProduct: response.data.values.totalTaxOnProduct,
												totalTaxOnAdditionalCost: response.data.values.totalTaxOnAdditionalCost,
												purchaseOrder: response.data.values.purchaseOrder,
												toLocation: this.props.location
											};
											this.props
												.executeFuntion(args, 'createPurchaseOrderStockReceivedRecord')
												.then((response) => {
													if (response.status === 200) {
														new Promise((resolve) => {
															resolve(
																this.props.createVariables(this.createStore(invoice))
															);
														}).then(() => {
															this.props.getVariables('ProductStore').then(() => {
																this.props
																	.createVariables(
																		this.createStockItems(
																			invoice,
																			response.data.purchaseStockRecord
																		)
																	)
																	.then((response) => {
																		if (response.status === 200) {
																			this.props.getVariables(
																				'PurchaseOrderStockItemRecord'
																			);
																			this.props.getVariables(
																				'PurchaseOrderStockReceivedRecord'
																			);
																			successMessage(' Purchase Invoice Created');
																		}
																	});
															});
														});
													}
												});
										}
									});
								}}
							>
								Create Invoice
							</Custombutton>
						) : this.state.updateInvoice ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props
										.updateVariable(this.state.prevVariable, this.state.variable)
										.then((status) => {
											if (status === 200) {
												successMessage(` Purchase Invoice Updated Succesfully`);
											}
										});
								}}
							>
								Update Invoice
							</Custombutton>
						) : (
							<div>
								<ReactToPrint
									trigger={() => {
										// NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
										// to the root node of the returned component as it will be overwritten.
										return (
											<Custombutton
												padding="0 10px"
												minWidth="70px"
												height="2.5rem"
												color="#3b3b3b"
												backgroundColor="#F7FAFD"
												borderColor="#b9bdce"
												borderOnHover="#3b3b3b"
												backgroundOnHover="#F7FAFD"
												margin="0 5px"
											>
												<FontAwsomeIcon className="fa fa-print" />
												Print
											</Custombutton>
										);
									}}
									content={() => this.componentRef}
								/>
								<div style={{ display: 'none' }}>
									<PrintTest ref={(el) => (this.componentRef = el)} invoice={mapToObjectRec(this.state.variable)}></PrintTest>
								</div>
							</div>
						)}
					</ToolbarItems>
				</PageToolbar>
				<PageBar>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="invoiceNumber"
								type="text"
								placeholder="write"
								value={this.state.variable.get('values').get('invoiceNumber')}
								onChange={this.onChange}
							/>
							<InputLabel>
								Invoice Number
								<Required>*</Required>
							</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="invoiceDate"
								type="date"
								value={this.state.variable.get('values').get('invoiceDate')}
								onChange={this.onChange}
							/>
							<InputLabel>Invoice Date</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="dueDate"
								type="date"
								value={this.state.variable.get('values').get('dueDate')}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>
								Due Date
								<Required>*</Required>
							</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="total"
								type="number"
								placeholder="Default"
								value={this.state.variable.get('values').get('total')}
								readOnly
							/>
							<InputLabel>Total</InputLabel>
						</FormControl>
					</InputColumnWrapper>
				</PageBar>
				<PageBar>
					<PageBarAlign>
						<PlusButton onClick={(e) => this.addVariableToProductOrderInputList()}>
							<i className="large material-icons">add</i>
						</PlusButton>
						<Custombutton
							padding="0 10px"
							minWidth="70px"
							height="32px"
							color="#3b3b3b"
							backgroundColor="#F7FAFD"
							borderColor="#b9bdce"
							borderOnHover="#3b3b3b"
							backgroundOnHover="#F7FAFD"
							margin="0 5px"
							onClick={(e) => this.onCopyProductOrderFromOrder('productInvoiceDetails')}
						>
							<FontAwsomeIcon className="fa fa-clone" />
							Copy From Order
						</Custombutton>
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
															<SelectSpan>Product</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="17%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Comment</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="30%">
														<SelectIconContainer>
															<SelectSpan>Supplier SKU</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="8%" left="39%">
														<SelectIconContainer>
															<SelectSpan>Unit</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="46%">
														<SelectIconContainer>
															<SelectSpan>Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="55%">
														<SelectIconContainer>
															<SelectSpan>Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="64%">
														<SelectIconContainer>
															<SelectSpan>Discount</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="75%">
														<SelectIconContainer>
															<SelectSpan>Tax Rule</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="12%" left="87%">
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
								{this.state.variable.get('values').get('productInvoiceDetails').length === 0 ? (
									<EmptyRow>You do not have any Purchase Order Lines.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToProductOrderInputList()}>
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
						<Custombutton
							padding="0 10px"
							minWidth="70px"
							height="32px"
							color="#3b3b3b"
							backgroundColor="#F7FAFD"
							borderColor="#b9bdce"
							borderOnHover="#3b3b3b"
							backgroundOnHover="#F7FAFD"
							margin="0 5px"
							onClick={(e) => this.onCopyProductOrderFromOrder('additionalCost')}
						>
							<FontAwsomeIcon className="fa fa-clone" />
							Copy From Order
						</Custombutton>
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
															<SelectSpan>Desciption</SelectSpan>
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
								{this.state.variable.get('values').get('additionalCost').length === 0 ? (
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
									<BlockTableHeader width="25%">Invoice Lines</BlockTableHeader>
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
								<Span color="#b5b9c2">Balance Due</Span>
								<Span color="#41454e" marginLeft="10px">
									{this.state.variable.get('values').get('balanceDue')}
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

export default connect(mapStateToProps, {
	clearErrors,
	createVariables,
	executeFuntion,
	getVariables,
	createVariable,
	updateVariable
})(PurchaseInvoiceDetails);
export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
