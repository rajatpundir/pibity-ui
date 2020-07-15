import { combineReducers } from 'redux';

// Import Reducers
import ErrorReducer from './errors';
import AuthReducer from './auth';
import ProfileReducer from './profile';
import UserReducer from './users';
import CategoryReducer from './categories';
import TypeReducer from './types';
import VariableReducer from './variables';
import mappingCategoryTypesReducer from './mappingCategoryTypes';

export default combineReducers({
	errors: ErrorReducer,
	auth: AuthReducer,
	profile: ProfileReducer,
	users: UserReducer,
	categories: CategoryReducer,
	types: TypeReducer,
	variables: VariableReducer,
	mappingCategoryTypes: mappingCategoryTypesReducer
});
