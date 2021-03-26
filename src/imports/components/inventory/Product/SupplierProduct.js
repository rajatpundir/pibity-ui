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
	Custombutton,
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
	ToolbarItems
} from '../../../styles/inventory/Style';

class SupplierProducts extends React.Component {
	constructor(props) {
		super();
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
				if (this.props.updatable) {
					values.set('product', this.props.params.variableName);
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateSupplierProduct(list);
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
		console.log(list);
		this.setState({ list: list });
		this.props.updateSupplierProduct(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateSupplierProduct(list);
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
										value: listVariable.get('values').get('supplier'),
										label: listVariable.get('values').get('supplier')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'supplier', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Supplier !== undefined ? (
											this.props.variables.Supplier
												.filter((supplier) => {
													return !this.state.list
														.map((list) => {
															return list.get('values').get('supplier');
														})
														.includes(supplier.variableName);
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
			<PageBlock id="suppliers">
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Suppliers</LeftItemH1>
					</ToolbarItems>
					<ToolbarItems>
						{this.props.updatable ? this.props.ceateSupplierProducts ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.createSupplierProducts();
								}}
							>
								Create
							</Custombutton>
						) : (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.update();
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
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Supplier</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan textAlign="right"> Supplier SKU</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Product Name</SelectSpan>
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
								{this.state.list.length === 0 ? <EmptyRow>No Supplier Found</EmptyRow> : undefined}
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

export default connect(mapStateToProps, { clearErrors, getVariables })(SupplierProducts);
