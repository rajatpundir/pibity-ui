import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'rsuite';
import { cloneDeep } from 'lodash';
import Modal from 'react-modal';
import {
	Container,
	Input,
	Table,
	TableBody,
	TableHeader,
	Title,
	Error,
	Form,
	ActionContainer,
	Button,
	Data,
	Row,
	StatusSwitch
} from '../../styles/accounts/Users';
import CircularProgress from '@material-ui/core/CircularProgress';
import { clearErrors } from '../../redux/actions/errors';
import {
	getUsers,
	createUser,
	removeUser,
	resetUserPassword,
	updateUserStatus,
	updateUserPermissions,
	updateUserProfile
} from '../../redux/actions/users';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// properties for creating user
			username: '',
			password: '',
			confirmPassword: '',
			// properties for updating user profile
			firstName: '',
			lastName: '',
			contact: '',
			// properties of selected user
			selectedUser: {
				username: '',
				userType: 1,
				isActive: true,
				profile: {
					firstName: '',
					lastName: '',
					contact: ''
				},
				userPermissions: []
			},
			// properties for visibility of modals
			createUserModalIsOpen: false,
			showUserModalIsOpen: false,
			editUserModalIsOpen: false,
			resetUserPassModalIsOpen: false,
			operationInProgress: false
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	// clear form errors and get populate list if users
	componentDidMount() {
		this.props.clearErrors();
		this.props.getUsers();
	}

	// Load selected user into component's state
	selectUser(user) {
		let temp = this.state.selectedUser;
		temp.username = user.username;
		temp.isActive = user.isActive;
		temp.userType = user.userType;
		temp.profile.firstName = user.profile.firstName;
		temp.profile.lastName = user.profile.lastName;
		temp.profile.contact = user.profile.contact;
		temp.userPermissions = user.userPermissions.slice(0);
		this.setState({ selectedUser: temp });
		this.setState({
			firstName: this.state.selectedUser.profile.firstName,
			lastName: this.state.selectedUser.profile.lastName,
			contact: this.state.selectedUser.profile.contact,
			showUserModalIsOpen: true
		});
	}

	// toggle modal for creating user
	toggleCreateUserModal() {
		this.props.clearErrors();
		this.setState({
			username: '',
			password: '',
			confirmPassword: '',
			createUserModalIsOpen: !this.state.createUserModalIsOpen,
			operationInProgress: false
		});
	}

	// create user with (username, password) present in state
	createUser(e) {
		e.preventDefault();
		this.setState({ operationInProgress: true });
		this.props.createUser(this.state.username, this.state.password, this.state.confirmPassword).then((status) => {
			if (status) {
				this.toggleCreateUserModal();
			}
			this.setState({ operationInProgress: false });
		});
	}

	// remove user
	removeUser() {
		this.props.removeUser(this.state.selectedUser.username);
		this.toggleShowUserModal();
	}

	// reset password
	resetPassword(e) {
		e.preventDefault();
		this.setState({ operationInProgress: true });
		this.props
			.resetUserPassword(this.state.selectedUser.username, this.state.password, this.state.confirmPassword)
			.then((status) => {
				if (status) {
					this.toggleResetUserPassModal();
				}
				this.setState({ operationInProgress: false });
			});
	}

	// toggle modal for showing user information
	toggleShowUserModal() {
		this.setState({
			showUserModalIsOpen: !this.state.showUserModalIsOpen
		});
	}

	// toggle modal for editing user information
	toggleEditUserModal() {
		this.toggleShowUserModal();
		this.setState({
			editUserModalIsOpen: !this.state.editUserModalIsOpen,
			operationInProgress: false
		});
	}

	// toggle modal for resetting user password
	toggleResetUserPassModal() {
		this.toggleShowUserModal();
		this.setState({
			password: '',
			confirmPassword: '',
			resetUserPassModalIsOpen: !this.state.resetUserPassModalIsOpen,
			operationInProgress: false
		});
	}

	// update user status
	updateUserStatus(event) {
		event.preventDefault();
		let selectedUserTemp = cloneDeep(this.state.selectedUser);
		selectedUserTemp.isActive = event.target.value;
		this.setState({ selectedUser: selectedUserTemp });
		this.props.updateUserStatus(this.state.selectedUser.username, event.target.value);
	}

	// update user permissions
	updateUserPermissions(event, moduleName) {
		event.preventDefault();
		this.props.updateUserPermissions(this.state.selectedUser.username, moduleName, event.target.value);
	}

	// update user profile
	updateUserProfile() {
		this.props.updateUserProfile(
			this.state.selectedUser.username,
			this.state.firstName,
			this.state.lastName,
			this.state.contact
		);
		this.setState({ showUserModalIsOpen: false, editUserModalIsOpen: false });
	}

	renderModules() {
		return (
			<Table>
				<TableBody>
					{this.state.selectedUser.userPermissions
						.filter((userPermission) => userPermission.organizationPermission.isActive)
						.map((userPermission) => {
							return (
								<Row key={userPermission.organizationPermission.module.name}>
									<Data fontWeight="600">{userPermission.organizationPermission.module.name}</Data>
									<Data>
										<select
											defaultValue={userPermission.permissionLevel.toString()}
											onChange={(e) => {
												this.updateUserPermissions(
													e,
													userPermission.organizationPermission.module.name
												);
											}}
										>
											<option value="0">No Access</option>
											<option value="1">Read Only</option>
											<option value="2">Read & Write</option>
										</select>
									</Data>
								</Row>
							);
						})}
				</TableBody>
			</Table>
		);
	}

	render() {
		return (
			<Container>
				<Button onClick={this.toggleCreateUserModal.bind(this)}>Add User</Button>
				<Table>
					<TableHeader>
						<Row>
							<Data>Email</Data>
							<Data>Name</Data>
						</Row>
					</TableHeader>
					<TableBody>
						{this.props.users
							.sort((a, b) => {
								return a.username > b.username ? 1 : b.username > a.username ? -1 : 0;
							})
							.map((user) => {
								return (
									<Row key={user.username}>
										<Data justifyContent="unset">
											{user.username}
											<div>
												{user.userType === 0 ? (
													<Icon
														title="Admin"
														style={{ paddingLeft: '10px' }}
														icon="user-circle"
													/>
												) : null}
											</div>
										</Data>
										<Data>
											<div>{user.profile.firstName + ' ' + user.profile.lastName} </div>
											<Icon
												title="Edit"
												style={{ paddingLeft: '10px' }}
												icon="edit2"
												onClick={this.selectUser.bind(this, user)}
											/>
										</Data>
									</Row>
								);
							})}
					</TableBody>
				</Table>

				{/* Modal for Creating User */}
				<Modal
					isOpen={this.state.createUserModalIsOpen}
					contentLabel="Add User"
					onAfterOpen={() => this.refs.username.focus()}
					onRequestClose={this.toggleCreateUserModal.bind(this)}
					className="boxed-view__box"
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<Title>Add User</Title>
					<Form onSubmit={this.createUser.bind(this)}>
						{this.props.errors.username ? <Error>{this.props.errors.username}</Error> : undefined}
						<Input
							name="username"
							type="text"
							ref="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.onChange}
						/>

						{this.props.errors.password ? <Error>{this.props.errors.password}</Error> : undefined}
						<Input
							name="password"
							type="password"
							ref="password"
							minLength="8"
							placeholder="New Password"
							value={this.state.password}
							onChange={this.onChange}
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
								<Button type="submit">Create</Button>
								{this.state.operationInProgress ? <CircularProgress /> : undefined}
							</ActionContainer>
						)}
					</Form>
				</Modal>

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
							placeholder="Confirm New Password"
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

				{/* Modal for Showing User Information */}
				<Modal
					isOpen={this.state.showUserModalIsOpen}
					contentLabel="User Profile"
					onRequestClose={this.toggleShowUserModal.bind(this)}
					className="boxed-view__box"
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<Title>User Info</Title>
					<Table>
						<TableBody>
							<Row>
								{this.state.selectedUser.userType ? (
									<td>
										Inactive
										<StatusSwitch
											name="status"
											checked={String(this.state.selectedUser.isActive) === 'true'}
											onChange={(e) => {
												switch (e.target.name) {
													default:
														e.target.value = e.target.checked;
														this.updateUserStatus(e);
														break;
												}
											}}
										/>
										Active
									</td>
								) : null}
							</Row>
							<Row>
								<Data fontWeight="600"> First Name</Data>
								<Data>{this.state.selectedUser.profile.firstName}</Data>
							</Row>
							<Row>
								<Data fontWeight="600">Last Name</Data>
								<Data>{this.state.selectedUser.profile.lastName}</Data>
							</Row>
							<Row>
								<Data fontWeight="600">Contact</Data>
								<Data>{this.state.selectedUser.profile.contact}</Data>
							</Row>
						</TableBody>
					</Table>
					<br />
					{this.state.selectedUser.userType ? <Title>Modules</Title> : null}
					{this.state.selectedUser.userType ? this.renderModules() : null}
					<br />
					<ActionContainer>
						<Button onClick={this.toggleEditUserModal.bind(this)}>Edit Info</Button>
						<Button onClick={this.toggleResetUserPassModal.bind(this)}>Reset Password</Button>
					</ActionContainer>
					{/* Button to delete user */}
					{/* {this.state.selectedUser.userType ? (
						<Button onClick={this.removeUser.bind(this)}>Delete User</Button>
					) : null} */}
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
							type="number"
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
							<ActionContainer>
								<Button type="submit">Update</Button>
								{this.state.operationInProgress ? <CircularProgress /> : undefined}
							</ActionContainer>
						)}
					</Form>
				</Modal>
			</Container>
		);
	}
}

Users.propTypes = {
	errors: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	getUsers: PropTypes.func.isRequired,
	createUser: PropTypes.func.isRequired,
	removeUser: PropTypes.func.isRequired,
	resetUserPassword: PropTypes.func.isRequired,
	updateUserStatus: PropTypes.func.isRequired,
	updateUserPermissions: PropTypes.func.isRequired,
	updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	users: state.users
});

export default connect(mapStateToProps, {
	clearErrors,
	getUsers,
	createUser,
	removeUser,
	resetUserPassword,
	updateUserStatus,
	updateUserPermissions,
	updateUserProfile
})(Users);
