import { LOAD_TYPES, REPLACE_ALL_TYPES, REPLACE_TYPES, REPLACE_TYPE } from '../actions/actions';

const initialState = [];

export default function (state = initialState, action) {
	switch (action.type) {
		case LOAD_TYPES:
			return [...action.payload];
		case REPLACE_TYPE:
			return [...state.filter((type) => type.typeName !== action.payload.typeName), action.payload];
		default:
			return state;
	}
}
