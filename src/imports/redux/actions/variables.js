import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { REPLACE_VARIABLES, REPLACE_VARIABLE } from './actions';

export async function loadVariables(dispatch, typeName) {
	await db.variables.where('typeName').equals(typeName).toArray().then((variables) => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: variables,
			typeName: typeName
		});
	});
}

export async function loadVariable(dispatch, typeName: String, variableName: String) {
	await db.variables
		.where('[typeName+variableName]')
		.equals([ typeName, variableName ])
		.toArray()
		.then((variables) => {
			if (variables[0]) {
				dispatch({
					type: REPLACE_VARIABLE,
					payload: variables[0]
				});
			}
		});
}

export async function replaceVariables(dispatch, payload, typeName: String) {
	await db.variables.where('typeName').equals(typeName).delete();
	await db.variables.bulkAdd(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: payload,
			typeName: typeName
		});
	});
}

export async function replaceVariable(dispatch, payload) {
	await db.variables.where('[typeName+variableName]').equals([ payload.typeName, payload.variableName ]).delete();
	await db.variables.add(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLE,
			payload: payload
		});
	});
}

export function mapToObjectRec(m) {
	let lo = {};
	if (!(m instanceof Map)) {
		return m;
	}
	for (let [ k, v ] of m) {
		if (v instanceof Map) {
			lo[k] = mapToObjectRec(v);
		} else {
			if (v instanceof Array || v instanceof Set) {
				lo[k] = v.map((variable) => mapToObjectRec(variable));
			} else {
				lo[k] = v;
			}
		}
	}
	return lo;
}

export function objToMapRec(obj) {
	let map = new Map();
	Object.keys(obj).forEach((key) => {
		if (Array.isArray(obj[key])) {
			map.set(key, obj[key].map((variable) => objToMapRec(variable)));
		} else if (obj[key] instanceof Object) {
			map.set(key, objToMapRec(obj[key]));
		} else {
			map.set(key, obj[key]);
		}
	});
	return map;
}

export const getVariables = (typeName: String, limit: Number = 500, offset: Number = 0, values: Object = {}) => async (
	dispatch
) => {
	try {
		await loadVariables(dispatch, typeName);
		const url = domain + '/variables/query';
		const request = {
			orgId: localStorage.getItem('selectedOrganization'),
			typeName: typeName,
			limit: limit,
			offset: offset,
			query: {
				values: values
			}
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

export const queryData = (typeName: String, limit: Number = 500, offset: Number = 0, values: Object = {}) => async (
	dispatch
) => {
	try {
		await loadVariables(dispatch, typeName);
		const url = domain + '/variables/query';
		const request = {
			orgId: localStorage.getItem('selectedOrganization'),
			typeName: typeName,
			limit: limit,
			offset: offset,
			query: {
				values: values
			}
		};
		const response = await axios.post(url, request);
		if (response.status === 200) {
			if (response.data !== undefined) {
				return response;
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

export const createAccount = (variable: Map) => async (dispatch) => {
	try {
		const url = domain + '/variables/mutate';
		const requestBody = mapToObjectRec(variable);
		const queue = [
			[
				{
					...requestBody,
					...{ op: 'create' }
				}
			]
		];
		console.log('--REQUEST--');
		console.log(requestBody);
		const orgId = localStorage.getItem('selectedOrganization');
		const response = await axios.post(url, {
			...{ queue: queue },
			...{ orgId: orgId }
		});
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data[0][0] !== undefined) {
				await replaceVariable(dispatch, response.data[0][0]);
				const accountInfo = {
					status: response.status,
					accountName: response.data[0][0].variableName
				};
				return accountInfo;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data[0]);
			return false;
		}
	}
};

export const createVariable = (variable: Map) => async (dispatch) => {
	try {
		const url = domain + '/variables/mutate';
		const requestBody = mapToObjectRec(variable);
		const queue = [
			[
				{
					...requestBody,
					...{ op: 'create' }
				}
			]
		];
		console.log('--REQUEST--');
		console.log(requestBody);
		const orgId = localStorage.getItem('selectedOrganization');
		console.log({
			...{ queue: queue },
			...{ orgId: orgId }
		});
		const response = await axios.post(url, {
			...{ queue: queue },
			...{ orgId: orgId }
		});
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data[0][0] !== undefined) {
				await replaceVariable(dispatch, response.data[0][0]);
				const resp = {
					data: response.data[0][0],
					status: response.status
				};
				return resp;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data[0]);
			return false;
		}
	}
};

export const createVariables = (variables: Array) => async (dispatch) => {
	try {
		const url = domain + '/variables/mutate';

		const requestBody = variables.map((variable) => {
			const request = { ...mapToObjectRec(variable), ...{ op: 'create' } };
			return request;
		});

		const queue = [ requestBody ];

		console.log('--REQUEST--');
		console.log(queue);
		const orgId = localStorage.getItem('selectedOrganization');
		console.log({
			...{ queue: queue },
			...{ orgId: orgId }
		});
		const response = await axios.post(url, {
			...{ queue: queue },
			...{ orgId: orgId }
		});
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				const resp={
					data:response.data,
					status:response.status
				}
				return resp;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data[0]);
			return false;
		}
	}
};

export const getVariable = (typeName: String, variableName: String) => async (dispatch) => {
	try {
		await loadVariable(dispatch, typeName, variableName);
		const url = domain + '/variables/query';
		const request = {
			orgId: localStorage.getItem('selectedOrganization'),
			typeName: typeName,
			variableName: variableName,
			limit: 1,
			offset: 0,
			query: {
				values: {}
			}
		};
		const response = await axios.post(url, request);
		if (response.status === 200) {
			if (response.data !== undefined) {
				await replaceVariable(dispatch, response.data[0]);
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

export const updateVariable = (prevVariable: Map, newVariable: Map) => async (dispatch) => {
	try {
		console.log(prevVariable);
		const url = domain + '/variables/mutate';

		const requestBody = {
			op: 'update',
			typeName: prevVariable.get('typeName'),
			variableName: prevVariable.get('variableName'),
			values: mapToObjectRec(computeUpdates(prevVariable.get('values'), newVariable.get('values')))
		};
		const queue = [
			[
				{
					...requestBody,
					...{ op: 'update' }
				}
			]
		];
		console.log('--REQUEST--');
		console.log(requestBody);
		const orgId = localStorage.getItem('selectedOrganization');
		const response = await axios.post(url, {
			...{ queue: queue },
			...{ orgId: orgId }
		});
		console.log('--RESPONSE--');
		console.log(response.data);
		if (response.status === 200) {
			if (response.data[0][0] !== undefined) {
				await replaceVariable(dispatch, response.data[0][0]);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data[0]);
			return false;
		}
	}
};

export const updateProductStockVariable = (variable: Map) => async (dispatch) => {
	try {
		const url = domain + '/variables/mutate';
		console.log(JSON.stringify(variable));
		const response = await axios.post(url, variable);
		console.log('--RESPONSE--');
		console.log(response.data);
		if (response.status === 200) {
			if (response.data[0] !== undefined) {
				console.log(response.data[0]);
				await replaceVariable(dispatch, response.data[0]);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data[0]);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data[0]);
			return false;
		}
	}
};

function computeUpdates(prevValues: Map, newValues: Map) {
	const map = new Map();
	for (let [ key, value ] of prevValues.entries()) {
		if (value instanceof Map) {
			const values = new Map();
			values.set('values', computeUpdates(value.get('values'), newValues.get(key).get('values')));
			values.set('variableName', value.get('variableName'));
			if (values.get('values').size !== 0) {
				map.set(key, values);
			}
		} else if (value instanceof Array) {
			const newValue = newValues.get(key);
			const valueNames = value.map((variable) => variable.get('variableName'));
			const newValueNames = newValue.map((variable) => variable.get('variableName'));
			const updates = [];
			const deletions = value
				.map((variable) => variable.get('variableName'))
				.filter((variableName) => !newValueNames.includes(variableName));
			const insertions = newValue.filter((variable) => !valueNames.includes(variable.get('variableName')));
			for (let variable of value) {
				const variableName = variable.get('variableName');
				if (!insertions.includes(variableName) && !deletions.includes(variableName)) {
					const newVariable = newValue.filter((variable) => variable.get('variableName') === variableName)[0];
					if (variable !== newVariable) {
						const variableValues = computeUpdates(variable.get('values'), newVariable.get('values'));
						if (variableValues.size !== 0)
							updates.push(new Map([ [ 'variableName', variableName ], [ 'values', variableValues ] ]));
					}
				}
			}
			const listMap = new Map();
			if (insertions.length !== 0) {
				listMap.set('add', insertions);
			}
			if (deletions.length !== 0) {
				listMap.set('remove', deletions);
			}
			if (updates.length !== 0) {
				listMap.set('update', updates);
			}
			if (listMap.size !== 0) {
				map.set(key, listMap);
			}
		} else if (value !== newValues.get(key)) {
			map.set(key, newValues.get(key));
		}
	}
	return map;
}
