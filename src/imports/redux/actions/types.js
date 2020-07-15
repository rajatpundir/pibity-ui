import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { LOAD_TYPES, REPLACE_TYPE } from './actions';

async function loadTypes(dispatch) {
	await db.types.toArray().then((types) => {
		dispatch({
			type: LOAD_TYPES,
			payload: types
		});
	});
}

async function replaceType(dispatch, payload) {
	await db.types.where('typeName').equals(payload.typeName).delete();
	await db.types.add(payload).then(() => {
		dispatch({
			type: REPLACE_TYPE,
			payload: payload
		});
	});
}

export const getType = (typeName: String) => async (dispatch) => {
	try {
		await loadTypes(dispatch);
		const url = domain + '/type/details';
		const request = {
			typeName: typeName
		};
		const payload = await axios.post(url, request);
		await replaceType(dispatch, payload);
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};
