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
	ToolbarLeftItems
} from '../Purchase/Style';

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
		list.unshift(
			new Map([
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'supplier', '' ],
						[ 'currency', '' ],
						[ 'dropShip', '' ],
						[ 'fixedPrice', '' ],
						[ 'lastSupplied', '' ],
						[ 'latestPrice', '' ],
						[ 'productName', '' ],
						[ 'productUrl', '' ],
						[ 'sku', '' ]
					])
				]
			])
		);
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
					<TableData width="10%" left="6%">
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
											this.props.variables.Supplier.map((variable) => {
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
								name="sku"
								type="text"
								value={listVariable.get('values').get('sku')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="23%">
						<TableHeaderInner>
							<Input
								name="productName"
								type="text"
								value={listVariable.get('values').get('productName')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="34%">
						<TableHeaderInner>
							<Input
								name="productUrl"
								type="text"
								value={listVariable.get('values').get('productUrl')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="46%">
						<TableHeaderInner>
							<Input
								name="dropShip"
								type="text"
								value={listVariable.get('values').get('dropShip')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="12%" left="55%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('currency'),
										label: listVariable.get('values').get('currency')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'currency', value: option.value } },
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
					<TableData width="11%" left="67%">
						<TableHeaderInner>
							<Input
								name="latestPrice"
								type="text"
								value={listVariable.get('values').get('latestPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="78%">
						<TableHeaderInner>
							<Input
								name="fixedPrice"
								type="text"
								value={listVariable.get('values').get('fixedPrice')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%" left="89%">
						<TableHeaderInner>
							<Input
								name="lastSupplied"
								type="text"
								value={listVariable.get('values').get('lastSupplied')}
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
			<PageBlock id="suppliers">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Suppliers</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<PageBar>
					<PageBarAlign>
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
													<TableHeaders width="6%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>

													<TableHeaders width="10%" left="6%">
														<SelectIconContainer>
															<SelectSpan>Supplier</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="14%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">SKU</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="23%">
														<SelectIconContainer>
															<SelectSpan>Product Name</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="34%">
														<SelectIconContainer>
															<SelectSpan>Product Url</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="46%">
														<SelectIconContainer>
															<SelectSpan>Drop Ship</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="12%" left="55%">
														<SelectIconContainer>
															<SelectSpan>Currency</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="67%">
														<SelectIconContainer>
															<SelectSpan>Latest Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="78%">
														<SelectIconContainer>
															<SelectSpan>Fixed Price</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="89%">
														<SelectIconContainer>
															<SelectSpan>Last Supplied</SelectSpan>
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
								{this.state.list.length === 0 ? <EmptyRow>No Supplier Found</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add More Items
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
					<RoundedBlock marginTop="10px" overflow="visible">
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
													<TableHeaders width="10%" left="6%">
														<SelectIconContainer>
															<SelectSpan>Supplier</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="14%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Lead</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="23%">
														<SelectIconContainer>
															<SelectSpan>Safety</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="34%">
														<SelectIconContainer>
															<SelectSpan>Reorder Quantity</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="46%">
														<SelectIconContainer>
															<SelectSpan>Minimum to Reorder</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="12%" left="55%">
														<SelectIconContainer>
															<SelectSpan>Location</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="67%">
														<SelectIconContainer>
															<SelectSpan>Lead</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%" left="78%">
														<SelectIconContainer>
															<SelectSpan>Safety</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="11%" left="89%">
														<SelectIconContainer>
															<SelectSpan>Reorder Quantity</SelectSpan>
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
												<TableData width="100%" />
											</TableRow>
										</TableBody>
									</BodyTable>
								</HeaderBody>
								<EmptyRow>No Supplier Found</EmptyRow>
							</HeaderBodyContainer>
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