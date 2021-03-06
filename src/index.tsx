import React from 'react';
import ReactDOM from 'react-dom';

import './scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { EventEmitter } from 'events';

export const UpdateEmitter = new EventEmitter();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// ! DO NOT CHANGE TO UNREGISTER, THIS REPO PUSHES TO PROD
serviceWorker.register({
	onUpdate: () => UpdateEmitter.emit('update')
});