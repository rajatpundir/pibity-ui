import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import Select from 'react-select';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import {
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	EmptyRow,
	HeaderBody,
	HeaderBodyContainer,
	Input,
	InputBody,
	PageBar,
	PageBarAlign,
	PageBlock,
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
	PageToolbar,
	ToolbarItems,
	Custombutton,
	LeftItemH1
} from '../../../styles/inventory/Style';

class SupplierProduct extends React.Component {
	constructor(props) {
		super();
		this.state = {
			list: props.supplierProducts
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
			list: nextProps.supplierProducts
		};
	}

	onChange(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
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
		this.props.updateSupplierProducts(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.push(
			new Map([
				[ 'typeName', 'ProductSupplier' ],
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'supplier', '' ],
						[ 'product', '' ],
						[ 'supplierSKU', '' ],
						[ 'fixedPrice', '' ],
						[ 'latestPrice', '' ],
						[ 'supplierProductName', '' ],
						[ 'productUrl', '' ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateSupplierProducts(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateSupplierProducts(list);
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
					<TableData width="10%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('product'),
										label: listVariable.get('values').get('product')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'product', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter((product) => {
													return !this.state.list
														.map((list) => {
															return list.get('values').get('product');
														})
														.includes(product.variableName);
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
								name="supplierSKU"
								type="text"
								value={listVariable.get('values').get('supplierSKU')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="supplierProductName"
								type="text"
								value={listVariable.get('values').get('supplierProductName')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="productUrl"
								type="text"
								value={listVariable.get('values').get('productUrl')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="latestPrice"
								type="text"
								value={listVariable.get('values').get('latestPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="fixedPrice"
								type="text"
								value={listVariable.get('values').get('fixedPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					{/* <TableData width="11%" left="89%">
						<TableHeaderInner>
							<Input
								name="lastSupplied"
								type="text"
								value={listVariable.get('values').get('lastSupplied')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData> */}
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock id="contact">
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Supplier Products</LeftItemH1>
					</ToolbarItems>
					<ToolbarItems>
						{this.props.updatable ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.update();
								}}
							>
								Update
							</Custombutton>
						) : (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.createSupplierProducts();
								}}
							>
								Create
							</Custombutton>
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
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Product</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan textAlign="right"> Supplier SKU</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Supplier Product Name</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Product Url</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Latest Price</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Fixed Price</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												{/* <TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Last Supplied</SelectSpan>
														</SelectIconContainer>
													</TableHeaders> */}
											</TableRow>
											{this.renderInputFields()}
										</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? <EmptyRow>No Products found.</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add New Contact
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
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, getVariables })(SupplierProduct);
