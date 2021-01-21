import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getVariables } from '../../../../../redux/actions/variables';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import { successMessage, customErrorMessage } from '../../../../main/Notification';
import {
	InputRowWrapper,
	InputFieldContainer,
	InputLabel,
	Input,
	Required,
	FormControl,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton,
	ModalCloseButton
} from '../../../../../styles/main/Modal';

class AcceptOrderModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			acceptedQuantity: 0,
			rejectedQuantity: 0,
			quantity: 0,
			selectedRecord: props.selectedRecord
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.selectedRecord !== prevState.selectedRecord) {
			return {
				...prevState,
				selectedRecord: nextProps.selectedRecord,
				quantity: nextProps.selectedRecord.values.quantity,
				acceptedQuantity: nextProps.selectedRecord.values.quantity
			};
		}
		return prevState;
	}

	onChange(e) {
		if (e.target.value > this.state.quantity) {
			// customErrorMessage('Rejected Quantiy Cannot be greater than quanity');
		} else {
			this.setState({
				rejectedQuantity: e.target.value,
				acceptedQuantity: this.state.quantity - e.target.value
			});
		}
	}

	onClose() {
		this.setState({
			acceptedQuantity: 0,
			rejectedQuantity: 0,
			quantity: 0
		});
		this.props.onClose();
	}

	acceptedQuantity() {
		const update = {
			updateType: 'Received',
			movementType: this.state.selectedRecord.values.movementType,
			quantity: this.state.acceptedQuantity,
			refProductStore: this.state.selectedRecord.values.fromProductStore,
			refInvoice: this.state.selectedRecord.values.productMovementInvoice,
			productStore: this.state.selectedRecord.values.toProductStore
		};
		const args = {
			productMovementRecord: this.state.selectedRecord.variableName
		};
		const createRecordArgs = {
			item: this.state.selectedRecord.variableName,
			acceptedQuantity: this.state.acceptedQuantity,
			rejectedQuantity: this.state.rejectedQuantity
		};
		console.log(this.state);
		console.log(update);
		// //todo
		this.props.executeFuntion(update, 'updateQuantityInProductStore')
		if (this.state.rejectedQuantity > 0) {
			this.props
				.executeFuntion(createRecordArgs, 'approveAndCreateRejectedItemProductMovementRecord')
				.then((response) => {
					if (response.status === 200) {
						this.props.getVariables('InternalProductMovementItemRecord');
						this.props.getVariables('InternalMovementProductLog');
						successMessage('Items Rejected');
					}
				});
		} else {
			this.props
				.executeFuntion(args, 'approveShipmentReceivedAndUpdateProductMovementRecord')
				.then((response) => {
					if (response.status === 200) {
						this.props.getVariables('InternalProductMovementItemRecord');
						this.props.getVariables('InternalMovementProductLog');
						successMessage('Items accepted');
					}
				});
		}
		
		this.onClose();
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create PaymentTerm"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Approve Order Recieved</ModalTitle>
					<ModalHeaderCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						<span>X</span>
					</ModalHeaderCloseButton>
				</ModalHeader>{' '}
				<ModalBody>
					<InputFieldContainer>
						<InputRowWrapper display="flex" justifyContent="center">
							<FormControl>
								<Input
									name="quantity"
									type="Number"
									placeholder=""
									value={this.state.quantity}
									readOnly
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Initial Quantity
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="acceptedQuantity"
									type="Number"
									placeholder=""
									value={this.state.acceptedQuantity}
									readOnly
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Accepted Quantity
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="rejectedQuantity"
									type="Number"
									placeholder=""
									value={this.state.rejectedQuantity}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Rejected Quantity
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.acceptedQuantity();
						}}
					>
						Save
					</ModalSubmitButton>
					<ModalCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						Cancel
					</ModalCloseButton>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {
	executeFuntion,
	getVariables
})(AcceptOrderModal);
