import store from '../redux/store';
import * as Keycloak from 'keycloak-js';
import jwt_decode from 'jwt-decode';
import setJWTToken from '../routes/setJwtToken';
import { UPDATE_TOKEN } from '../redux/actions/actions';

let initOptions = {
	url: 'http://localhost:8081/auth',
	realm: 'inventory',
	clientId: 'pibity-erp',
	onLoad: 'login-required'
};
export const keycloak = new Keycloak(initOptions);
export const login = () => {
	keycloak
		.init({ onLoad: initOptions.onLoad })
		.then((auth) => {
			if (!auth) {
				window.location.reload();
            }
			localStorage.setItem('jwt-token', keycloak.token);
			localStorage.setItem('jwt-refresh-token', keycloak.refreshToken);
			console.log(keycloak.token);
			setJWTToken(keycloak.token); //Added Authorization Header in Request With token
			const { groups, sub } = jwt_decode(keycloak.token);
			const organizations = [ ...new Set(groups.map((group) => group.split('/')[1])) ];
			localStorage.setItem('organizations', JSON.stringify(organizations));
			localStorage.setItem('username', sub);
			if (organizations.length === 1) {
				localStorage.setItem('selectedOrganization', organizations[0]);
            }
			store.dispatch({
				type: UPDATE_TOKEN,
				payload: jwt_decode(keycloak.token),
				userName:sub,
				selectedOrganization:
					organizations.length === 1 ? organizations[0] : localStorage.getItem('selectedOrganization')
			});
			setTimeout(() => {
				keycloak
					.updateToken(70)
					.then((refreshed) => {
						if (refreshed) {
							console.debug('Token refreshed' + refreshed);
						} else {
							console.warn(
								'Token not refreshed, valid for ' +
									Math.round(
										keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000
									) +
									' seconds'
							);
						}
					})
					.catch(() => {
						console.error('Failed to refresh token');
					});
			}, 6000);
		})
		.catch(() => {
			console.error('Authenticated Failed');
		});
};
