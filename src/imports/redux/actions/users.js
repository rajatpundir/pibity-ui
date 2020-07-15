import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { STORE_USERS, LOAD_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from './actions';
import { HTTP_STATUS_CODE } from './../config.js';

async function loadUsers(dispatch) {
	await db.users.toArray().then((users) => {
		dispatch({
			type: LOAD_USERS,
			payload: users
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

export const getUsers = () => async (dispatch) => {
	try {
		await loadUsers(dispatch);
		const url = domain + '/organization/users';
		const request = {};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await storeUsers(dispatch, data);
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

export const createUser = (username: String, password: String, confirmPassword: String) => async (dispatch) => {
	try {
		const url = domain + '/user/create';
		const request = {
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await addUser(dispatch, data);
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
