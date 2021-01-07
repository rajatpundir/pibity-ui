import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { cloneDeep } from 'lodash';
import { createVariable, getVariables } from '../../../../../redux/actions/variables';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import { successMessage, customErrorMessage } from '../../../../main/Notification';
import {
	InputLabel,
	Input,
	Required,
	FormControl,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalSubmitButton,
	ModalCloseButton,
	ModalInputColumnWrapper
} from '../../../../../styles/main/Modal';

import {
	AddMoreBlock,
	AddMoreButton,
	BlockInnerTable,
	BlockTableBody,
	BlockTableHead,
	BlockTableHeader,
	BlockTableTd,
	BodyTable,
	EqualBlockContainer,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	InputBody,
	LeftBlock,
	RightBlock,
	RightBlockTable,
	RoundBlockInnerDiv,
	RoundBlockOuterDiv,
	RoundedBlock,
	Span,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	EmptyRow,
	TextArea,
	TextAreaContainer,
	SelectWrapper
} from '../../../../../styles/inventory/Style';
const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};
const ModalCustomStyles = {
	overlay: {
		zIndex: 8000,
		display: 'block',
		overflowX: 'hidden',
		overflowY: 'auto',
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100% ',
		outline: 0,
		margin: '0 !important',
		backgroundColor: '#12121275 '
	},
	content: {
		position: 'relative',
		padding: 0,
		maxWidth: '65%',
		minWidth: '520px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		backgroundColor: '#fff',
		margin: '1.75rem auto',
		backgroundClip: 'padding-box',
		border: '1px solid rgba(0,0,0,0.2)',
		borderRadius: '10px',
		boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.2)',
		outline: 0
	}
};

class CreateProductMovementModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			invoice: new Map([
				[ 'typeName', 'ProductMovementOrderInvoice' ],
				[ 'variableName', props.productMovementOrder.variableName ],
				[
					'values',
					new Map([
						[ 'product', props.product.variableName ],
						[ 'movementType', props.productMovementOrder.values.movementType ],
						[ 'productMovementOrder', props.productMovementOrder.variableName ],
						[ 'fromProductStore', props.productMovementOrder.values.fromProductStore ],
						[ 'toProductStore', props.productMovementOrder.values.toProductStore ],
						[ 'toLocation', props.productMovementOrder.values.toLocation ],
						[ 'fromLocation', props.productMovementOrder.values.fromLocation ],
						[ 'availableQuantity', props.fromProductStore.values.available ],
						[ 'requestedQuantity', props.productMovementOrder.values.requestedQuantity ],
						[ 'quantity', props.productMovementOrder.values.requestedQuantity ],
						[ 'invoiceDate', '' ],
						[ 'invoiceNumber', '' ],
						[ 'date', '' ],
						[ 'status', 'Waiting For Dispatch' ],
						[ 'total', 0 ],
						[ 'balanceDue', 0 ],
						[ 'paymentStatus', 'Due' ],
						[ 'totalCostBeforeTax', 0 ],
						[ 'totalTax', 0 ],
						[ 'productPrice', 0 ],
						[ 'additionalCost', [] ]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCreateInvoice = this.onCreateInvoice.bind(this);
	}

	onChange(e) {
		const invoice = cloneDeep(this.state.invoice);
		const values = invoice.get('values');
		values.set(e.target.name, e.target.value);
		if (e.target.name === 'invoiceDate') {
			values.set('date', e.target.value);
		}
		invoice.set('values', values);
		this.setState({ invoice: invoice });
	}

	onClose() {
		this.props.onClose();
	}

	onCreateInvoice() {
		this.props.createVariable(this.state.invoice).then((response) => {
			if (response.status === 200) {
				const movementRecord = new Map([
					[ 'typeName', 'ProductMovementRecord' ],
					[ 'variableName', '' ],
					[
						'values',
						new Map([
							[ 'product', this.props.product.variableName ],
							[ 'movementType', this.props.productMovementOrder.values.movementType ],
							[ 'productMovementOrder', this.props.productMovementOrder.variableName ],
							[ 'fromProductStore', this.props.productMovementOrder.values.fromProductStore ],
							[ 'toProductStore', this.props.productMovementOrder.values.toProductStore ],
							[ 'toLocation', this.props.productMovementOrder.values.toLocation ],
							[ 'fromLocation', this.props.productMovementOrder.values.fromLocation ],
							[ 'requestedQuantity', this.props.productMovementOrder.values.requestedQuantity ],
							[ 'quantity', this.props.productMovementOrder.values.requestedQuantity ],
							[ 'status', 'Waiting For Dispatch' ],
							[ 'date', 1609925432248 ],
							[ 'total', response.data.values.total ],
							[ 'totalProductCost', response.data.values.total ],
							[ 'referenceInvoice', response.data.variableName ]
						])
					]
				]);
				this.props.createVariable(movementRecord).then((response) => {
					if (response.status === 200) {
						const args = {
							productMovementOrder: this.props.productMovementOrder.variableName
						};
						this.props.executeFuntion(args, 'acceptProductMovementOrder').then((response) => {
							if (response.status === 200) {
								this.props.getVariables('ProductMovementOrder');
								this.props.getVariables('ProductMovementOrderInvoice');
								successMessage('Invoice Created Succesfully');
							}
						});
					}
				});
			}
		});
		this.onClose();
	}

	onAdditionalCostChange(e, variableName) {
		const invoice = cloneDeep(this.state.invoice);
		const values = invoice.get('values');
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
		invoice.set('values', values);
		this.setState({ invoice: invoice }, () => {
			this.onCalculateTotal();
		});
	}

	addVariableToadditionalCostList() {
		const invoice = cloneDeep(this.state.invoice);
		const values = invoice.get('values');
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
		invoice.set('values', values);
		this.setState({ invoice: invoice });
	}

	onRemoveAdditionalCostListKey(e, variableName) {
		const invoice = cloneDeep(this.state.invoice);
		const values = invoice.get('values');
		const list = values.get('additionalCost').filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		values.set('additionalCost', list);
		invoice.set('values', values);
		this.setState({ invoice: invoice }, () => {
			this.onCalculateTotal();
		});
	}

	onCalculateTotal() {
		var totalCostBeforeTax = 0;
		var totalTax = 0;
		const values = this.state.invoice.get('values');
		values.get('additionalCost').forEach((listVariable) => {
			const taxRule = this.props.variables.TaxRule.filter(
				(taxRule) => taxRule.variableName === listVariable.get('values').get('taxRule')
			)[0];
			if (taxRule) {
				switch (taxRule.values.taxType) {
					case 'Exclusive':
						totalTax =
							totalTax + listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalCostBeforeTax = totalCostBeforeTax + listVariable.get('values').get('total');
						break;
					case 'Inclusive':
						const tax = listVariable.get('values').get('total') * (taxRule.values.taxPercentage / 100);
						totalTax = totalTax + tax;
						totalCostBeforeTax = totalCostBeforeTax + listVariable.get('values').get('total') - tax;
						break;
					default:
						break;
				}
			} else {
				totalCostBeforeTax = totalCostBeforeTax + listVariable.get('values').get('total');
			}
		});
		const totalCost = totalCostBeforeTax + totalTax;
		const invoice = cloneDeep(this.state.invoice);
		const Variablevalues = invoice.get('values');
		Variablevalues.set('balanceDue', totalCost);
		Variablevalues.set('total', totalCost);
		Variablevalues.set('totalCostBeforeTax', totalCostBeforeTax);
		Variablevalues.set('totalTax', totalTax);
		invoice.set('values', Variablevalues);
		this.setState({
			invoice
		});
	}

	renderAdditionalCostInputFields() {
		const rows = [];
		const values = this.state.invoice.get('values');
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
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create Product Movement invoice"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Create Product Movement Invoice</ModalTitle>
					<ModalHeaderCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						<span>X</span>
					</ModalHeaderCloseButton>
				</ModalHeader>
				<ModalBody>
					<InputBody borderTop="0" overflow="visible">
						<FormControl flexBasis={style.flexBasis}>
							<Input
								style={{
									height: ' 38px'
								}}
								name="invoiceDate"
								type="date"
								value={this.state.invoice.get('values').get('invoiceDate')}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>
								Date
								<Required>*</Required>
							</InputLabel>
						</FormControl>
						<FormControl flexBasis={style.flexBasis}>
							<Input
								name="invoiceNumber"
								type="text"
								value={this.state.invoice.get('values').get('invoicenUmber')}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>
								Invoice Number
								<Required>*</Required>
							</InputLabel>
						</FormControl>
						<FormControl flexBasis={style.flexBasis}>
							<Input
								name="availableQuantity"
								type="number"
								value={this.state.invoice.get('values').get('availableQuantity')}
								backgroundColor="hsl(0,0%,95%)"
								borderColor="hsl(0,0%,95%)"
								readOnly
							/>
							<InputLabel>Available Quantity</InputLabel>
						</FormControl>
						<FormControl flexBasis={style.flexBasis}>
							<Input
								name="requestedQuantity"
								type="number"
								value={this.state.invoice.get('values').get('requestedQuantity')}
								backgroundColor="hsl(0,0%,95%)"
								borderColor="hsl(0,0%,95%)"
								readOnly
							/>
							<InputLabel>Requested Quantity</InputLabel>
						</FormControl>
						<FormControl flexBasis={style.flexBasis}>
							<Input
								name="product"
								type="text"
								value={this.props.product.variableName}
								backgroundColor="hsl(0,0%,95%)"
								borderColor="hsl(0,0%,95%)"
								readOnly
							/>{' '}
							<InputLabel>Product SKU</InputLabel>
						</FormControl>
						<FormControl flexBasis={style.flexBasis}>
							<Input
								name="product"
								type="text"
								value={this.props.product.values.general.values.productName}
								backgroundColor="hsl(0,0%,95%)"
								borderColor="hsl(0,0%,95%)"
								readOnly
							/>{' '}
							<InputLabel>Product</InputLabel>
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
						<ModalInputColumnWrapper>
							<FormControl flexBasis={style.flexBasis} paddingRight="10px">
								<Input
									name="quantity"
									type="number"
									value={this.state.invoice.get('values').get('quantity')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Quantity</InputLabel>
							</FormControl>
							<FormControl flexBasis={style.flexBasis} paddingRight="10px">
								<Input
									name="productPrice"
									type="number"
									value={this.state.invoice.get('values').get('productPrice')}
									onChange={this.onChange}
								/>{' '}
								<InputLabel>Price</InputLabel>
							</FormControl>
							<FormControl flexBasis={style.flexBasis}>
								<Input
									name="total"
									type="number"
									value={
										this.state.invoice.get('values').get('quantity') *
										this.state.invoice.get('values').get('productPrice')
									}
									readOnly
								/>{' '}
								<InputLabel>Total Product Price</InputLabel>
							</FormControl>
						</ModalInputColumnWrapper>
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
																<SelectSpan>Services</SelectSpan>
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
									{this.state.invoice.get('values').get('additionalCost').length === 0 ? (
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
					</InputBody>

					<EqualBlockContainer>
						<LeftBlock>
							<TextAreaContainer>
								<TextArea
									name="comments"
									value=""
									placeholder="Write a note here..."
									onChange={this.onChange}
								/>
								<InputLabel>Note</InputLabel>
							</TextAreaContainer>
						</LeftBlock>
						<RightBlock>
							<RightBlockTable>
								<BlockTableHead>
									<TableRow>
										<BlockTableHeader width="20%" />
										<BlockTableHeader width="10%">Total</BlockTableHeader>
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
															{this.state.invoice.get('values').get('totalCostBeforeTax')}
														</BlockTableTd>
													</TableRow>
													<TableRow>
														<BlockTableTd>
															{this.state.invoice.get('values').get('totalTax')}
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
					<InputBody style={{ border: 'none' }} overflow="visible">
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
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.onCreateInvoice();
						}}
					>
						Save
					</ModalSubmitButton>
					<ModalCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						Cancel
					</ModalCloseButton>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, { createVariable, getVariables,executeFuntion })(CreateProductMovementModal);
