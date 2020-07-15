import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { REPLACE_VARIABLES, REPLACE_VARIABLE } from './actions';

async function loadVariables(dispatch, typeName) {
	await db.variables.where('typeName').equals(typeName).toArray().then((variables) => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: variables,
			typeName: typeName
		});
	});
}

async function loadVariable(dispatch, typeName: String, variableName: String) {
	await db.variables.where('[typeName+variableName]').equals([typeName, variableName]).toArray().then((variables) => {
		if (variables[0]) {
			dispatch({
				type: REPLACE_VARIABLE,
				payload: variables[0]
			});
		}
	});
}

async function replaceVariables(dispatch, payload, typeName: String) {
	await db.variables.where('typeName').equals(typeName).delete();
	await db.variables.bulkAdd(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: payload,
			typeName: typeName
		});
	});
}

async function replaceVariable(dispatch, typeName, payload) {
	await db.variables.where('[typeName+variableName]').equals([payload.typeName, payload.variableName]).delete();
	await db.variables.add(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLE,
			typeName: typeName,
			payload: payload
		});
	});
}

function mapToObjectRec(m) {
	let lo = {};
	for (let [k, v] of m) {
		if (v instanceof Map) {
			lo[k] = mapToObjectRec(v);
		} else {
			if (v instanceof Set) {
				lo[k] = Array.from(v).toString();
			} else {
				lo[k] = v;
			}
		}
	}
	return lo;
}

export const getVariables = (typeName: String) => async (dispatch) => {
	try {
		await loadVariables(dispatch, typeName);
		const url = domain + '/type/variables';
		const request = {
			organization: "zs",
			typeName: typeName
		};
		const response = await axios.post(url, request);
		await replaceVariables(dispatch, response.data, typeName);
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const createVariable = (typeName: String, variableName: String, values: Map) => async (dispatch) => {
	try {
		const url = domain + '/variable/create';
		const request = {
			organization: "pbt",
			typeName: typeName,
			variableName: variableName,
			values: mapToObjectRec(values)
		};
		const response = await axios.post(url, request);
		await replaceVariable(dispatch, response.data);
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const getVariable = (typeName: String, variableName: String) => async (dispatch) => {
	try {
		await loadVariable(dispatch, typeName, variableName);
		const url = domain + '/variable/details';
		const request = {
			organization: "zs",
			typeName: typeName,
			variableName: variableName
		};
		const response = await axios.post(url, request);
		dispatch({
			type: REPLACE_VARIABLE,
			payload: response.data
		});
		await replaceVariable(dispatch, typeName, response.data);
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

