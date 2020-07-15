import { STORE_USERS, LOAD_USERS, ADD_USER, UPDATE_USER, DELETE_USER, REPLACE_USER } from '../actions/actions';

const initialState = [];

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_USERS:
		case STORE_USERS:
			return action.payload;
		case ADD_USER:
			return [ ...state, action.payload ];
		case UPDATE_USER:
			const userToUpdate = state.find((user) => user.username === action.payload.username);
			return [
				...state.filter((user) => user.username !== action.payload.username),
				Object.assign({}, userToUpdate, { ...action.payload })
			];
		case REPLACE_USER:
			return [ ...state.filter((user) => user.username !== action.payload.username), action.payload ];
		case DELETE_USER:
			return [ ...state.filter((user) => user.username !== action.payload.username) ];
		default:
			return state;
	}
}
