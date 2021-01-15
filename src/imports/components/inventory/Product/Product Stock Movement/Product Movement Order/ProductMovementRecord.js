import React from 'react';
import { connect } from 'react-redux';
import { getVariables } from '../../../../../redux/actions/variables';

import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	InputBody,
	LeftItemH1,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	TableBody,
	TableFieldContainer,
	TableHeaders,
	TableRow,
	ToolbarItems,
	TableData,
	TableHeaderInner,
	Custombutton,
	StatusSpan,
	StatusBackgroundColor,
	FontAwsomeIcon
} from '../../../../../styles/inventory/Style';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../../styles/main/Dashboard';

class ProductMovementRecord extends React.Component {
	constructor(props) {
		super();
		this.state = {
			productMovementRecords: []
		};
		this.onChange = this.onChange.bind(this);
		this.renderProductMovementItemRecord = this.renderProductMovementItemRecord.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Product');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			productMovementRecords: nextProps.productMovementRecords
		};
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	updateStatus(e, item, funtionName) {
		const args = {
			productMovementRecord: item.variableName
		};
		switch (funtionName) {
			case 'dispatchShipmentAndUpdateProductMovementRecord':
				const updateStore = {
					updateType: 'Sent',
					movementType:item.values.movementType,
					quantity: item.values.quantity,
					refProductStore:item.values.toProductStore,
					refInvoice:item.values.referenceInvoice,
					productStore: item.values.fromProductStore
				};
				this.props.executeFuntion(updateStore, 'reduceQuantityInProductStore').then((response) => {
					if (response.status === 200) {
						this.props.executeFuntion(args, funtionName).then((response) => {
							if (response.status === 200) {
								this.props.getVariables('ProductMovementRecord');
							}
						});
					}
				});
				break;
			case 'approveShipmentReceivedAndUpdateProductMovementRecord':
				const update = {
					updateType: 'Received',
					movementType:item.values.movementType,
					quantity: item.values.quantity,
					refProductStore:item.values.fromProductStore,
					refInvoice:item.values.referenceInvoice,
					productStore: item.values.toProductStore
                };
                //todo
				this.props.executeFuntion(update, 'updateQuantityInProductStore').then((response) => {
					if (response.status === 200) {
						this.props.executeFuntion(args, funtionName).then((response) => {
							if (response.status === 200) {
								this.props.getVariables('ProductMovementRecord');
							}
						});
					}
				});
				break;
			case 'receiveRejectedShipmentUpdateMovementRecord':
				const reciveRejectedItem = {
					updateType: "Returned",
					movementType:item.values.movementType,
					quantity: item.values.quantity,
					refProductStore:item.values.toProductStore,
					refInvoice:item.values.referenceInvoice,
					productStore: item.values.fromProductStore
				};
				this.props.executeFuntion(reciveRejectedItem,'updateQuantityInProductStore').then((response) => {
					if (response.status === 200) {
						this.props.executeFuntion(args, funtionName).then((response) => {
							if (response.status === 200) {
								this.props.getVariables('ProductMovementRecord');
							}
						});
					}
				});
				break;
			default:
				this.props.executeFuntion(args, funtionName).then((response) => {
					if (response.status === 200) {
						this.props.getVariables('ProductMovementRecord');
					}
				});
				break;
		}
	}

	renderProductMovementItemRecord() {
		const rows = [];
		this.state.productMovementRecords.forEach((data) => {
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
				case 'Waiting For Dispatch(Rejected Items)':
					backgroundColor = StatusBackgroundColor.rejected;
					break;
				case 'In Transit(Rejected Items)':
					backgroundColor = StatusBackgroundColor.rejected;
					break;
				case 'Rejected Items Received':
					backgroundColor = StatusBackgroundColor.rejected;
                    break;
                case 'Received':
                        backgroundColor = StatusBackgroundColor.approved;
                        break;
				case "Receive Approved":
					backgroundColor = StatusBackgroundColor.approved;
					break;
				default:
					break;
			}
			rows.push(
				<TableRow key={data.variableName}>
					<TableData width="2%" />
					<TableData width="10%">
						<TableHeaderInner>{data.values.product}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{data.values.fromLocation}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{data.values.toLocation}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{data.values.quantity}</TableHeaderInner>
					</TableData>
					<TableData width="0%">
						<TableHeaderInner>
							<StatusSpan backgroundColor={backgroundColor} color={color}>
								{data.values.status}
							</StatusSpan>
						</TableHeaderInner>
					</TableData>
					<TableData width="20%">
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
										onClick={(e) =>
											this.updateStatus(
												e,
												data,
												'dispatchShipmentAndUpdateProductMovementRecord'
											)}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Dispatch
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === 'In Transit' ? (
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
										onClick={(e) =>
											this.updateStatus(e, data, 'receiveShipmentAndUpdateProductMovementRecord')}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Recieve
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === 'Received' ? (
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
										onClick={(e) =>
											this.updateStatus(
												e,
												data,
												'approveShipmentReceivedAndUpdateProductMovementRecord'
											)}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Approve Recieve
									</Custombutton>
									<Custombutton
										padding="0 10px"
										minWidth="70px"
										height="32px"
										color="#f7f3f3"
										backgroundColor="#ed3636"
										borderColor="#ed3636"
										borderOnHover="#d82b2b"
										backgroundOnHover="#d82b2b"
										margin="0 5px"
										onClick={(e) =>
											this.updateStatus(e, data, 'rejectShipmentAndUpdateProductMovementRecord')}
									>
										<FontAwsomeIcon className="fa fa-times " />
										Reject Shipment
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === "Dispatching Rejected Item" ? (
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
										onClick={(e) =>
											this.updateStatus(e, data, 'dispatchRejectedShipmentUpdateMovementRecord')}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Dispatch Rejected Shipment
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === "Rejected Item In Transit" ? (
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
										onClick={(e) =>
											this.updateStatus(e, data, 'receiveRejectedShipmentUpdateMovementRecord')}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Recieve Rejected Shipment
									</Custombutton>
								</React.Fragment>
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
			<PageBlock>
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Item Movement Record</LeftItemH1>
					</ToolbarItems>
				</PageToolbar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable width="auto">
										<TableBody>
											<TableRow>
												<TableHeaders width="2%" />
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Product</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>From Location</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>To Location</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Quantity</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan> Status</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="20%">
													<SelectIconContainer>
														<SelectSpan>Actions</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderProductMovementItemRecord()}
										</TableBody>
									</BodyTable>
									{this.state.productMovementRecords.length === 0 ? (
										<EmptyRowImageContainer>
											<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
											<EmptyRowTag>No Products</EmptyRowTag>
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

export default connect(mapStateToProps, {
	getVariables,
	executeFuntion
})(ProductMovementRecord);
