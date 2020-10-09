import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Container, Image, Title, Form, Input, Button, Error } from '../../styles/main/LogIn';
// import { clearErrors } from '../../redux/actions/errors';
// import { login } from '../../redux/actions/auth';
// import image from '../../styles/main/images/User.png';
class LogIn extends React.Component {
	constructor(props) {
		super();
		this.state = {
			username: '',
			password: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	// componentDidMount() {
	// 	this.props.clearErrors();
	// }

	// onChange(e) {
	// 	this.setState({ [e.target.name]: e.target.value });
	// }

	// onSubmit(e) {
	// 	e.preventDefault();
	// 	this.props.login(this.state.username, this.state.password);
	// }

	render() {
		return (
			// <Container>
			// 	<Image src={image} />
			// 	<Title>LogIn</Title>
			// 	<Form onSubmit={this.onSubmit}>
			// 		{this.props.errors.username ? <Error>{this.props.errors.username}</Error> : undefined}
			// 		<Input
			// 			name="username"
			// 			type="email"
			// 			placeholder="Email"
			// 			value={this.state.username}
			// 			onChange={this.onChange}
			// 			required
			// 			autoFocus
			// 		/>

			// 		<Input
			// 			name="password"
			// 			type="password"
			// 			placeholder="Password"
			// 			value={this.state.password}
			// 			onChange={this.onChange}
			// 			required
			// 			autoFocus
			// 		/>
			// 		<Button type="submit">Login</Button>
			// 	</Form>
            // </Container>
            <h1>login</h1>
		);
	}
}

// LogIn.propTypes = {
// 	errors: PropTypes.object.isRequired,
// 	login: PropTypes.func.isRequired
// };

// const mapStateToProps = (state, ownProps) => ({
// 	errors: state.errors
// });

// export default connect(mapStateToProps, { clearErrors, login })(LogIn);

export default LogIn