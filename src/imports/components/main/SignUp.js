import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../redux/actions/errors';
import { signup } from '../../redux/actions/auth';
import { Container, Image, Title, Form, Input, Button, Error } from '../../styles/main/SignUp';
import image from '../../styles/main/images/User.png';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			organization: '',
			username: '',
			password: '',
			confirmPassword: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.signup(
			this.state.organization,
			this.state.username,
			this.state.password,
			this.state.confirmPassword
		);
	}

	render() {
		return (
			<Container>
				<Image src={image} />
				<Title>SignUp</Title>
				<Form onSubmit={this.onSubmit}>
					{this.props.errors.organization ? <Error>{this.props.errors.organization}</Error> : undefined}
					<Input
						name="organization"
						type="text"
						placeholder="Organization"
						value={this.state.organization}
						onChange={this.onChange}
						required
						autoFocus
					/>

					{this.props.errors.username ? <Error>{this.props.errors.username}</Error> : undefined}
					<Input
						name="username"
						type="email"
						placeholder="Email"
						value={this.state.username}
						onChange={this.onChange}
						required
					/>

					{this.props.errors.password ? <Error>{this.props.errors.password}</Error> : undefined}
					<Input
						name="password"
						type="password"
						placeholder="Password"
						minLength="8"
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
						minLength="8"
						placeholder="Confirm Password"
						value={this.state.confirmPassword}
						onChange={this.onChange}
						required
					/>
					{this.state.password !== this.state.confirmPassword ? (
						undefined
					) : (
						<Button type="submit">Submit</Button>
					)}
				</Form>
			</Container>
		);
	}
}

SignUp.propTypes = {
	errors: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { clearErrors, signup })(SignUp);
