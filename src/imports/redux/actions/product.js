import axios from 'axios';
import { updateErrors } from './errors';
import { HTTP_STATUS_CODE } from './../config.js';
import {  REPLACE_TYPE } from './actions';



// async function loadTypes(dispatch) {
// 	await db.types.toArray().then((types) => {
// 		dispatch({
// 			type: LOAD_TYPES,
// 			payload: types
// 		});
// 	});
// }

// async function replaceTypes(dispatch, payload, kindName: String) {
// 	await db.types.where('kind.name').equals(kindName).delete();
// 	await db.types.bulkAdd(payload).then(() => {
// 		dispatch({
// 			type: REPLACE_ALL_TYPES,
// 			payload: payload,
// 			kindName: kindName
// 		});
// 	});
// }

// async function replaceType(dispatch, payload) {
// 	await db.types.where('name').equals(payload.name).delete();
// 	await db.types.add(payload).then(() => {
// 		dispatch({
// 			type: REPLACE_TYPE,
// 			payload: payload
// 		});
// 	});
// }

export const getTypeDetails = ( typeName: String) => async (
	dispatch
) => {
	try {
		const url = 'http://localhost:8080/api/type/details';
		const request = {
            organization: "zs",
            typeName: typeName
        };
        const response = await axios.post(url, request);
        console.log(response.toString());
		if (response.status === HTTP_STATUS_CODE.OK) {
			if (response.data !== undefined) {
                console.log(response.data);
                dispatch({
                    type: REPLACE_TYPE,
                    payload: response.data
                });
				return true;
			}
		} else {
			updateErrors(dispatch, response.data);
			return false;
		}
		
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

function mapToObjectRec(m) {
	let lo = {};
	for (let [ k, v ] of m) {
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
export const createVariable = ( typeName: String,variableName: String, values: Map) => async (dispatch) => {
	try {
		const url =  'http://localhost:8080/api/variable/create';
		const request = {
			organization: "zs",
			typeName: typeName,
			variableName: variableName,
			values: mapToObjectRec(values)
		};
		console.log(request);
		const response = await axios.post(url, request);
		console.log(response.data);
		if (response.statusCode === HTTP_STATUS_CODE.OK) {
			if (response.data !== undefined) {
				console.log(response.data);
				return true;
			}
		} else {
			console.log(response.data);
			updateErrors(dispatch, response.data);
			return false;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

