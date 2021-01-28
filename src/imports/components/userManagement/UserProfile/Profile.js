import React from 'react';
import { connect } from 'react-redux';
import { successMessage, CustomNotification, customErrorMessage } from '../../main/Notification';
import 'react-toastify/dist/ReactToastify.css';
import ProfileDetails from './ProfileDetails';
import { Container, PageWrapper, PageBody } from '../../../styles/inventory/Style';
import { createUser, getUserDetail } from '../../../redux/actions/users';
import { objToMapRec, getVariables, getVariable, updateVariable } from '../../../redux/actions/variables';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import ReactLoading from 'react-loading';
import * as legoData from '../../main/legoLoading.json';
import * as doneData from '../../main/doneLoading.json';
import LoadingOverlay from 'react-loading-overlay';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: legoData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

class Profile extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			loading: false,
			createCustomer: true,
			prevPropVariable: {},
			prevPropUser: {},
			prevVariable: new Map(),
			prevUser: new Map(),
			user: new Map([
				[ 'username', '' ],
				[ 'firstName', '' ],
				[ 'lastName', '' ],
				[ 'email', '' ],
				[ 'active', true ]
			]),
			variable: new Map([
				[ 'typeName', 'User' ],
				[ 'active', '' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'country', '' ],
						[ 'phoneNumber', '' ],
						[ 'pinCode', '' ],
						[ 'state', '' ],
						[ 'address', '' ]
					])
				]
			])
		};
		this.onUpdateUser = this.onUpdateUser.bind(this);
		this.onUpdateUserDetail = this.onUpdateUserDetail.bind(this);
		this.onupdateUserProfile = this.onupdateUserProfile.bind(this);
		this.onCreateUser = this.onCreateUser.bind(this);
	}

	componentDidMount() {
		if (this.props.match.params.variableName) {
			this.setState({ loading: true });
		}
		const username = localStorage.getItem('username');
		this.props.getUserDetail(username);
		this.props.getVariable('User', localStorage.getItem('username'));
		this.props.getVariables('Country');
		this.props.getVariables('States');
		this.props.getVariables('PinCode');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variables.User && nextProps.match.params.variableName) {
			const variable =
				nextProps.match.params.variableName !== nextProps.auth.userName
					? nextProps.variables.User.filter(
							(variable) => variable.variableName === nextProps.match.params.variableName
						)[0]
					: nextProps.variables.User.filter(
							(variable) => variable.variableName === nextProps.auth.userName
						)[0];
			const user = nextProps.match.params.variableName
				? nextProps.users.filter((user) => user.username === nextProps.match.params.variableName)[0]
				: nextProps.users.filter((user) => user.username === nextProps.auth.userName)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap
				};
			}
			if (user && prevState.prevPropUser !== user) {
				const userMap = objToMapRec(user);
				const prevUserMap = objToMapRec(prevState.prevPropUser);
				return {
					...prevState,
					loading: false,
					user: userMap,
					prevPropUser: user,
					prevUser: prevUserMap
				};
			}
		}
		return prevState;
	}

	onUpdateUser(user) {
		this.setState({ user: user });
	}

	onUpdateUserDetail(details) {
		this.setState({ variable: details });
	}

	onCreateUser(passwords, userRole) {
		console.log(passwords.get('password'));
		if (passwords.get('password') === passwords.get('confirmPassword')) {
			const password = passwords.get('password');
			this.props.createUser(this.state.user, this.state.variable, password, userRole).then((status) => {
				if (status === 200) {
					successMessage('User added successfully');
				}
			});
		} else {
			customErrorMessage('password Didint match');
		}
	}

	onupdateUserProfile() {
		this.props.updateVariable(this.state.prevVariable, this.state.variable).then((status) => {
			if (status === 200) {
				successMessage('Profile details updated');
			}
		});
	}

	render() {
		console.log(this.state.loading);
		return (
			<LoadingOverlay
				active={this.state.loading}
				spinner={<Lottie options={defaultOptions} height={240} width={240} />}
				text="Loading your content..."
			>
				<Container mediaPadding="20px 20px 0 20px" onscroll="extJS_realign()">
					<CustomNotification limit={2} />
					{/* {this.state.loading ? (
					<FadeIn>
							<Lottie options={defaultOptions} height={240} width={240} />
					</FadeIn>
				) : (
					undefined
				)} */}

					<PageWrapper>
						<PageBody>
							<ProfileDetails
								params={this.props.match.params}
								details={this.state.variable}
								user={this.state.user}
								createUser={this.onCreateUser}
								updateUser={this.onUpdateUser}
								updateUserDetails={this.onUpdateUserDetail}
								updateUserProfile={this.onupdateUserProfile}
							/>
						</PageBody>
					</PageWrapper>
				</Container>
			</LoadingOverlay>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables,
	users: state.users,
	auth: state.auth
});

export default connect(mapStateToProps, {
	createUser,
	getUserDetail,
	getVariables,
	getVariable,
	updateVariable
})(Profile);
