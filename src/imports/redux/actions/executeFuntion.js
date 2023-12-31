import axios from 'axios';
import { domain } from '../config';
import { updateErrors } from './errors';
import { replaceVariable } from './variables';

export const executePaymentInvoiceFuntion = (args: Object, funtionName: String) => async (dispatch) => {
	try {
		const url = domain + '/function/execute';
		const request = {
			...{ args: args },
			...{ orgId: localStorage.getItem('selectedOrganization') },
			...{ functionName: funtionName }
		};
		console.log(request);
		const response = await axios.post(url, request);
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				const data = {
					status: response.status,
					transaction: response.data.firstTransactionRecord
				};
				return data;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const executeFuntion = (args: Object, funtionName: String) => async (dispatch) => {
	try {
		const url = domain + '/function/execute';
		const request = {
			...{ args: args },
			...{ orgId: localStorage.getItem('selectedOrganization') },
			...{ functionName: funtionName }
		};
		console.log(request);
		const response = await axios.post(url, request);
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				return response;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};
export const updatePurchaseInvoice = (request: Object) => async (dispatch) => {
	try {
		const url = domain + '/variables/mutate';
		const queue = [
			[
				{
					...request,
					...{ op: 'update' }
				}
			]
		];
		const orgId = localStorage.getItem('selectedOrganization');
		const response = await axios.post(url, {
			...{ queue: queue },
			...{ orgId: orgId }
		});
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data[0][0] !== undefined && response.data.length===2) {
				await replaceVariable(dispatch, response.data[0][0]);
				const resp = {
					data: response.data[0][0],
					status: response.status
				};
				return resp;
			}else{
				const resp = {
					data: response.data[0][0],
					status: 400
				};
				return resp;
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
