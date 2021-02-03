import React from 'react';
import { connect } from 'react-redux';
import { getVariables } from '../../../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../../../../main/Notification';
import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	InputBody,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
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
import AcceptOrderModal from './AcceptOrderModal';

class ProductMovementRecord extends React.Component {
	constructor(props) {
		super();
		this.state = {
			productMovementRecords: [],
			internalMovementProductLog: [],
			acceptOrderModal: false,
			selectedRecord: {}
		};
		this.onChange = this.onChange.bind(this);
		this.renderProductMovementItemRecord = this.renderProductMovementItemRecord.bind(this);
		this.onCloseAcceptOrderModal = this.onCloseAcceptOrderModal.bind(this);
		this.onOpenAcceptOrderModal = this.onOpenAcceptOrderModal.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Product');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			productMovementRecords: nextProps.productMovementRecords,
			internalMovementProductLog: nextProps.internalMovementProductLog
		};
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onOpenAcceptOrderModal(selectedRecord) {
		this.setState({
			acceptOrderModal: true,
			selectedRecord: selectedRecord
		});
	}

	onCloseAcceptOrderModal() {
		this.setState({ acceptOrderModal: false });
	}

	updateStatus(e, item, funtionName, rejectedQuantity) {
		const args = {
			productMovementRecord: item.variableName
		};
		switch (funtionName) {
			case 'dispatchShipmentAndUpdateProductMovementRecord':
				const updateStore = {
					updateType: 'Sent',
					movementType: item.values.movementType,
					quantity: item.values.quantity,
					refProductStore: item.values.toProductStore,
					refInvoice: item.values.productMovementInvoice,
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
								this.props
									.executeFuntion(updateStore, 'reduceQuantityInProductStore')
									.then((response) => {
										if (response.status === 200) {
											this.props.executeFuntion(args, funtionName).then((response) => {
												if (response.status === 200) {
													successMessage('Product Dispatched Succesfully');
													this.props.getVariables('InternalProductMovementItemRecord');
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
			case 'approveShipmentReceivedAndUpdateProductMovementRecord':
				this.onOpenAcceptOrderModal(item);
				break;
			case 'receiveRejectedShipmentUpdateMovementRecord':
				const reciveRejectedItem = {
					updateType: 'Returned',
					movementType: item.values.movementType,
					quantity: rejectedQuantity,
					refProductStore: item.values.toProductStore,
					refInvoice: item.values.productMovementInvoice,
					productStore: item.values.fromProductStore
				};
				this.props.executeFuntion(reciveRejectedItem, 'updateQuantityInProductStore').then((response) => {
					if (response.status === 200) {
						this.props.executeFuntion(args, funtionName).then((response) => {
							if (response.status === 200) {
								successMessage('Product Recieved Succesfully');
								this.props.getVariables('InternalProductMovementItemRecord');
							}
						});
					}
				});
				break;
			default:
				this.props.executeFuntion(args, funtionName).then((response) => {
					if (response.status === 200) {
						this.props.getVariables('InternalProductMovementItemRecord');
					}
				});
				break;
		}
	}

	renderProductMovementItemRecord() {
		const rows = [];
		this.state.productMovementRecords.forEach((data) => {
			const log = this.state.internalMovementProductLog.filter(
				(log) => log.values.referenceItemRecord === data.variableName
			)[0];
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
					<TableData width="10%">
						<TableHeaderInner>{log !== undefined ? log.values.acceptedQuantity : '-'}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{log !== undefined ? log.values.rejectedQuantity : '-'}</TableHeaderInner>
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
												'dispatchShipmentAndUpdateProductMovementRecord',
												0
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
											this.updateStatus(
												e,
												data,
												'receiveShipmentAndUpdateProductMovementRecord',
												0
											)}
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
												'approveShipmentReceivedAndUpdateProductMovementRecord',
												0
											)}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Approve Recieve
									</Custombutton>
									{/* <Custombutton
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
									</Custombutton> */}
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === 'Dispatching Rejected Item' ? (
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
												'dispatchRejectedShipmentUpdateMovementRecord',
												log.values.rejectedQuantity
											)}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Dispatch Shipment
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === 'Rejected Item In Transit' ? (
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
												'receiveRejectedShipmentUpdateMovementRecord',
												log.values.rejectedQuantity
											)}
									>
										<FontAwsomeIcon className="fa fa-check-circle" />
										Recieve Rejected Shipment
									</Custombutton>
								</React.Fragment>
							) : (
								undefined
							)}
							{data.values.status === 'Rejected Item Received' ||
							data.values.status === 'Receive Approved' ? (
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

	funToPrint() {
		return <div ref={(el) => (this.componentRef = el)}>"helolsofhsjf "</div>;
	}

	render() {
		return (
			<PageBlock>
				<AcceptOrderModal
					isOpen={this.state.acceptOrderModal}
					onClose={this.onCloseAcceptOrderModal}
					selectedRecord={this.state.selectedRecord}
				/>
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
														<SelectSpan>Accepted Quantity</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Rejected Quantity</SelectSpan>
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

export default connect(mapStateToProps, {
	getVariables,
	executeFuntion
})(ProductMovementRecord);
