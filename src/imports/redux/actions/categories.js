import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { STORE_CATEGORIES, LOAD_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './actions';
import { HTTP_STATUS_CODE } from './../config.js';

async function loadCategories(dispatch) {
	await db.categories.toArray().then((categories) => {
		dispatch({
			type: LOAD_CATEGORIES,
			payload: categories
		});
	});
}

async function storeCategories(dispatch, payload) {
	await db.categories.clear();
	await db.categories.bulkAdd(payload).then((categories) => {
		dispatch({
			type: STORE_CATEGORIES,
			payload: payload
		});
	});
}

async function addCategory(dispatch, payload) {
	await db.categories.add(payload).then((categories) => {
		dispatch({
			type: ADD_CATEGORY,
			payload: payload
		});
	});
}

async function updateCategory(dispatch, payload) {
	await db.categories.update(payload.id, payload).then(() => {
		dispatch({
			type: UPDATE_CATEGORY,
			payload: payload
		});
	});
}

async function deleteCategory(dispatch, payload) {
	await db.categories.delete(payload.id).then(() => {
		dispatch({
			type: DELETE_CATEGORY,
			payload: payload
		});
	});
}

export const getCategories = () => async (dispatch) => {
	try {
		await loadCategories(dispatch);
		const url = domain + '/organization/categories';
		const request = {};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await storeCategories(dispatch, data);
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

export const createCategory = (parentCategoryId: Number, name: String, nextLabel: String, code: String) => async (
	dispatch
) => {
	try {
		const url = domain + '/category/create';
		const request = {
			parentCategoryId: parentCategoryId,
			name: name,
			nextLabel: nextLabel,
			code: code
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await addCategory(dispatch, data);
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

export const removeCategory = (categoryId: Number) => async (dispatch) => {
	try {
		const url = domain + '/category/remove';
		const request = {
			categoryId: categoryId
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await deleteCategory(dispatch, data);
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

export const updateCategoryInfo = (
	categoryId: Number,
	parentCategoryId: Number,
	name: String,
	nextLabel: String,
	code: String
) => async (dispatch) => {
	try {
		const url = domain + '/category/update';
		const request = {
			categoryId: categoryId,
			parentCategoryId: parentCategoryId,
			name: name,
			nextLabel: nextLabel,
			code: code
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await updateCategory(dispatch, data);
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
