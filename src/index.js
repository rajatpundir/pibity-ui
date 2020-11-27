// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './config/serviceWorker';
import { Provider } from 'react-redux';
import store from './imports/redux/store';
import { AppRouter } from './imports/routes/AppRouter';

const app = document.getElementById('app');
if (app !== null) {
	ReactDOM.render(
		<Provider store={store}>
			<AppRouter />
		</Provider>,
		app
	);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
