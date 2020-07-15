import axios from 'axios';
import db from '../database';
import { domain } from '../config';
import { updateErrors } from './errors';
import { LOAD_PROFILE, STORE_PROFILE } from './actions';
import { HTTP_STATUS_CODE } from './../config.js';

async function loadProfile(dispatch) {
	await db.profile.toArray().then((profile) => {
		if(profile[0]){
			dispatch({
				type: LOAD_PROFILE,
				payload: profile[0]
			});
		}
		
	});
}

async function storeProfile(dispatch, payload) {
	await db.profile.clear();
	await db.profile.add(payload).then((profile) => {
		dispatch({
			type: STORE_PROFILE,
			payload: payload
		});
	});
}

export const getProfile = (username: String) => async (dispatch) => {
	try {
		await loadProfile(dispatch);
		const url = domain + '/user/details';
		const request = {
			username: username
		};
		const response = await axios.post(url, request);
		const { statusCode, data } = JSON.parse(response.data.entity);
		if (statusCode === HTTP_STATUS_CODE.OK) {
			if (data !== undefined) {
				await storeProfile(dispatch, data);
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
