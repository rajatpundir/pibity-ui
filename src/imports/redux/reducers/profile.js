import { LOAD_PROFILE, STORE_PROFILE } from '../actions/actions';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_PROFILE:
		case STORE_PROFILE:
			return action.payload;
		default:
			return state;
	}
}
