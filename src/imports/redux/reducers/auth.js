import { UPDATE_TOKEN } from '../actions/actions';
import jwt_decode from 'jwt-decode';

const initialState = {
	isAuthenticated: localStorage.getItem('jwtToken') ? true : false,
	token: localStorage.getItem('jwtToken') ? jwt_decode(localStorage.getItem('jwtToken')) : {},
	organizations:[],
	selectedOrganization:''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_TOKEN:
			return {
				...state,
				isAuthenticated: action.payload ? true : false,
				token: action.payload,
				organizations:[ ...new Set(action.payload.groups.map((group) => group.split('/')[1])) ],
				selectedOrganization:action.selectedOrganization
			};
		default:
			return state;
	}
}
