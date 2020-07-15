import { REPLACE_VARIABLES, REPLACE_VARIABLE } from '../actions/actions';

const initialState = {};

export default function (state = initialState, action) {
	switch (action.type) {
		case REPLACE_VARIABLES:
			state[action.typeName] = action.payload
			return state;
		case REPLACE_VARIABLE:
			if (state[action.payload.typeName] !== undefined) {
				state[action.payload.typeName] = [...state[action.payload.typeName].filter((varibale) => varibale.variableName !== action.payload.variableName), action.payload]
			}
			else {
				state[action.payload.typeName] = [action.payload]
			}
			return state;
		default:
			return state;
	}
}
