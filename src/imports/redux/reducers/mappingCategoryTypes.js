import { LOAD_CATEGORY_TYPES, REPLACE_CATEGORY_TYPES } from '../actions/actions';

const initialState = [];

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_CATEGORY_TYPES:
			return [ action.payload ];
		case REPLACE_CATEGORY_TYPES:
			const typeNames = action.payload.map((type) => type.name);
			return [ { id: action.categoryId, typeNames: typeNames } ];
		default:
			return state;
	}
}
