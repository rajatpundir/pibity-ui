import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { cloneDeep } from 'lodash';
import { getVariables, createVariable } from '../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../Notification';
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
} from '../../../styles/main/Modal';

class AddressModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			address: new Map([
				[ 'typeName', props.typeName ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'name', '' ],
						[ 'line1', '' ],
						[ 'line2', '' ],
						[ 'city', '' ],
						[ 'state', '' ],
						[ 'postCode', '' ],
						[ 'country', '' ],
						[ 'addressType', '' ],
						[ 'isDefault', false ]
					])
				]
			]),
			area: [],
			createAddress: true
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.createAddress = this.createAddress.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Country');
		this.props.getVariables('States');
		this.props.getVariables('PinCode');
		this.props.getVariables('Area');
		this.props.getVariables('AddressType');
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return {
	// 		...prevState,
	
	// 	};
	// }

	onChange(e) {
		const address = cloneDeep(this.state.address);
		const values = address.get('values');
		values.set(e.target.name, e.target.value);
		if (e.target.name === 'postCode') {
			const area = e.target.data.area;
			if (area.length === 1) {
				values.set('city', area[0].variableName);
			}
			this.setState({ area: area });
		}
		address.set('values', values);
		this.setState({ address });
	}

	onClose() {
		this.props.onClose();
	}

	checkRequiredField(values) {
		if (values.get('name') === '') {
			customErrorMessage('name  is missing');
			this.setState({ createAddress: false });
		}
		if (values.get('city') === '') {
			customErrorMessage('city  is missing');
			this.setState({ createAddress: false });
		}
		if (values.get('state') === '') {
			customErrorMessage('state  is missing');
			this.setState({ createAddress: false });
		}
		if (values.get('country') === '') {
			customErrorMessage('country  is missing');
			this.setState({ createAddress: false });
		}
		if (values.get('addressType') === '') {
			customErrorMessage('addressType  is missing');
			this.setState({ createAddress: false });
		}
		if (values.get('postCode') === '') {
			customErrorMessage('postCode  is missing');
			this.setState({ createAddress: false });
		}
	}

	createAddress() {
		const addtype = new Promise((resolve) => {
			const address = cloneDeep(this.state.address);
			const values = address.get('values');
			if (this.props.supplier) {
				values.set('supplier', this.props.supplier);
			}
			if (this.props.customer) {
				values.set('customer', this.props.customer);
			}
			address.set('typeName', this.props.typeName);
			address.set('values', values);

			resolve(this.setState({ address }));
		});

		const checkFeilds = new Promise((resolve) => {
			resolve(this.checkRequiredField(this.state.address.get('values')));
		});

		Promise.all([ addtype, checkFeilds ]).then(() => {
			if (this.state.createAddress) {
				this.props.createVariable(this.state.address).then((response) => {
					if (response.status === 200) {
						new Promise((resolve) => {
							resolve(this.props.getVariables(this.props.typeName));
						}).then(() => {
                            successMessage("Address Added")
                            this.props.getVariables(this.props.typeName)
							this.setState({
								address: new Map([
									[ 'typeName', '' ],
									[ 'variableName', '' ],
									[
										'values',
										new Map([
											[ 'name', '' ],
											[ 'line1', '' ],
											[ 'line2', '' ],
											[ 'city', '' ],
											[ 'state', '' ],
											[ 'postCode', '' ],
											[ 'country', '' ],
											[ 'addressType', '' ],
											[ 'isDefault', false ]
										])
									]
								]),
								createAddress: true
							});
							this.onClose();
						});
					}
				});
			}
		});
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="Add Address"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Add New Address</ModalTitle>
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
									name="name"
									type="text"
									placeholder=""
									value={this.state.address.get('values').get('name')}
									minWidth="300px"
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>
									Name
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="line1"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.address.get('values').get('line1')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>
									Line 1
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="line2"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.address.get('values').get('line2')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>
									Line 2
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.address.get('values').get('country'),
											label: this.state.address.get('values').get('country')
										}}
										onChange={(option) => {
											this.onChange(
												{ target: { name: 'country', value: option.value } },
												this.state.address.get('variableName')
											);
										}}
										options={
											this.props.variables.Country !== undefined ? (
												this.props.variables.Country.map((variable) => {
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
									Country
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.address.get('values').get('state'),
											label: this.state.address.get('values').get('state')
										}}
										onChange={(option) => {
											this.onChange(
												{ target: { name: 'state', value: option.value } },
												this.state.address.get('variableName')
											);
										}}
										options={
											this.props.variables.States !== undefined ? this.state.address
												.get('values')
												.get('country') !== '' ? (
												this.props.variables.States
													.filter(
														(state) =>
															state.values.country ===
															this.state.address.get('values').get('country')
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
								<InputLabel>State</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.address.get('values').get('postCode'),
											label: this.state.address.get('values').get('postCode')
										}}
										onChange={(option) => {
											this.onChange(
												{
													target: { name: 'postCode', value: option.value, data: option.data }
												},
												this.state.address.get('variableName')
											);
										}}
										options={
											this.props.variables.PinCode !== undefined ? this.state.address
												.get('values')
												.get('state') !== '' ? (
												this.props.variables.PinCode
													.filter(
														(pincode) =>
															pincode.values.state ===
															this.state.address.get('values').get('state')
													)
													.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.variableName,
															data: variable.values
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
									PostCode <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.address.get('values').get('city'),
											label: this.state.address.get('values').get('city')
										}}
										onChange={(option) => {
											this.onChange(
												{ target: { name: 'city', value: option.value } },
												this.state.address.get('variableName')
											);
										}}
										options={this.state.area}
									/>
								</SelectWrapper>
								<InputLabel>
									City
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.address.get('values').get('addressType'),
											label: this.state.address.get('values').get('addressType')
										}}
										onChange={(option) => {
											this.onChange(
												{ target: { name: 'addressType', value: option.value } },
												this.state.address.get('variableName')
											);
										}}
										options={
											this.props.variables.AddressType !== undefined ? (
												this.props.variables.AddressType.map((variable) => {
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
									Address Type
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.createAddress();
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
	getVariables,
	createVariable
})(AddressModal);
