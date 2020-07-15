import { CLEAR_ERRORS, UPDATE_ERRORS } from './actions';

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS
	});
};

export function updateErrors(dispatch, payload) {
	dispatch({
		type: UPDATE_ERRORS,
		payload: payload
	});
}
