import React, { useState, createContext, CSSProperties } from 'react';
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
		accent: '#000000',
		page: Page.NONE,
		setTheme: (theme: string) => undefined,
		setAccent: (accent: string) => undefined,
		setPage: (page: Page) => undefined,
		propogate: () => undefined
	}
);

export default function App() {
	let [ ready, setReady ] = useState(false);
	let [ theme, setThemeState ] = useState('dark');
	let [ accent, setAccent ] = useState('#7B68EE');
	let [ page, setPage ] = useState(Page.LOAD);

	function setTheme(toTheme: string) {
		let cL = document.body.classList;
		cL.forEach(x => {
			if (x.startsWith('theme-')) {
				cL.remove(x);
			}
		});
		cL.add('theme-' + toTheme);

		if (theme !== toTheme) {
			setThemeState(toTheme);
		}
	}
	setTheme(theme);

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
		accent, setAccent,
		page, setPage,
		propogate
	} as any;

	let style = {
		// eslint-disable-next-line
		['--accent-color']: accent
	} as CSSProperties;

	return (
		<div className={`theme-${theme} ${styles.app}`} style={style}>
			<Helmet>
				<meta name="theme-color" content={accent} />
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