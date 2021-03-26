import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
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
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton,
	ModalCloseButton
} from '../../../styles/main/Modal';

class ContactModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			contact: new Map([
				[ 'typeName', props.typeName ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'comment', '' ],
						[ 'email', '' ],
						[ 'fax', '' ],
						[ 'jobTitle', '' ],
						[ 'mobile', '' ],
						[ 'name', '' ],
						[ 'phone', '' ],
						[ 'website', '' ],
						[ 'isDefault', false ]
					])
				]
			]),
			createContact: true
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.createContact = this.createContact.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
	}

	onChange(e) {
		const contact = cloneDeep(this.state.contact);
		const values = contact.get('values');
		values.set(e.target.name, e.target.value);
		contact.set('values', values);
		this.setState({ contact });
	}

	onClose() {
		this.setState({
			contact: new Map([
				[ 'typeName', '' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'comment', '' ],
						[ 'email', '' ],
						[ 'fax', '' ],
						[ 'jobTitle', '' ],
						[ 'mobile', '' ],
						[ 'name', '' ],
						[ 'phone', '' ],
						[ 'website', '' ],
						[ 'isDefault', false ]
					])
				]
			]),
			createContact: true
		});
		this.props.onClose();
	}

	checkRequiredField(values) {
		if (values.get('name') === '') {
			customErrorMessage('name  is missing');
			this.setState({ createContact: false });
		}
		if (values.get('email') === '') {
			customErrorMessage('email  is missing');
			this.setState({ createContact: false });
		}
		if (values.get('phone') === '') {
			customErrorMessage('phone  is missing');
			this.setState({ createContact: false });
		}
	}

	createContact() {
		const addtype = new Promise((resolve) => {
			const contact = cloneDeep(this.state.contact);
			const values = contact.get('values');
			if (this.props.supplier) {
				values.set('supplier', this.props.supplier);
			}
			if (this.props.customer) {
				values.set('customer', this.props.customer);
			}
			contact.set('typeName', this.props.typeName);
			contact.set('values', values);

			resolve(this.setState({ contact }));
		});

		const checkFeilds = new Promise((resolve) => {
			resolve(this.checkRequiredField(this.state.contact.get('values')));
		});

		Promise.all([ addtype, checkFeilds ]).then(() => {
			if (this.state.createContact) {
				this.props.createVariable(this.state.contact).then((response) => {
					if (response.status === 200) {
						new Promise((resolve) => {
							resolve(this.props.getVariables(this.props.typeName));
						}).then(() => {
							successMessage('Contact Added');
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
				contentLabel="Add Contact"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Add New Contact</ModalTitle>
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
									value={this.state.contact.get('values').get('name')}
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
									name="phone"
									type="number"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('phone')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>
									Phone
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="mobile"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('mobile')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Mobile</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="jobTitle"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('jobTitle')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Job Title</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="fax"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('fax')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Fax</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="email"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('email')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>
									Email <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="website"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('website')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Website</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="comment"
									type="text"
									placeholder=""
									minWidth="300px"
									value={this.state.contact.get('values').get('comment')}
									onChange={(e) => {
										this.onChange(e);
									}}
								/>{' '}
								<InputLabel>Comment</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.createContact();
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
})(ContactModal);
