import React, { useState, createContext } from 'react';
import Helmet from 'react-helmet';
import styles from './App.module.scss';

import Load from './pages/Load';
import Login from './pages/Login';
import { Instance } from './internal/Client';
import Chat from './pages/Chat';
import { Settings } from './pages/Settings';

export enum Page {
	NONE = 0,
	LOAD = 0x1,
	LOGIN = 0x1 << 1,
	APP = 0x1 << 2,
	SETTINGS = 0x1 << 3
};

export const AppContext = createContext(
	{
		theme: '??',
		page: Page.NONE,
		setTheme: (theme: string) => undefined,
		setPage: (page: Page) => undefined,
		propogate: () => undefined
	}
);

export default function App() {
	let [ ready, setReady ] = useState(false);
	let [ theme, setTheme ] = useState('dark');
	let [ page, setPage ] = useState(Page.LOAD);

	// riotchat.js re-render hook
	let [ dummyValue, doRender ] = useState(false);
	function propogate() {
		doRender(!dummyValue);
	}

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
		page, setPage,
		propogate
	} as any;

	return (
		<div className={`theme-${theme} ${styles.app}`}>
			<Helmet>
				<meta name="theme-color" content="#7B68EE" />
			</Helmet>
			<AppContext.Provider value={states}>
				{ page & Page.LOAD ? <Load waitForClient={ready} /> : null }
				{ page & Page.LOGIN ? <Login />: null }
				{ page & (Page.APP | Page.SETTINGS) ? <Chat /> : null }
				{ page & Page.SETTINGS ? <Settings /> : null }
			</AppContext.Provider>
		</div>
	);
}