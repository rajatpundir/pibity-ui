import React from 'react';
import styled from 'styled-components';
import { getTypeDetails } from '../../../redux/actions/product';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
class PurchaseOrderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			purchaseOrderMemo: '',
			dueDate: '',
			invoiceDate: '',
			invoiceNumber: '',
			total: '',
			additionalCost: [],
			productInvoiceDetails: [],
			supplierDeposit: [],
			additionalCostkeys: new Map(),
			additionalCostkey: new Map([
				[ 'description', '' ],
				[ 'discount', '' ],
				[ 'price', '' ],
				[ 'quantity', '' ],
				[ 'reference', '' ],
				[ 'taxRule', '' ],
				[ 'total', '' ]
			]),
			productOrderkeys: new Map(),
			productOrderkey: new Map([
				[ 'comment', '' ],
				[ 'discount', '' ],
				[ 'price', '' ],
				[ 'quantity', '' ],
				[ 'unit', '' ],
				[ 'taxRule', '' ],
				[ 'total', '' ],
				[ 'supplierSKU', '' ],
				[ 'product', '' ]
			]),
			supplierDepositkeys: new Map(),
			supplierDepositkey: new Map([
				[ 'ammount', '' ],
				[ 'account', '' ],
				[ 'datePaid', '' ],
				[ 'reference', '' ]
			]),
			type: '',
			additonalCostKeyCounter: 0,
			productOrderDetailCounter: 0,
			supplierDepositCounter: 0
		};
		this.onChange = this.onChange.bind(this);
		this.saveInfo = this.saveInfo.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	mapToObjectRec = (m) => {
		let lo = {};
		for (let [ k, v ] of m) {
			if (v instanceof Map) {
				lo[k] = this.mapToObjectRec(v);
			} else {
				lo[k] = v;
			}
		}
		return lo;
	};

	saveInfo() {
		console.log(this.mapToObjectRec(this.state.additionalCostkeys));
		new Promise((resolve) => {
			resolve(
				this.setState(
					{
						additionalCost: [],
						productInvoiceDetails: []
					},
					() => {
						var tempCostArray = [];
						Object.entries(this.mapToObjectRec(this.state.additionalCostkeys)).forEach((item) => {
							console.log(item);
							var variable = {
								variableName: item[1].description,
								values: item[1]
							};
							tempCostArray.push(variable);
							this.setState({ additionalCost: [ ...this.state.additionalCost, ...tempCostArray ] });
						});
						var tempProductArray = [];
						Object.entries(this.mapToObjectRec(this.state.productOrderkeys)).forEach((item) => {
							var variable = {
								variableName: item[1].product,
								values: item[1]
							};
							tempProductArray.push(variable);
						});
						this.setState({
							productInvoiceDetails: [ ...this.state.productInvoiceDetails, ...tempProductArray ]
						});
					}
				)
			);
		}).then(() => {
			this.props.sendData({
				variableName: 'InvoiceDetails',
				value: {
					dueDate: this.state.dueDate,
					invoiceDate: this.state.invoiceDate,
					invoiceNumber: this.state.invoiceNumber,
					total: this.state.total,
					additionalCost: this.state.additionalCost,
					productInvoiceDetails: this.state.productInvoiceDetails,
					purchaseOrderMemo: this.state.purchaseOrderMemo,
					supplierDeposit: this.state.supplierDeposit
				}
			});
		});
	}

	addAdditionalCostListVariable() {
		const addkey = cloneDeep(this.state.additionalCostkeys);
		addkey.set(this.state.additonalCostKeyCounter, this.state.additionalCostkey);
		this.setState({
			additionalCostkeys: addkey
		});
		this.setState((prevState) => {
			return { additonalCostKeyCounter: prevState.additonalCostKeyCounter + 1 };
		});
	}

	renderAdditionalCostInputFields() {
		const rows = [];
		if (this.state.additionalCostkeys.size === 0) {
			return (
				<TableRow>
					<TableHeader width="58px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="167px" />
					<TableHeader width="167px" />
					<TableHeader width="58px" />
				</TableRow>
			);
		} else {
			for (let key of this.state.additionalCostkeys) {
				rows.push(
					<TableRow key={key[0]}>
						<TableHeader width="6%" left="0px">
							{' '}
						</TableHeader>
						<TableHeader width="11%" left="8%">
							<Input
								name="description"
								type="text"
								placeholder="description"
								value={key[1].get('description')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('description', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="22%">
							<Input
								name="reference"
								type="text"
								placeholder="reference"
								value={key[1].get('reference')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('reference', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="35%">
							<Input
								name="quantity"
								type="number"
								placeholder="quantity"
								value={key[1].get('quantity')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('quantity', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="50%">
							<Input
								name="price"
								type="text"
								placeholder="price"
								value={key[1].get('price')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('price', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="60%">
							<Input
								name="discount"
								type="text"
								placeholder="discount"
								value={key[1].get('discount')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('discount', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="73%">
							<Input
								name="taxRule"
								type="text"
								placeholder="default"
								value={key[1].get('taxRule')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('taxRule', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="85%">
							<Input
								name="total"
								type="decimal"
								placeholder="total"
								value={key[1].get('total')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.additionalCostkeys);
									keys.get(key[0]).set('total', e.target.value);
									this.setState({ additionalCostkeys: keys });
								}}
							/>
						</TableHeader>
					</TableRow>
				);
			}
			return rows;
		}
	}

	productOrderDetailsListVariable() {
		const addkey = cloneDeep(this.state.productOrderkeys);
		addkey.set(this.state.productOrderDetailCounter, this.state.productOrderkey);
		this.setState({
			productOrderkeys: addkey
		});
		this.setState((prevState) => {
			return { productOrderDetailCounter: prevState.productOrderDetailCounter + 1 };
		});
	}

	renderProductOrderInputFields() {
		const rows = [];
		if (this.state.productOrderkeys.size === 0) {
			return (
				<TableRow>
					<TableHeader width="58px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="167px" />
					<TableHeader width="167px" />
					<TableHeader width="58px" />
				</TableRow>
			);
		} else {
			for (let key of this.state.productOrderkeys) {
				rows.push(
					<TableRow key={key[0]}>
						<TableHeader width="6%" left="0px">
							{' '}
						</TableHeader>
						<TableHeader width="11%" left="8%">
							<Input
								name="product"
								type="text"
								placeholder="product default"
								value={key[1].get('product')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('product', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="22%">
							<Input
								name="comment"
								type="text"
								placeholder="commment"
								value={key[1].get('comment')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('comment', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="35%">
							<Input
								name="supplierSKU"
								type="text"
								placeholder="supplierSKU default"
								value={key[1].get('supplierSKU')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('supplierSKU', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="50%">
							<Input
								name="price"
								type="text"
								placeholder="price"
								value={key[1].get('price')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('price', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="11%" left="60%">
							<Input
								name="Unit"
								type="number"
								placeholder="unit"
								value={key[1].get('unit')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('unit', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="73%">
							<Input
								name="quantity"
								type="number"
								placeholder="quantity"
								value={key[1].get('quantity')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('quantity', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="85%">
							<Input
								name="discount"
								type="decimal"
								placeholder="price"
								value={key[1].get('discount')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('discount', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="85%">
							<Input
								name="taxRule"
								type="text"
								placeholder="default"
								value={key[1].get('taxRule')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('taxRule', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="85%">
							<Input
								name="total"
								type="decimal"
								placeholder="total"
								value={key[1].get('total')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.productOrderkeys);
									keys.get(key[0]).set('total', e.target.value);
									this.setState({ productOrderkeys: keys });
								}}
							/>
						</TableHeader>
					</TableRow>
				);
			}
			return rows;
		}
	}
	render() {
		return (
			<PageBlock id="invoice" >
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Invoice</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<PageBar>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="invoiceNumber"
								type="text"
								placeholder="write"
								value={this.state.invoiceNumber}
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
								type="text"
								placeholder="date"
								value={this.state.invoiceDate}
								onChange={this.onChange}
							/>
							<InputLabel>Invoice Date</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="dueDate"
								type="text"
								placeholder="date"
								value={this.state.dueDate}
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
								value={this.state.total}
								onChange={this.onChange}
							/>
							<InputLabel>Total</InputLabel>
						</FormControl>
					</InputColumnWrapper>
				</PageBar>

				<PageBar>
					<PageBarAlignLeft>
						<PlusButton onClick={(e) => this.productOrderDetailsListVariable()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlignLeft>
				</PageBar>
				<InputBody borderTop="0">
					<RoundedBlock>
						<TableFieldContainer>
							<Headers>
								<HeaderContainer>
									<HeaderContainerInner>
										<ColumnName width="6%" left="0px">
											<SelectIconContainer>
												<SelectSpan>
													<SelectSpanInner>
														<i className="large material-icons">create</i>
													</SelectSpanInner>
												</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="7%">
											<SelectIconContainer>
												<SelectSpan>Product</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="17%">
											<SelectIconContainer>
												<SelectSpan textAlign="right">Comment</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="30%">
											<SelectIconContainer>
												<SelectSpan>Supplier SKU</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="39%">
											<SelectIconContainer>
												<SelectSpan>Unit</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="11%" left="46%">
											<SelectIconContainer>
												<SelectSpan>Quantity</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="55%">
											<SelectIconContainer>
												<SelectSpan>Price</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="64%">
											<SelectIconContainer>
												<SelectSpan>Discount</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="75%">
											<SelectIconContainer>
												<SelectSpan>Tax Rule</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="12%" left="87%">
											<SelectIconContainer>
												<SelectSpan>Total</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
									</HeaderContainerInner>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>{this.renderProductOrderInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.productOrderkeys.size === 0 ? (
									<EmptyRow>You do not have any Purchase Order Lines.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.productOrderDetailsListVariable()}>
									<i className="large material-icons">add</i>Add more items
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>

					<H3 style={{ paddingTop: '20px' }}>Additional Cost</H3>
					<PageBarAlignLeft style={{ paddingBottom: '20px' }}>
						<PlusButton onClick={(e) => this.addAdditionalCostListVariable()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlignLeft>
					<RoundedBlock>
						<TableFieldContainer>
							<Headers>
								<HeaderContainer>
									<HeaderContainerInner>
										<ColumnName width="6%" left="0px">
											<SelectIconContainer>
												<SelectSpan>
													<SelectSpanInner>
														<i className="large material-icons">create</i>
													</SelectSpanInner>
												</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="11%" left="8%">
											<SelectIconContainer>
												<SelectSpan>Desciption</SelectSpan>
											</SelectIconContainer>
										</ColumnName>

										<ColumnName width="11%" left="22%">
											<SelectIconContainer>
												<SelectSpan textAlign="right">Reference</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="11%" left="35%">
											<SelectIconContainer>
												<SelectSpan>Quantity</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="50%">
											<SelectIconContainer>
												<SelectSpan>Price</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="11%" left="60%">
											<SelectIconContainer>
												<SelectSpan>Discount</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="73%">
											<SelectIconContainer>
												<SelectSpan>Tax Rule</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="85%">
											<SelectIconContainer>
												<SelectSpan>Total</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
									</HeaderContainerInner>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>{this.renderAdditionalCostInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.additionalCostkeys.size === 0 ? (
									<EmptyRow>You do not have any Additional Costs in your Purchase Order.</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addAdditionalCostListVariable()}>
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
									<BlockTableHeader>Order Lines</BlockTableHeader>
									<BlockTableHeader width="150px">Additional Cost</BlockTableHeader>
									<BlockTableHeader width="120px">Total</BlockTableHeader>
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
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														<Span color="#41454e">TAX</Span>
													</BlockTableTd>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>
														<Span color="#41454e">TOTAL </Span>
													</BlockTableTd>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
											</TableBody>
										</BlockInnerTable>
									</BlockTableTd>
									<BlockTableTd style={{ border: 'none' }}>
										<BlockInnerTable>
											<TableBody>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
											</TableBody>
										</BlockInnerTable>
									</BlockTableTd>
									<BlockTableTd style={{ border: 'none' }}>
										<BlockInnerTable>
											<TableBody>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
												<TableRow>
													<BlockTableTd>0.00</BlockTableTd>
												</TableRow>
											</TableBody>
										</BlockInnerTable>
									</BlockTableTd>
								</TableRow>
							</BlockTableBody>
						</RightBlockTable>
					</RightBlock>
				</EqualBlockContainer>
				<InputBody style={{ border: 'none' }}>
					<RoundedBlock>
						<TableFieldContainer>
							<Headers>
								<HeaderContainer>
									<HeaderContainerInner>
										<ColumnName width="5%" left="0px">
											<SelectIconContainer>
												<SelectSpan>
													<SelectSpanInner>
														<i className="large material-icons">create</i>
													</SelectSpanInner>
												</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="15%" left="14%">
											<SelectIconContainer>
												<SelectSpan textAlign="right">Account</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="15%" left="38%">
											<SelectIconContainer>
												<SelectSpan>Reference </SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="15%" left="59%">
											<SelectIconContainer>
												<SelectSpan>Date Paid </SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="20%" left="77%">
											<SelectIconContainer>
												<SelectSpan>Amount </SelectSpan>
											</SelectIconContainer>
										</ColumnName>
									</HeaderContainerInner>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>
											<TableRow>
												<TableHeader width="58px" />
												<TableHeader width="168px" />
												<TableHeader width="168px" />
												<TableHeader width="168px" />
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
									0.00{' '}
								</Span>
							</RoundBlockInnerDiv>
						</RoundBlockOuterDiv>
					</RoundedBlock>
				</InputBody>
				<button onClick={(e) => this.saveInfo()}>save</button>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	type: state.type
});

export default connect(mapStateToProps, {
	getTypeDetails
})(PurchaseOrderDetails);

const InputColumnWrapper = styled.div`
	flex-basis: calc(100% / 3 - 12px) !important;
    width: 30%;
    @media (max-width: 991px) {
    flex-basis: 100% !important;
    justify-content: space-between;
    display: flex;
    flex-flow: wrap;
    }
}
`;
const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;
const FormControl = styled.div.attrs((props) => ({
	minHeight: props.minHeight || '60px',
	paddingBottom: props.paddingBottom || '20px'
}))`
	padding-bottom: ${(props) => props.paddingBottom};
	min-height:${(props) => props.minHeight};
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
`;

const Required = styled.span`
	display: inline-block;
	padding: 0 !important;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	white-space: nowrap;
	color: #3b3b3b;
	user-select: none;
	pointer-events: none;
`;

const PageBlock = styled.div`
	display: none;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const PageToolbar = styled.div`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px;
`;

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bold;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;


const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	z-index: 20;
	position: absolute;
	top: -6px;
	left: 7px;
	padding: 0 3px;
	background-color: #fff;
	white-space: nowrap;
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	&:before {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;
const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0'
}))`
	border: 1px solid #b9bdce;
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;
const TableFieldContainer = styled.div`
	width: 100% !important;
	min-height: auto !important;
	text-align: center;
	position: relative !important;
	top: 0 !important;
	height: inherit !important;
	float: left;
	overflow: hidden !important;
`;
const Headers = styled.div`
	border-width: 0px;
	width: 100%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	border-top: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;
const HeaderContainer = styled.div`
	width: 100%;
	height: 100% !important;
	overflow: hidden;
	zoom: 1;
	position: relative;
	left: 0;
	top: 0;
`;

const HeaderContainerInner = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100% !important;
	width: 100% !important;
`;
const ColumnName = styled.div.attrs((props) => ({
	width: props.width,
	left: props.left
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	border-width: 1px;    
    height: auto;
    margin: 0px;
    top: 0px;
   font-size: 11px;
    font-weight: bold;
    font-family: inherit;
    color: #707887;
    text-transform: uppercase;
    letter-spacing: -0.4px;
    vertical-align: middle;
    position: absolute;
    bottom: 0; 

`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;
const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;
const SelectSpanInner = styled.span`white-space: nowrap;`;
const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: auto;
	height: inherit !important;
	float: left;
	height: auto !important;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 1158px;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-collapse: collapse;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0'
}))`
width: ${(props) => props.width};
`;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;
const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;
const AddMoreButton = styled.button`
	background-color: transparent;
	color: #05cbbf;
	border-color: transparent;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:hover {
		outline: none;
	}
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;

const EqualBlockContainer = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px;
`;
const LeftBlock = styled.div`
	margin-right: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const TextAreaContainer = styled.div`
	width: 100%;
	height: 100% !important;
	position: relative;
	display: flex;
	align-items: start;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
`;
const TextArea = styled.textarea`
    padding: 10px;
    width: 100%;
    height: 100% !important;
    border: 1px solid #b9bdce;
	border-radius: 4px;
	font-size: 13px;
	outline: none !important
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-weight: 400;
	min-width: 100px;
    flex: 1;
    min-height: 40px;
    background-color: #fff;

`;
const RightBlock = styled.div`
	margin-left: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-end !important;
	float: right;
`;
const RightBlockTable = styled.table`
	display: table;
	border: 1px solid #b9bdce;
	border-radius: 4px;
	border-collapse: inherit !important;
	font-size: 12px;
	text-align: right;
	text-transform: uppercase;
	float: right;
	width: 100%;
	border-spacing: 0;
	color: #3b3b3b;
`;

const BlockTableHead = styled.thead`
	box-sizing: border-box;
	display: table-header-group;
	text-align: right;
	text-transform: uppercase;
	border-collapse: inherit !important;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

const BlockTableBody = styled.tbody`
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
	border-spacing: 0;
	color: #3b3b3b;
`;

const BlockTableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0'
}))`
width: ${(props) => props.width};
padding: 10px;
    font-weight: bold;
    color: #707887;
    border-bottom: 1px solid #b9bdce;
`;
const BlockTableTd = styled.td`
	padding: 3px 10px 3px 0;
	color: #41454e;
	font-weight: normal;
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
`;

const BlockInnerTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
`;

const RoundBlockOuterDiv = styled.div`
	font-size: 12px;
	font-weight: bold;
	padding: 12px;
	float: right;
	box-sizing: border-box;
	display: block;
`;
const RoundBlockInnerDiv = styled.div`
	display: inline-block;
	padding-left: 20px;
	box-sizing: border-box;
`;
const Span = styled.span.attrs((props) => ({
	color: props.color,
	marginLeft: props.marginLeft || '0'
}))`
color: ${(props) => props.color};
margin-left: ${(props) => props.marginLeft};
`;
