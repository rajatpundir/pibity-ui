import axios from 'axios';
import { domain } from '../config';
import { updateErrors } from './errors';
import {replaceVariable} from './variables'

export const executePaymentInvoiceFuntion = (args: Object, funtionName:String) => async (dispatch) => {
	try {
		const url = domain + '/function/execute';
		const request = {
			...{ args: args },
			...{ orgId: localStorage.getItem('selectedOrganization') },
			...{ functionName:funtionName },
		};
		console.log(request);
		const response = await axios.post(url, request);
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				const data={
					status:response.status,
					transaction:response.data.firstTransactionRecord
				}
				return data;
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

export const updatePurchaseInvoice = (request: Object,) => async (dispatch) => {
	try {
		const url = domain + '/variable/update';
		console.log(JSON.stringify(request));
		const response = await axios.post(url, request);
		console.log('--RESPONSE--');
		console.log(response.data);
		if (response.status === 200) {
			if (response.data !== undefined) {
				console.log(response.data);
				await replaceVariable(dispatch, response.data);
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