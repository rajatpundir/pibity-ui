import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { LOAD_CATEGORY_TYPES, REPLACE_CATEGORY_TYPES, REPLACE_TYPES } from './actions';
import { HTTP_STATUS_CODE } from '../config.js';

async function loadCategoryTypes(dispatch, categoryId: Number) {
	await db.mappingCategoryTypes.where('categoryId').equals(categoryId).toArray().then((categoryTypes) => {
		dispatch({
			type: LOAD_CATEGORY_TYPES,
			payload: { id: categoryId, typeNames: categoryTypes.map((categoryType) => categoryType.typeName) }
		});
	});
}

async function replaceCategoryTypes(dispatch, payload, categoryId: Number) {
	const categoryTypes = payload.map((type) => {
		return { categoryId: categoryId, typeName: type.name };
	});
	await db.types.bulkDelete(payload.map((type) => type.name));
	await db.types.bulkAdd(payload).then(() => {
		dispatch({
			type: REPLACE_TYPES,
			payload: payload
		});
	});
	await db.mappingCategoryTypes.where('categoryId').equals(categoryId).delete();
	await db.mappingCategoryTypes.bulkAdd(categoryTypes).then(() => {
		dispatch({
			type: REPLACE_CATEGORY_TYPES,
			payload: payload,
			categoryId: categoryId
		});
	});
}

export const getCategoryTypes = (categoryId: Number) => async (dispatch) => {
	try {
		await loadCategoryTypes(dispatch, categoryId);
		const url = domain + '/category/types';
		const request = {
			categoryId: categoryId
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await replaceCategoryTypes(dispatch, data, categoryId);
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
