import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { executePaymentInvoiceFuntion, updatePurchaseInvoice } from '../../../../../redux/actions/executeFuntion';
import { getVariables } from '../../../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../../../../main/Notification';
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
} from '../../../../../styles/main/Modal';

class RecievePaymentModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			amount: '',
			paymentMode: '',
			makePayment: true,
			paymentReferenceId: '',
			invoiceAccount: {
				values: {
					name: ''
				}
			}
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onClearDues = this.onClearDues.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Account');
		this.props.getVariables('SalesInvoice');
		this.props.getVariables('PaymentMode');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			invoiceAccount:
				nextProps.variables !== undefined
					? nextProps.variables.Account !== undefined
						? nextProps.variables.Account.filter(
								(account) => account.variableName === nextProps.invoice.values.account
							)[0]
						: {}
					: {}
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

	checkRequiredField(variable) {
		console.log(variable);
		console.log(this.props.invoice.values.balanceDue);
		if (variable.paymentReferenceId === '') {
			customErrorMessage('PaymentReferenceId  is missing');
			this.setState({ makePayment: false });
		}
		if (variable.paymentMode === '') {
			customErrorMessage('PaymentMode  is missing');
			this.setState({ makePayment: false });
		}
		if (variable.amount > this.props.invoice.values.balanceDue) {
			customErrorMessage('amount  is grater than BalanceDue');
			this.setState({ makePayment: false });
		}
	}

	onClearDues() {
		const args = {
			amount: this.state.amount,
			invoice: this.props.invoice.variableName,
			voucher: 'Sales',
			account: this.props.account.variableName,
			refAccount:this.props.invoice.values.account,
			paymentReferenceId: this.state.paymentReferenceId,
			paymentMode: this.state.paymentMode
		};

		new Promise((resolve) => {
			resolve(this.checkRequiredField(args));
		}).then(() => {
			if (this.state.makePayment) {
				this.props.executePaymentInvoiceFuntion(args, 'createSalesAccountTransaction').then((data) => {
					if (data.status === 200) {
						const request = {
							orgId: localStorage.getItem('selectedOrganization'),
							typeName: 'SalesInvoice',
							variableName: this.props.invoice.variableName,
							values: {
								transactions: {
									add: [ data.transaction.variableName ]
								}
							}
						};
						this.props.updatePurchaseInvoice(request).then((status) => {
							successMessage('Transaction Compleated Successfully');
						});
						this.props.getVariables('SalesInvoice');
						this.setState({
							amount: '',
							paymentMode: '',
							makePayment: true,
							paymentReferenceId: '',
							invoiceAccount: {
								values: {
									name: ''
								}
							}
						});
						this.onClose();
					}
				});
			}
			this.setState({ makePayment: true });
		});
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
					<ModalTitle>Recieve Payment</ModalTitle>
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
									value="Purchase"
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
								<Input
									name="toAccount"
									type="text"
									placeholder=""
									value={this.state.invoiceAccount.values.name}
									minWidth="300px"
									disabled
								/>{' '}
								<InputLabel>
									To Account
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="fromAccount"
									type="text"
									placeholder=""
									value={this.props.account.values.name}
									minWidth="300px"
									disabled
								/>{' '}
								<InputLabel>
									From Account
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
})(RecievePaymentModal);
