import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';

import {
	InputRowWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarItems,
	FormControl,
	PageBarAlign,
	Custombutton,
	FontAwsomeIcon,
	LeftItemWrapper,
	TextAreaContainer,
	TextArea,
	StatusBackgroundColor,
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	EmptyRow
} from '../../../../styles/inventory/Style';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};
class PurchaseIndentDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			variable: props.variable,
			indentItems: props.indentItems,
			productStore: []
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
			variable: nextProps.variable,
			open: true,
			indentItems: nextProps.indentItems,
			productStore:
				nextProps.variables !== undefined
					? nextProps.variables.ProductStore !== undefined ? nextProps.variables.ProductStore : []
					: []
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set(e.target.name, e.target.value);
		if(e.target.name === "date"){
			variable.set(e.target.name, new Date(e.target.value).getTime());
		}
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	
		// const myDate = new Date(e.target.value);
		// console.log("myDate" + new Date(e.target.value).toLocaleDateString());
		// const a =  new Date(e.target.value).getTime();
		// console.log(a);
		// const b = new Date(a).toLocaleDateString();
		// console.log("change date" + b);

	}

	onIndentItemChange(e, variableName) {
		const indentItems = cloneDeep(this.state.indentItems);
		indentItems.map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});

		this.setState({ indentItems: indentItems });
		this.props.updateIndentItems(indentItems);
	}

	addItems() {
		const indentItems = cloneDeep(this.state.indentItems);
		indentItems.unshift(
			new Map([
				['typeName', 'PurchaseIndentItem'],
				[
					'variableName',
					String(indentItems.length === 0 ? 0 : Math.max(...indentItems.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						['purchaseIndent', ''],
						['product', ''],
						['quantity', ''],
						['unit', ''],
						['partNumber', ''],
						['requiredDate', ''],
						['remark', '']
					])
				]
			])
		);
		this.setState({ indentItems: indentItems });
		this.props.updateIndentItems(indentItems);
	}

	onRemoveOrderItem(e, variableName) {
		const indentItems = this.state.indentItems.filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ indentItems: indentItems });
		this.props.updateIndentItems(indentItems);
	}

	renderOrderItems() {
		const rows = [];
		this.state.indentItems.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="5%">
						{this.props.isdisabled ? (
							undefined
						) : (
							<i
								name={listVariable.get('variableName')}
								className="large material-icons"
								onClick={(e) => this.onRemoveOrderItem(e, listVariable.get('variableName'))}
							>
								remove_circle_outline
							</i>
						)}
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('product'),
										label: listVariable.get('values').get('product')
									}}
									onChange={(option) => {
										this.onIndentItemChange(
											{ target: { name: 'product', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter((product) => {
													return !this.state.indentItems
														.map((item) => {
															return item.get('values').get('product');
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
								name="partNumber"
								type="text"
								value={listVariable.get('values').get('partNumber')}
								onChange={(e) => this.onIndentItemChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('unit'),
										label: listVariable.get('values').get('unit')
									}}
									onChange={(option) => {
										this.onIndentItemChange(
											{ target: { name: 'unit', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.UnitOfMeasure !== undefined ? (
											this.props.variables.UnitOfMeasure
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
								name="quantity"
								type="number"
								value={listVariable.get('values').get('quantity')}
								onChange={(e) => this.onIndentItemChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>

					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="requiredDate"
								type="Date"
								value={listVariable.get('values').get('requiredDate')}
								onChange={(e) => this.onIndentItemChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Input
								name="remark"
								type="text"
								value={listVariable.get('values').get('remark')}
								onChange={(e) => this.onIndentItemChange(e, listVariable.get('variableName'))}
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
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Purchase Indent</LeftItemH1>
					</ToolbarItems>
				</PageToolbar>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody overflow="visible">
						<InputFieldContainer>
							<InputRowWrapper>
								<FormControl flexBasis={style.flexBasis} paddingRight="10px">
									<Input
										style={{
											height: ' 38px'
										}}
										name="date"
										type="date"
										placeholder="date"
										value={new Date(this.state.variable.get("date")).toISOString().substr(0,10)}
										onChange={this.onChange}
									/>
									<InputLabel> Date</InputLabel>
								</FormControl>
								<FormControl flexBasis={style.flexBasis} paddingRight="10px">
									<Input
										name="indentNumber"
										type="Text"
										value={this.state.variable.get('indentNumber')}
										onChange={this.onChange}
									/>
									<InputLabel> Inednt Number</InputLabel>
								</FormControl>
							</InputRowWrapper>

							<RoundedBlock overflow="visible">
								<TableFieldContainer overflow="visible">
									<Headers>
										<HeaderContainer>
											<HeaderBody>
												<BodyTable>
													<TableBody>
														<TableRow>
															<TableHeaders width="5%" />
															<TableHeaders width="15%">
																<SelectIconContainer>
																	<SelectSpan>Product</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Part Number</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Unit</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan> Quantity</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Required date</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Remark</SelectSpan>
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
												<TableBody>{this.renderOrderItems()}</TableBody>
											</BodyTable>
										</HeaderBody>
										{this.state.indentItems.length === 0 ? (
											<EmptyRow>You do not have any Item.</EmptyRow>
										) : (
											undefined
										)}
									</HeaderBodyContainer>
									{this.props.isdisabled ? (
										undefined
									) : (
										<AddMoreBlock>
											<AddMoreButton onClick={(e) => this.addItems()}>
												<i className="large material-icons">add</i>Add Items
												Charges
											</AddMoreButton>
										</AddMoreBlock>
									)}
								</TableFieldContainer>
							</RoundedBlock>
							<InputRowWrapper paddingTop="15px">
								<TextAreaContainer>
									<TextArea
										name="indentPurpose"
										type="text"
										placeholder="Remark"
										value={this.state.variable.get('indentPurpose')}
										height="60px"
										onChange={this.onChange}
									/>
									<InputLabel>Indent Purpose</InputLabel>
								</TextAreaContainer>
							</InputRowWrapper>
						</InputFieldContainer>
					</InputBody>
				</Collapse>
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
	clearErrors
})(PurchaseIndentDetail);
