import React, { useState, createContext, CSSProperties, useEffect } from 'react';
import Helmet from 'react-helmet';
import styles from './App.module.scss';

import Load from './pages/Load';
import Login from './pages/Login';
import { Instance } from './internal/Client';
import Chat from './pages/Chat';
import { Settings } from './pages/Settings';
import ErrorBoundary from './components/util/ErrorBoundary';

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
	let [ theme, setThemeState ] = useState('light');
	let [ accent, setAccentState ] = useState('#7B68EE');
	let [ page, setPage ] = useState(Page.LOAD);

	function setTheme(toTheme: string) {
		localStorage.setItem('theme', toTheme);
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

	function setAccent(toAccent: string) {
		localStorage.setItem('accent', toAccent);

		if (accent !== toAccent) {
			setAccentState(toAccent);
		}
	}

	setTheme(localStorage.getItem('theme') || theme);
	setAccent(localStorage.getItem('accent') || accent);

	// riotchat.js re-render hook
	let [ dummyValue, doRender ] = useState(false);
	function propogate() {
		doRender(!dummyValue);
	}

	useEffect(() => {
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
	}, [ready]);

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
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
}