import { UPDATE_ERRORS, CLEAR_ERRORS } from '../actions/actions';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_ERRORS:
			return action.payload;
		case CLEAR_ERRORS:
			return initialState;
		default:
			return state;
	}
}
