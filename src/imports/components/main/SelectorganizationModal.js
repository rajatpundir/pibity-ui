import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateToken } from '../../redux/actions/auth';
import {
	SelectWrapper,
	InputFieldContainer,
	InputLabel,
	FormControl,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton
} from '../../styles/main/Modal';

class SelectOrganizationModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: props.isOpen,
			organizations: JSON.parse(localStorage.getItem('organizations')) || [],
			selectedOrganization: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onClose() {
		this.props.onClose();
		this.props.updateToken(this.state.selectedOrganization);
	}
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="Select Organization"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Select Organization</ModalTitle>
					<ModalHeaderCloseButton
						onClick={(e) => {
							this.onClose();
						}}
					>
						<span>X</span>
					</ModalHeaderCloseButton>
				</ModalHeader>{' '}
				<ModalBody>
					<InputFieldContainer style={{justifyContent:'center'}}>
						<FormControl >
							<SelectWrapper minWidth="200px">
								<Select
									value={{
										value: this.state.selectedOrganization,
										label: this.state.selectedOrganization
									}}
									onChange={(option) => {
										this.onChange({
											target: { name: 'selectedOrganization', value: option.value }
										});
										localStorage.setItem('selectedOrganization', option.value);
									}}
									options={this.state.organizations.map((variable) => {
										return {
											value: variable,
											label: variable
										};
									})}
								/>
							</SelectWrapper>
							<InputLabel>Organizations</InputLabel>
						</FormControl>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						Save
					</ModalSubmitButton>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, {
	updateToken
})(SelectOrganizationModal);
