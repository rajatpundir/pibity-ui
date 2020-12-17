import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import {
	InputColumnWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarItems,
	FormControl,
	Custombutton
} from '../../../styles/inventory/Style';
import Password from './Password';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class ProfileDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: props.details,
			user: props.user,
			userPasswords: new Map([ [ 'password', '' ], [ 'confirmPassword', '' ] ]),
			userRole: '',
			roleOptions: [ { value: 'USER', label: 'USER' }, { value: 'ADMIN', label: 'ADMIN' } ]
		};
		this.onChange = this.onChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.onUserDetailChange = this.onUserDetailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			detail: nextProps.details,
			user: nextProps.user
		};
	}

	onUserChange(e) {
		const user = cloneDeep(this.state.user);
		user.set(e.target.name, e.target.value);
		this.props.updateUser(user);
	}

	onUserDetailChange(e) {
		const detail = cloneDeep(this.state.detail);
		const values = detail.get('values');
		values.set(e.target.name, e.target.value);
		detail.set('values', values);
		this.props.updateUserDetails(detail);
	}

	onPasswordChange(passwords) {
		this.setState({ userPasswords: passwords });
	}

	submit(e) {
		e.preventDefault();
		if (this.props.params.variableName) {
			this.props.updateUserProfile();
		} else {
			this.props.createUser(this.state.userPasswords, this.state.userRole);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: [ e.target.value ] });
	}

	render() {
		return (
			<PageBlock paddingBottom="0">
				<form onSubmit={this.submit.bind(this)}>
					<PageToolbar>
						<ToolbarItems>
							<LeftItemH1>User Profile Settings</LeftItemH1>
						</ToolbarItems>
						<ToolbarItems>
							{this.props.params.variableName ? (
								<Custombutton height="30px" type="submit">
									Save
								</Custombutton>
							) : (
								<Custombutton height="30px" type="submit">
									Add User
								</Custombutton>
							)}
						</ToolbarItems>
					</PageToolbar>
					<InputBody overflow="visible">
						<InputFieldContainer>
							<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
								<FormControl>
									<Input
										name="firstName"
										type="text"
										placeholder="First Name"
										required
										value={this.state.user.get('firstName')}
										onChange={this.onUserChange}
									/>{' '}
									<InputLabel>
										First Name
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="lastName"
										type="text"
										placeholder="Last Name"
										required
										value={this.state.user.get('lastName')}
										onChange={this.onUserChange}
									/>{' '}
									<InputLabel>
										Last Name
										<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="email"
										type="text"
										placeholder=""
										value={this.state.user.get('email')}
										onChange={this.onUserChange}
									/>{' '}
									<InputLabel>Email</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="address"
										type="text"
										placeholder=""
										value={this.state.detail.get('values').get('address')}
										onChange={this.onUserDetailChange}
									/>{' '}
									<InputLabel>Address</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
								<FormControl>
									<Input
										name="phoneNumber"
										type="number"
										placeholder=""
										value={this.state.detail.get('values').get('phoneNumber')}
										onChange={this.onUserDetailChange}
									/>{' '}
									<InputLabel>Contact Number</InputLabel>
								</FormControl>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.detail.get('values').get('country'),
												label: this.state.detail.get('values').get('country')
											}}
											onChange={(option) => {
												this.onUserDetailChange({
													target: { name: 'country', value: option.value }
												});
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
									<InputLabel>Country</InputLabel>
								</FormControl>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.detail.get('values').get('state'),
												label: this.state.detail.get('values').get('state')
											}}
											onChange={(option) => {
												this.onUserDetailChange({
													target: { name: 'state', value: option.value }
												});
											}}
											options={
												this.props.variables.States !== undefined ? (
													this.props.variables.States.map((variable) => {
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
									<InputLabel>State</InputLabel>
								</FormControl>
								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.detail.get('values').get('pinCode'),
												label: this.state.detail.get('values').get('pinCode')
											}}
											onChange={(option) => {
												this.onUserDetailChange({
													target: { name: 'pinCode', value: option.value }
												});
											}}
											options={
												this.props.variables.PinCode !== undefined ? (
													this.props.variables.PinCode.map((variable) => {
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
									<InputLabel>Pincode</InputLabel>
								</FormControl>
								{this.props.params.variableName ? (
									undefined
								) : (
									<FormControl>
										<SelectWrapper>
											<Select
												value={{
													value: this.state.userRole,
													label: this.state.userRole
												}}
												onChange={(option) => {
													this.onChange({
														target: { name: 'userRole', value: option.value }
													});
												}}
												options={this.state.roleOptions}
											/>
										</SelectWrapper>
										<InputLabel>User Role</InputLabel>
									</FormControl>
								)}
							</InputColumnWrapper>
							{this.props.params.variableName ? (
								undefined
							) : (
								<Password passwords={this.state.userPasswords} updatePassword={this.onPasswordChange} />
							)}
						</InputFieldContainer>
					</InputBody>
				</form>
				{this.props.params.variableName === this.props.auth.userName ? (
					<form onSubmit={this.submit.bind(this)}>
						<PageToolbar borderTop="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Chanege Password</LeftItemH1>
							</ToolbarItems>
							<ToolbarItems>
								<Custombutton height="30px" type="submit">
									Update Password
								</Custombutton>
							</ToolbarItems>
						</PageToolbar>
						<InputBody overflow="visible" borderTop="0">
							<InputFieldContainer>
								<Password passwords={this.state.userPasswords} updatePassword={this.onPasswordChange} />
							</InputFieldContainer>
						</InputBody>
					</form>
				) : (
					undefined
				)}
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, {})(ProfileDetails);
