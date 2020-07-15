import { STORE_CATEGORIES, LOAD_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../actions/actions';

const initialState = [];

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_CATEGORIES:
		case STORE_CATEGORIES:
			return action.payload;
		case ADD_CATEGORY:
			return [ ...state, action.payload ];
		case UPDATE_CATEGORY:
			const categoryToUpdate = state.find((category) => category.id === action.payload.id);
			return [
				...state.filter((category) => category.id !== action.payload.id),
				Object.assign({}, categoryToUpdate, { ...action.payload })
			];
		case DELETE_CATEGORY:
			return [ ...state.filter((category) => category.id !== action.payload.id) ];
		default:
			return state;
	}
}
