import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { executeFuntion, updatePurchaseInvoice } from '../../../../redux/actions/executeFuntion';
import { getVariables } from '../../../../redux/actions/variables';
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
} from '../../../../styles/main/Modal';

class ClearDuesModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			amount: '',
			invoiceAccount: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onClearDues = this.onClearDues.bind(this);
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
		this.setState({ [e.target.name]: e.target.value });
	}

	onClose() {
		this.props.onClose();
	}

	onClearDues() {
		const args = {
			amount: this.state.amount,
			invoice: this.props.invoice.variableName,
			voucher: 'Sales',
			account: this.props.account.variableName,
			date: '2020-12-04'
		};
		this.props.executeFuntion(args, 'createAccountTransaction').then((data) => {
			if(data.status ===200){
				console.log(data.transaction)
				const request = {
					orgId: localStorage.getItem('selectedOrganization'),
					typeName: 'PurchaseInvoice',
					variableName: this.props.invoice.variableName,
					values: {
						transactions: {
							add: [ data.transaction.variableName ]
						}
					}
				};
				this.props.updatePurchaseInvoice(request)
				this.props.getVariables('PurchaseInvoice');
				this.onClose();
			}
			
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
					<ModalTitle>Clear Dues {this.props.typeName}</ModalTitle>
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
								<Input
									name="fromAccount"
									type="text"
									placeholder=""
									value={this.state.invoiceAccount.values.name}
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
									name="toAccount"
									type="text"
									placeholder=""
									value={this.props.account.values.name}
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
									name="amountdue"
									type="Decimal"
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
									type="Decimal"
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
	executeFuntion,
	getVariables,
	updatePurchaseInvoice
})(ClearDuesModal);