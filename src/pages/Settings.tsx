import React, { useState, createContext, useContext, CSSProperties } from 'react';
import Helmet from 'react-helmet';
import styles from './Settings.module.scss';
import classNames from 'classnames';

import { SettingsSidebar } from './settings/Sidebar';
import { scrollable } from '../components/util/Scrollbar';
import { Icon } from '../components/ui/elements/Icon';
import { AppContext, Page as AppPage } from '../App';
import { RenderPage } from './settings/pages';

export enum Page {
	ACCOUNT,
	APPS,
	INTEGRATIONS,

	PRO,
	BILLING,

	VOICE,
	APPEARANCE,
	ACCESSIBILITY,
	STREAMER,
	LANGUAGE,
	DEVELOPER,

	ABOUT,
	CHANGELOG,
	SUPPORT,
	FEEDBACK
};

export const PageTitles: { [key in Page]: string } = {
	[Page.ACCOUNT]: 'My Account',
	[Page.APPS]: 'Authorized Apps',
	[Page.INTEGRATIONS]: 'Integrations',

	[Page.PRO]: 'Riot PRO',
	[Page.BILLING]: 'Billing',
	[Page.VOICE]: 'Voice & Video',
	[Page.APPEARANCE]: 'Appearance',
	[Page.ACCESSIBILITY]: 'Accessibility',
	[Page.STREAMER]: 'Streamer Mode',
	[Page.LANGUAGE]: 'Language',
	[Page.DEVELOPER]: 'Developer Mode',
	[Page.ABOUT]: 'About',
	[Page.CHANGELOG]: 'Changelog',
	[Page.SUPPORT]: 'Support',
	[Page.FEEDBACK]: 'Feedback'
};

export const SettingsContext = createContext<{
	tab: Page,
	setTab: (tab: Page) => void,
	showContent: boolean,
	setShown: (show: boolean) => void
}>({
	tab: Page.ACCOUNT,
	setTab: () => {},
	showContent: false,
	setShown: () => {}
});

export function Settings() {
	let app = useContext(AppContext);
	let [ tab, setTab ] = useState(Page.ACCOUNT);
	let [ showContent, setShown ] = useState(false);

	let content = classNames({
		[styles.content]: true,
		[styles.shown]: showContent,
		[scrollable]: true
	});

	const states = {
		tab, setTab,
		showContent, setShown
	} as any;

	function doClose() {
		if (showContent) {
			setShown(false);
		} else {
			app.setPage(AppPage.APP);
		}
	}

	let doHideTitle: CSSProperties = {
		display: (tab === Page.ACCOUNT ||
				tab === Page.PRO) ?
					'none' : undefined
	};

	return (
		<SettingsContext.Provider value={states}>
			<Helmet>
				<meta name="theme-color" content="#212121"/> {/*Change content to the same color as theme*/}
			</Helmet>
			<div className={styles.settings}>
				<div className={styles.header}>
					{ showContent ? <Icon className={styles.x} icon="leftArrowAltRegular" onClick={doClose} />
					: <Icon className={styles.x} icon="xRegular" onClick={doClose} /> }
					<span className={styles.title}>{showContent ? PageTitles[tab] : 'Settings'}</span>
					<Icon icon="logoutRegular" onClick={() => alert('no leaving this place')}/>
				</div>
				<div className={styles.main}>
					<SettingsSidebar />
					<div className={content}>
						<div className={styles.primary}>
							<div className={styles.title} style={doHideTitle}>{PageTitles[tab]}</div>
							{RenderPage(tab)}
						</div>
						<Icon className={styles.close} icon="xRegular" onClick={doClose} />
					</div>
				</div>
			</div>
		</SettingsContext.Provider>
	);
}