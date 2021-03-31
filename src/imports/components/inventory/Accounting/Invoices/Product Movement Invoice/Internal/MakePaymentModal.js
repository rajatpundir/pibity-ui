import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { executePaymentInvoiceFuntion, updatePurchaseInvoice } from '../../../../../../redux/actions/executeFuntion';
import { getVariables } from '../../../../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../../../../../main/Notification';
import {
	InputRowWrapper,
	InputFieldContainer,
	InputLabel,
	Input,
	Required,
	FormControl,
	SelectWrapper,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton,
	ModalCloseButton
} from '../../../../../../styles/main/Modal';

class MakePaymentModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			amount: '',
			paymentMode: '',
			paymentReferenceId: '',
			fromAccount: {
				values: {
					name: ''
				}
			},
			toAccount: {
				values: {
					name: ''
				}
			}
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onClearDues = this.onClearDues.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Account');
		this.props.getVariables('PaymentMode');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState
		};
	}

	onChange(e) {
		if (e.target.name === 'amount') {
			if (e.target.value <= this.props.invoice.values.balanceDue) {
				this.setState({ [e.target.name]: e.target.value });
			}
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	onClose() {
		this.props.onClose();
	}

	onClearDues() {
		const args = {
			amount: this.state.amount,
			invoice: this.props.invoice.variableName,
			voucher: 'InternalProductMovement',
			account: this.state.toAccount.variableName,
			refAccount: this.state.fromAccount.variableName,
			paymentReferenceId: this.state.paymentReferenceId,
			paymentMode: this.state.paymentMode
		};
		if (this.state.amount <= this.props.invoice.values.balanceDue) {
			this.props
				.executePaymentInvoiceFuntion(args, 'clearInternalProductMovementOrderInvoicePayment')
				.then((data) => {
					if (data.status === 200) {
						successMessage('Transaction Compleated Successfully');
						this.props.getVariables('ProductMovementOrderInvoice');
						this.props.getVariables('AccountTransaction');
						this.onClose();
					}
				});
		} else {
			customErrorMessage('amount is grater than Balnce Due');
		}
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="clear Dues"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Clear Dues </ModalTitle>
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
									name="invoiceNumber"
									type="text"
									placeholder=""
									value={this.props.invoice.values.invoiceNumber}
									minWidth="300px"
									disabled
								/>{' '}
								<InputLabel>
									Invoice Number
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="voucherType"
									type="text"
									placeholder=""
									value="Sales"
									minWidth="300px"
									disabled
								/>{' '}
								<InputLabel>
									Voucher Type
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.paymentMode,
											label: this.state.paymentMode
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'paymentMode', value: option.value } });
										}}
										options={
											this.props.variables.PaymentMode !== undefined ? (
												this.props.variables.PaymentMode.map((variable) => {
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
								<InputLabel>
									Payment Mode
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="paymentReferenceId"
									type="text"
									placeholder=""
									value={this.state.paymentReferenceId}
									minWidth="300px"
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Payment Mode Reference Id</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.fromAccount.values.name,
											label: this.state.fromAccount.values.name
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'fromAccount', value: option.data } });
										}}
										options={
											this.props.variables.Account !== undefined ? (
												this.props.variables.Account.map((variable) => {
													return {
														value: variable.values.name,
														label: variable.values.name,
														data: variable
													};
												})
											) : (
												[]
											)
										}
									/>
								</SelectWrapper>
								<InputLabel>
									From Account
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.toAccount.values.name,
											label: this.state.toAccount.values.name
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'toAccount', value: option.data } });
										}}
										options={
											this.props.variables.Account !== undefined ? (
												this.props.variables.Account.map((variable) => {
													return {
														value: variable.values.name,
														label: variable.values.name,
														data: variable
													};
												})
											) : (
												[]
											)
										}
									/>
								</SelectWrapper>
								<InputLabel>
									To Account
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="amountdue"
									type="number"
									placeholder=""
									value={this.props.invoice.values.balanceDue}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Due Amount
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="amount"
									type="number"
									placeholder=""
									value={this.state.amount}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Amount
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.onClearDues();
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
	executePaymentInvoiceFuntion,
	getVariables,
	updatePurchaseInvoice
})(MakePaymentModal);
