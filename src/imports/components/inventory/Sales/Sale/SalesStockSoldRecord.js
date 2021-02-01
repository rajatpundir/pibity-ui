import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';
import { clearErrors } from '../../../../redux/actions/errors';
import { successMessage, customErrorMessage } from '../../../main/Notification';
import { createVariable, getVariables, updateVariable, objToMapRec } from '../../../../redux/actions/variables';
import { executeFuntion } from '../../../../redux/actions/executeFuntion';
import {
	BodyTable,
	FormControl,
	HeaderBody,
	HeaderBodyContainer,
	Input,
	InputBody,
	InputColumnWrapper,
	InputLabel,
	LeftItemH1,
	PageBar,
	PageBlock,
	PageToolbar,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	StatusSpan,
	StatusBackgroundColor,
	ToolbarItems,
	Custombutton
} from '../../../../styles/inventory/Style';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';

class SalesStockSoldRecord extends React.Component {
	constructor(props) {
		super();
		this.state = {
			createInvoice: true,
			updateInvoice: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'SalesOrderStockSoldRecord' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'date', '' ],
						[ 'status', '' ],
						[ 'movementType', '' ],
						[ 'total', 0 ],
						[ 'fromCustomer', '' ],
						[ 'fromLocation', '' ],
						[ 'salesOrder', '' ],
						[ 'productCostBeforeTax', 0 ],
						[ 'additionalCostBeforeTax', 0 ],
						[ 'totalTaxOnProduct', 0 ],
						[ 'totalTaxOnAdditionalCost', 0 ]
					])
				]
			]),
			stockItems: []
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('SalesOrderStockItemRecord');
		this.props.getVariables('SalesOrderStockSoldRecord');
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variables.SalesOrderStockSoldRecord && nextProps.variables.SalesOrderStockItemRecord) {
			const variable = nextProps.variables.SalesOrderStockSoldRecord.filter(
				(variable) => variable.values.salesOrder === nextProps.salesOrder
			)[0];
			const stockItems = nextProps.variables.SalesOrderStockItemRecord.filter(
				(item) => item.values.salesOrder === nextProps.salesOrder
			);
			if (variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					stockItems: stockItems,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap
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
	updateStatus(e, item, funtionName) {
		const args = {
			salesOrderStockItemRecord: item.variableName
		};
		switch (funtionName) {
			case 'dispatchSalesOrderProduct':
				const update = {
					updateType: 'Sent',
					movementType: item.values.movementType,
					quantity: item.values.quantity,
					refProductStore: item.values.fromCustomer,
					refInvoice: item.values.salesOrder,
					productStore: item.values.fromProductStore
				};
				this.props
					.executeFuntion(
						{
							quantity: item.values.quantity,
							productStore: item.values.fromProductStore
						},
						'isQuantityAvailableInStore'
					)
					.then((response) => {
						if (response.status === 200) {
							if (response.data.dispatchProduct) {
								this.props.executeFuntion(update, 'reduceQuantityInProductStore').then((response) => {
									if (response.status === 200) {
										this.props.executeFuntion(args, funtionName).then((response) => {
											if (response.status === 200) {
												successMessage("Product Dispatched Succesfully")
												this.props.getVariables('SalesOrderStockItemRecord');
											}
										});
									}
								});
							} else {
								customErrorMessage('Quantity insufficient in store');
							}
						}
					});

				break;
			default:
				this.props.executeFuntion(args, funtionName).then((response) => {
					if (response.status === 200) {
						this.props.getVariables('SalesOrderStockItemRecord');
					}
				});
				break;
		}
	}

	renderPurchaseItemRecord() {
		const rows = [];
		this.state.stockItems.forEach((data) => {
			var backgroundColor;
			var color = '#f1f6fb';
			switch (data.values.status) {
				case 'Waiting For Dispatch':
					backgroundColor = StatusBackgroundColor.pending;
					color = '#4c4f4f';
					break;
				case 'In Transit':
					backgroundColor = StatusBackgroundColor.pending;
					color = '#4c4f4f';
					break;
				case 'Dispatching Rejected Item':
					backgroundColor = StatusBackgroundColor.rejected;
					break;
				case 'Rejected Item In Transit':
					backgroundColor = StatusBackgroundColor.rejected;
					break;
				case 'Rejected Item Received':
					backgroundColor = StatusBackgroundColor.rejected;
					break;
				case 'Received':
					backgroundColor = StatusBackgroundColor.approved;
					break;
				case 'Receive Approved':
					backgroundColor = StatusBackgroundColor.approved;
					break;
				default:
					break;
			}
			rows.push(
				<TableRow key={data.variableName}>
					<TableData width="5%" />
					<TableData width="20%">
						<TableHeaderInner>{data.values.product}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{data.values.quantity}</TableHeaderInner>
					</TableData>
					<TableData width="20%">
						<TableHeaderInner>
							<StatusSpan backgroundColor={backgroundColor} color={color}>
								{data.values.status}
							</StatusSpan>
						</TableHeaderInner>
					</TableData>
					<TableData width="30%">
						<TableHeaderInner>
							{data.values.status === 'Waiting For Dispatch' ? (
								<React.Fragment>
									<Custombutton
										padding="0 10px"
										minWidth="70px"
										height="32px"
										margin="0 5px"
										backgroundColor="#05cb9a"
										borderColor="#05cb9a"
										borderOnHover="#0bc295"
										backgroundOnHover="#0bc295"
										onClick={(e) => this.updateStatus(e, data, 'dispatchSalesOrderProduct')}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Dispatch
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}

							{data.values.status === 'In Transit' ? (
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
									onClick={this.onClose}
								>
									<FontAwsomeIcon className="fa fa-print" />
									Print
								</Custombutton>
							) : (
								undefined
							)}
						</TableHeaderInner>
					</TableData>
				</TableRow>
			);
		});
		return rows;
	}

	render() {
		return (
			<PageBlock id="invoice">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Stock Sold</LeftItemH1>
					</ToolbarItems>
				</PageToolbar>
				<PageBar>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="fromCustomer"
								type="text"
								value={this.state.variable.get('values').get('fromCustomer')}
								readOnly
							/>
							<InputLabel>Customer</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="fromLocation"
								type="text"
								value={this.state.variable.get('values').get('fromLocation')}
								readOnly
							/>
							<InputLabel>Location</InputLabel>
						</FormControl>
					</InputColumnWrapper>
				</PageBar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable width="inherit">
										<TableBody>
											<TableRow>
												<TableHeaders width="5%" />
												<TableHeaders width="20%">
													<SelectIconContainer>
														<SelectSpan>Product</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Quantity</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="20%">
													<SelectIconContainer>
														<SelectSpan> Status</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="30%">
													<SelectIconContainer>
														<SelectSpan>Actions</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderPurchaseItemRecord()}
										</TableBody>
									</BodyTable>
									{this.state.stockItems.length === 0 ? (
										<EmptyRowImageContainer>
											<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
											<EmptyRowTag>No Record</EmptyRowTag>
										</EmptyRowImageContainer>
									) : (
										undefined
									)}
								</HeaderBody>
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

export default connect(mapStateToProps, { executeFuntion, clearErrors, getVariables, createVariable, updateVariable })(
	SalesStockSoldRecord
);
export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
