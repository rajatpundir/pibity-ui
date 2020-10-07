// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './config/serviceWorker';
import { Provider } from 'react-redux';
import store from './imports/redux/store';
import { AppRouter } from './imports/routes/AppRouter';
import * as Keycloak from 'keycloak-js';
import jwt_decode from 'jwt-decode';
import setJWTToken from './imports/routes/setJwtToken';
import { UPDATE_TOKEN} from './imports/redux/actions/actions'
import SelectorganizationModal from './imports/components/main/SelectorganizationModal';


let initOptions = {
	url: 'http://localhost:8081/auth',
	realm: 'inventory',
	clientId: 'pibity-erp',
	onLoad: 'login-required'
};

let keycloak = Keycloak(initOptions);



keycloak
	.init({ onLoad: initOptions.onLoad })
	.then((auth) => {
		if (!auth) {
			window.location.reload();
		}
		//React Render
		localStorage.setItem('jwt-token', keycloak.token);
		localStorage.setItem('jwt-refresh-token', keycloak.refreshToken);
		console.log(keycloak.token);
		setJWTToken(keycloak.token); //Added Authorization Header in Request With token
		const { groups } = jwt_decode(keycloak.token);
		const organizations = [ ...new Set(groups.map((group) => group.split('/')[1])) ];
		localStorage.setItem('organizations', JSON.stringify(organizations));
		if (organizations.length === 1) {
			localStorage.setItem('selectedOrganization', organizations[0]);
		}
		store.dispatch({
			type: UPDATE_TOKEN,
			payload: jwt_decode(keycloak.token),
			selectedOrganization:organizations.length === 1 ? organizations[0] :localStorage.getItem('selectedOrganization')
		});
		const app = document.getElementById('app');
		if (app !== null) {
			ReactDOM.render(
				<Provider store={store}>
					<AppRouter />
				</Provider>,
				app
			);
		}

		setTimeout(() => {
			keycloak
				.updateToken(70)
				.then((refreshed) => {
					if (refreshed) {
						console.debug('Token refreshed' + refreshed);
					} else {
						console.warn(
							'Token not refreshed, valid for ' +
								Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) +
								' seconds'
						);
					}
				})
				.catch(() => {
					console.error('Failed to refresh token');
				});
		}, 60000);
	})
	.catch(() => {
		console.error('Authenticated Failed');
	});








// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
