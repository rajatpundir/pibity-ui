import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { STORE_USERS, LOAD_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from './actions';
import { HTTP_STATUS_CODE } from './../config.js';
import { mapToObjectRec, replaceVariable } from './variables';

async function loadUsers(dispatch) {
	await db.users.toArray().then((user) => {
		dispatch({
			type: LOAD_USERS,
			payload: user
		});
	});
}

async function storeUsers(dispatch, payload) {
	await db.users.clear();
	await db.users.bulkAdd(payload).then((users) => {
		dispatch({
			type: STORE_USERS,
			payload: payload
		});
	});
}

async function addUser(dispatch, payload) {
	await db.users.add(payload).then((users) => {
		dispatch({
			type: ADD_USER,
			payload: payload
		});
	});
}

async function updateUser(dispatch, payload) {
	await db.users.update(payload.username, payload).then(() => {
		dispatch({
			type: UPDATE_USER,
			payload: payload
		});
	});
}

// async function replaceUser(dispatch, payload) {
// 	await db.users.delete(payload.username);
// 	await db.users.add(payload).then((users) => {
// 		dispatch({
// 			type: REPLACE_USER,
// 			payload: payload
// 		});
// 	});
// }

async function deleteUser(dispatch, payload) {
	await db.users.delete(payload.username).then(() => {
		dispatch({
			type: DELETE_USER,
			payload: payload
		});
	});
}

export const getUserDetail = (username) => async (dispatch) => {
	try {
		await loadUsers(dispatch);
		const url = domain + '/user/details';
		const request = {
			orgId: localStorage.getItem('selectedOrganization'),
			username: username
		};
		const response = await axios.post(url, request);
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				const data = {
					username: response.data.username,
					orgId: response.data.orgId,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					active: response.data.active
				};
				await updateUser(dispatch, data);
				await replaceVariable(dispatch, response.data.details);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const createUser = (user: Map, details: Map, password: String, userRole: String) => async (dispatch) => {
	try {
		console.log('hello');
		const url = domain + '/user/create';
		const userData = mapToObjectRec(user);
		const userDetail = mapToObjectRec(details);
		const request = {
			...userData,
			...{ details: userDetail.values },
			...{ orgId: localStorage.getItem('selectedOrganization') },
			...{ roles: [ userRole ] },
			...{ password: password }
		};
		console.log(request);
		const response = await axios.post(url, request);
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				const data = {
					username: response.data.username,
					orgId: response.data.orgId,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					active: response.data.active
				};
				await updateUser(dispatch, data);
				await replaceVariable(dispatch, response.data.details);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const removeUser = (username: String) => async (dispatch) => {
	try {
		const url = domain + '/user/remove';
		const request = {
			username: username
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await deleteUser(dispatch, data);
				return true;
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const resetUserPassword = (username: String, password: String, confirmPassword: String) => async (dispatch) => {
	try {
		const url = domain + '/user/reset_password';
		const request = {
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				return true;
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const updateUserStatus = (username: String, isActive: Boolean) => async (dispatch) => {
	try {
		const url = domain + '/user/update_status';
		const request = {
			username: username,
			isActive: isActive
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await updateUser(dispatch, data);
				return true;
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const updateUserPermissions = (username: String, module: String, permissionLevel: Number) => async (
	dispatch
) => {
	try {
		const url = domain + '/user/update_permissions';
		const request = {
			username: username,
			module: module,
			permissionLevel: permissionLevel
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await updateUser(dispatch, data);
				return true;
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const updateUserProfile = (username: String, firstName: String, lastName: String, contact: String) => async (
	dispatch
) => {
	try {
		const url = domain + '/user/update_profile';
		const request = {
			username: username,
			firstName: firstName,
			lastName: lastName,
			contact: contact
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await updateUser(dispatch, data);
				return true;
			}
		} else {
			updateErrors(dispatch, data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};
