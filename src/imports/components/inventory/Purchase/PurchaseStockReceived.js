import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import {
	AddMoreBlock,
	AddMoreButton,
	Custombutton,
	HeaderBody,
	HeaderBodyContainer,
	BodyTable,
	EmptyRow,
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
	ToolbarItems
} from '../../../styles/inventory/Style';

class PurchaseStockReceived extends React.Component {
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
		this.props.updateStock(list);
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
						[ 'product', '' ],
						[ 'batch', '' ],
						[ 'dateRecieved', '' ],
						[ 'expiryDate', '' ],
						[ 'supplierSku', '' ],
						[ 'quantity', '' ],
						[ 'unit', '' ],
						[ 'location', '' ],
						[ 'recieved', '' ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateStock(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateStock(list);
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
											this.props.variables.Product.map((variable) => {
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
					<TableData width="10%" left="14%">
						<TableHeaderInner>
							<Input
								name="batch"
								type="text"
								value={listVariable.get('values').get('batch')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="11%" left="26%">
						<TableHeaderInner>
							<Input
								name="expiryDate"
								type="text"
								value={listVariable.get('values').get('expiryDate')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="12%" left="37%">
						<TableHeaderInner>
							<Input
								name="supplierSKU"
								type="text"
								value={listVariable.get('values').get('supplierSKU')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="46%">
						<TableHeaderInner>
							<Input
								name="unit"
								type="number"
								value={listVariable.get('values').get('unit')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="54%">
						<TableHeaderInner>
							<Input
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="65%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('location'),
										label: listVariable.get('values').get('location')
									}}
									onChange={(option) => {
										this.onProductOrderInputChange(
											{ target: { name: 'location', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Location !== undefined ? (
											this.props.variables.Location.map((variable) => {
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
					<TableData width="11%" left="77%">
						<TableHeaderInner>
							<Input
								name="dateRecieved"
								type="text"
								value={listVariable.get('values').get('dateRecieved')}
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
			<PageBlock id="stockReceived">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>STOCK RECEIVED</LeftItemH1>
					</ToolbarItems>
					<Custombutton>Authorize</Custombutton>
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
							<HeaderBodyContainer>
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
														<SelectSpan>Product</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="14%">
													<SelectIconContainer>
														<SelectSpan textAlign="right">Batch/ Serial</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="11%" left="26%">
													<SelectIconContainer>
														<SelectSpan>Expirey Date </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="12%" left="36%">
													<SelectIconContainer>
														<SelectSpan>Supplier SKU </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="8%" left="46%">
													<SelectIconContainer>
														<SelectSpan>Unit </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="54%">
													<SelectIconContainer>
														<SelectSpan>Quantity </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="65%">
													<SelectIconContainer>
														<SelectSpan>Location </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="11%" left="77%">
													<SelectIconContainer>
														<SelectSpan>Date Recieved </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="88%">
													<SelectIconContainer>
														<SelectSpan>Received </SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderInputFields()}
										</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? <EmptyRow>No Contacts found.</EmptyRow> : undefined}
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
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseStockReceived);

