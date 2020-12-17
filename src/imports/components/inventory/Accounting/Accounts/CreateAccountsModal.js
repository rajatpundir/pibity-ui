import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { cloneDeep } from 'lodash';
import { createVariable, getVariables } from '../../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../../../main/Notification';
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
	SelectWrapper,
	ModalCloseButton,
	TextAreaInput
} from '../../../../styles/main/Modal';

class CreateAccountModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			account: new Map([
				[ 'typeName', 'Account' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'code', '' ],
						[ 'balance', 0 ],
						[ 'openingBalance', 0 ],
						[ 'status', '' ],
						[ 'accountCategory', '' ],
						[ 'description', '' ],
						[ 'accountType', '' ]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCreateAccount = this.onCreateAccount.bind(this);
	}
	componentDidMount() {
		console.log('opened');
	}

	onChange(e) {
		const account = cloneDeep(this.state.account);
		const values = account.get('values');
		values.set(e.target.name, e.target.value);
		account.set('values', values);
		this.setState({ account: account });
	}

	onClose() {
		const account = new Map([
			[ 'typeName', 'Account' ],
			[ 'variableName', '' ],
			[
				'values',
				new Map([
					[ 'name', '' ],
					[ 'code', '' ],
					[ 'balance', 0 ],
					[ 'openingBalance', 0 ],
					[ 'status', '' ],
					[ 'accountCategory', '' ],
					[ 'description', '' ],
					[ 'accountType', '' ]
				])
			]
		]);
		this.setState({account:account});
		this.props.onClose();
	}

	onCreateAccount() {
		console.log(this.state.account);
		this.props.createVariable(this.state.account).then((status) => {
			if (status === 200) {
				successMessage('Account Added Succesfully');
			}
		});
		this.props.getVariables('Account');
		this.onClose();
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create Account"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Add Account</ModalTitle>
					<ModalHeaderCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						<span>X</span>
					</ModalHeaderCloseButton>
				</ModalHeader>
				<ModalBody>
					<InputFieldContainer>
						<InputRowWrapper display="flex" justifyContent="center">
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.account.get('values').get('accountCategory'),
											label: this.state.account.get('values').get('accountCategory')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'accountCategory', value: option.value } });
										}}
										options={
											this.props.variables.AccountCategory !== undefined ? (
												this.props.variables.AccountCategory.map((variable) => {
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
									Accoutn Category
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.account.get('values').get('accountType'),
											label: this.state.account.get('values').get('accountType')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'accountType', value: option.value } });
										}}
										options={
											this.props.variables.AccountType !== undefined ? this.state.account
												.get('values')
												.get('accountCategory') !== '' ? (
												this.props.variables.AccountType
													.filter(
														(type) =>
															type.values.category ===
															this.state.account.get('values').get('accountCategory')
													)
													.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.variableName
														};
													})
											) : (
												[]
											) : (
												[]
											)
										}
									/>
								</SelectWrapper>
								<InputLabel>
									Accoutn Type
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="name"
									type="text"
									placeholder=""
									value={this.state.account.get('values').get('name')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>
								<InputLabel>
									Name
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="code"
									type="text"
									placeholder=""
									value={this.state.account.get('values').get('code')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>
								<InputLabel>
									Code
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<TextAreaInput
									name="description"
									type="text"
									placeholder=""
									value={this.state.account.get('values').get('description')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>
								<InputLabel>Description</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="openingBalance"
									type="text"
									placeholder=""
									value={this.state.account.get('values').get('openingBalance')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>
								<InputLabel>
									Opening Balance
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.account.get('values').get('status'),
											label: this.state.account.get('values').get('status')
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'status', value: option.value } });
										}}
										options={
											this.props.variables.AccountStatus !== undefined ? (
												this.props.variables.AccountStatus.map((variable) => {
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
									Accoutn Status
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.onCreateAccount();
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

export default connect(mapStateToProps, { createVariable, getVariables })(CreateAccountModal);
