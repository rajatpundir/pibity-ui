import React from 'react';
import Icon from '@material-ui/core/Icon';
import { cloneDeep } from 'lodash';

import { Input, InputLabel, FormControl } from '../../../styles/inventory/Style';
const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%',
	icon: {
		position: 'absolute',
		left: 'auto',
		right: '10px',
		top: '10px'
	}
};

class Password extends React.Component {
	constructor(props) {
		super();
		this.state = {
			passwords: props.passwords,
			passwordVisibility: false
		};
		this.onChange = this.onChange.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			passwords: nextProps.passwords,
		};
	}

	onChange(e) {
		const passwords = cloneDeep(this.state.passwords);
		passwords.set(e.target.name, e.target.value);
		this.props.updatePassword(passwords);
	}

	toggleShow() {
		this.setState({ passwordVisibility: !this.state.passwordVisibility });
	}

	render() {
		return (
			<React.Fragment>
				<FormControl flexBasis={style.flexBasis}>
					<Input
						name="password"
						type={this.state.passwordVisibility ? 'text' : 'password'}
						minLength="8"
						// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						required
						value={this.state.passwords.get('password')}
						onChange={this.onChange}
					/>{' '}
					<span style={style.icon} onClick={this.toggleShow}>
						{this.state.passwordVisibility ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
					</span>
					<InputLabel> Password</InputLabel>
				</FormControl>
				<FormControl flexBasis={style.flexBasis}>
					<Input
						name="confirmPassword"
						type={this.state.passwordVisibility ? 'text' : 'password'}
						minLength="8"
						// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						required
						value={this.state.passwords.get('confirmPassword')}
						onChange={this.onChange}
					/>{' '}
					<span style={style.icon} onClick={this.toggleShow}>
						{this.state.passwordVisibility ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
					</span>
					<InputLabel>Confirm Password</InputLabel>
				</FormControl>
			</React.Fragment>
		);
	}
}
export default Password;
