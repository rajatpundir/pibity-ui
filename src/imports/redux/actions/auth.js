import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { domain } from '../config';
import { updateErrors } from './errors';
import { UPDATE_TOKEN } from './actions';
import { HTTP_STATUS_CODE } from './../config.js';

export function setTokenForAxios(token: String) {
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export const updateToken = (selectedOrganization:String) => async (dispatch) => {
	const token = localStorage.getItem('jwt-token');
	if (token) {
		dispatch({
					type: UPDATE_TOKEN,
					payload: jwt_decode(token),
					selectedOrganization:selectedOrganization
		});
	}
};

export const signup = (organization: String, username: String, password: String, confirmPassword: String) => async (
	dispatch
) => {
	try {
		const url = domain + '/organization/create';
		const request = {
			organization: organization,
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				// Signup was successful
				try {
					// Get JWT token
					const url = domain + '/user/login';
					const request = {
						username: username,
						password: password
					};
					const response = await axios.post(url, request);
					const { statusCode, data } = JSON.parse(response.data.entity);
					if (statusCode === HTTP_STATUS_CODE.OK) {
						if (data !== undefined) {
							await setTokenForAxios(data);
							await localStorage.setItem('jwtToken', data);
							await updateToken(dispatch, jwt_decode(data));
							return true;
						}
					} else {
						updateErrors(dispatch, data);
						return false;
					}
				} catch (error) {
					// Redirect to Login page
					window.location.replace('/login');
				}
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
		}
	}
};
