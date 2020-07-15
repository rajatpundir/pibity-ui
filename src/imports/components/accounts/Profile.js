import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { clearErrors } from '../../redux/actions/errors';
import { removeUser, resetUserPassword, updateUserProfile } from '../../redux/actions/users';
import { getProfile } from '../../redux/actions/profile';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
	Container,
	Input,
	Table,
	TableBody,
	Title,
	Error,
	Form,
	Button,
	Data,
	Row,
	ActionContainer
} from '../../styles/accounts/Profile';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// properties for updating user profile
			firstName: '',
			lastName: '',
			contact: '',
			password: '',
			confirmPassword: '',
			editUserModalIsOpen: false,
			resetUserPassModalIsOpen: false,
			operationInProgress: false
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
		this.props.getProfile(this.props.username).then(() => {
			this.setUserData();
		});
	}

	setUserData() {
		const { firstName, lastName, contact } = this.props.profile.profile;
		this.setState({
			firstName,
			lastName,
			contact
		});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	toggleEditUserModal() {
		this.setState({
			editUserModalIsOpen: !this.state.editUserModalIsOpen
		});
	}

	// toggle modal for resetting user password
	toggleResetUserPassModal() {
		this.setState({
			password: '',
			confirmPassword: '',
			resetUserPassModalIsOpen: !this.state.resetUserPassModalIsOpen
		});
	}

	// reset password
	resetPassword(e) {
		e.preventDefault();
		this.setState({ operationInProgress: true });
		this.props
			.resetUserPassword(this.props.username, this.state.password, this.state.confirmPassword)
			.then((status) => {
				if (status) {
					this.toggleResetUserPassModal();
				}
				this.setState({ operationInProgress: false });
			});
	}

	//Update profile Data
	updateUserProfile(e) {
		e.preventDefault();
		this.setState({ operationInProgress: true });
		this.props
			.updateUserProfile(this.props.username, this.state.firstName, this.state.lastName, this.state.contact)
			.then((status) => {
				if (status) {
					this.setState({ editUserModalIsOpen: false });
				}
				this.setState({ operationInProgress: false });
			});
	}

	render() {
		return (
			<Container>
				<Title>User Info</Title>
				<Table>
					<TableBody>
						<Row>
							<Data>User Name</Data>
							<Data> {this.props.username}</Data>
						</Row>
						<Row>
							<Data>First Name</Data>
							<Data>{this.state.firstName}</Data>
						</Row>
						<Row>
							<Data>Last Name</Data>
							<Data>{this.state.lastName}</Data>
						</Row>
						<Row>
							<Data>Contact</Data>
							<Data>{this.state.contact}</Data>
						</Row>
					</TableBody>
				</Table>
				<div>
					<Button onClick={this.toggleEditUserModal.bind(this)}>Edit Info</Button>
					<Button onClick={this.toggleResetUserPassModal.bind(this)}>Reset Password</Button>
				</div>

				{/* Modal for Resetting User Password */}
				<Modal
					isOpen={this.state.resetUserPassModalIsOpen}
					contentLabel="Reset User Password"
					onAfterOpen={() => this.refs.password.focus()}
					onRequestClose={this.toggleResetUserPassModal.bind(this)}
					className="boxed-view__box"
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<Title>Reset User Password</Title>
					<Form onSubmit={this.resetPassword.bind(this)}>
						{this.props.errors.password ? <Error>{this.props.errors.password}</Error> : undefined}
						<Input
							name="password"
							type="password"
							ref="password"
							minLength="8"
							placeholder="New Password"
							value={this.state.password}
							onChange={this.onChange}
							required
						/>
						{this.state.confirmPassword !== '' ? this.state.password !== this.state.confirmPassword ? (
							<Error>Password does not match</Error>
						) : (
							undefined
						) : (
							undefined
						)}
						<Input
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							value={this.state.confirmPassword}
							onChange={this.onChange}
							minLength="8"
							required
						/>
						{this.state.password !== this.state.confirmPassword ? (
							undefined
						) : (
							<ActionContainer>
								<Button type="submit">Reset</Button>
								{this.state.operationInProgress ? <CircularProgress /> : undefined}
							</ActionContainer>
						)}
					</Form>
				</Modal>
				{/* Modal for Editing User Information */}
				<Modal
					isOpen={this.state.editUserModalIsOpen}
					contentLabel="Edit User"
					onAfterOpen={() => {
						this.refs.firstName.focus();
					}}
					onRequestClose={this.toggleEditUserModal.bind(this)}
					className="boxed-view__box"
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<Title>Edit User Profile</Title>
					<Form onSubmit={this.updateUserProfile.bind(this)}>
						{this.props.errors.firstName ? <Error>{this.props.errors.firstName}</Error> : undefined}
						<Input
							name="firstName"
							type="text"
							ref="firstName"
							placeholder="First Name"
							value={this.state.firstName}
							onChange={this.onChange}
						/>
						{this.props.errors.lastName ? <Error>{this.props.errors.lastName}</Error> : undefined}
						<Input
							name="lastName"
							type="text"
							ref="lastName"
							placeholder="Last Name"
							value={this.state.lastName}
							onChange={this.onChange}
						/>
						{this.props.errors.contact ? <Error>{this.props.errors.contact}</Error> : undefined}
						<Input
							name="contact"
							type="tel"
							pattern="[0-9]{10}"
							ref="contact"
							placeholder="Contact"
							value={this.state.contact}
							onChange={this.onChange}
						/>
						{this.state.contact.length !== 0 ? this.state.contact.length === 10 ? (
							<ActionContainer>
								<Button type="submit">Update</Button>
								{this.state.operationInProgress ? <CircularProgress /> : undefined}
							</ActionContainer>
						) : (
							<Error>Invalid phone number</Error>
						) : (
							undefined
						)}
					</Form>
				</Modal>
			</Container>
		);
	}
}

Profile.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getProfile: PropTypes.func.isRequired,
	resetUserPassword: PropTypes.func.isRequired,
	updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	username: state.auth.token.username,
	profile: state.profile
});

export default connect(mapStateToProps, {
	clearErrors,
	getProfile,
	removeUser,
	resetUserPassword,
	updateUserProfile
})(Profile);
