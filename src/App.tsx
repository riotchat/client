import React, { useState, createContext } from 'react';
import styles from './App.module.scss';

import Load from './pages/Load';
import Login from './pages/Login';
import { Instance } from './internal/Client';

export enum Page {
	NONE,
	LOAD,
	LOGIN,
	APP
};

export const AppContext = createContext(
	{
		theme: '??',
		page: Page.NONE,
		setTheme: (theme: string) => undefined,
		setPage: (page: Page) => undefined
	}
);

export default function App() {
	let [ ready, setReady ] = useState(false);
	let [ theme, setTheme ] = useState('dark');
	let [ page, setPage ] = useState(Page.LOAD);

	if (!ready) {
		let token = localStorage.getItem('accessToken');
		if (token) {
			Instance.client
				.login(token)
				.catch(() => setPage(Page.LOGIN))
				.finally(() => setReady(true));
		} else {
			setPage(Page.LOGIN);
			setReady(true);
		}
	}

	let states = {
		theme, setTheme,
		page, setPage
	} as any;

	return (
		<div className={`theme-${theme} ${styles.app}`}>
			<AppContext.Provider value={states}>
				{ page === Page.LOAD && <Load waitForClient={ready} /> }
				{ page === Page.LOGIN && <Login /> }
			</AppContext.Provider>
		</div>
	);
}