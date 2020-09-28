import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import CheckIcon from '@material-ui/icons/Check';

class PurchaseStockReceived extends React.Component {
	constructor(props) {
		super(props);
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
					<ToolbarLeftItems>
						<LeftItemH1>STOCK RECEIVED</LeftItemH1>
					</ToolbarLeftItems>
					<AuthorizeButton>Authorize</AuthorizeButton>
				</PageToolbar>
				<PageBar>
					<PageBarAlignLeft>
						<PlusButton onClick={(e) => this.addVariableToList()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlignLeft>
				</PageBar>
				<InputBody borderTop="0">
					<RoundedBlock>
						<TableFieldContainer>
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
				<button onClick={(e) => this.savePurchaseStockReceived()}>save</button>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseStockReceived);
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
const PageBlock = styled.div`
	display: block;
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
	border-bottom: 1px solid #e0e1e7;
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

const Input = styled.input`
	width: inherit;
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
const SelectWrapper = styled.div`
	width: inherit;
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
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

// float: left;
const TableFieldContainer = styled.div`
	position: relative;
	width: 100% !important;
	overflow: hidden;

	min-height: auto !important;
	text-align: center;
	top: 0 !important;
	height: inherit !important;
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

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: inherit !important;
	float: left;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 100%;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

const TableHeaders = styled.th.attrs((props) => ({
	width: props.width,
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	// overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableHeaderInner = styled.div`
    width:100%;
    padding: 0 3px;
    color: #41454e;
    vertical-align: middle;
    font-size: 13px;
    white-space: nowrap;
    // overflow: hidden;
    text-overflow: ellipsis;
}
`;
const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
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
	outline: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
	&:focus {
		outline: none;
	}
`;

const AuthorizeButton = styled.button`
	min-width: 70px;
	color: #fff;
	background-color: #05cbbf;
	border-color: #05cbbf;
	border-width: 1px;
	border-style: solid;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:focus {
		outline: none;
	}
`;
