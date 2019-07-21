import React, { useState, createContext, useContext } from 'react';
import Helmet from 'react-helmet';
import styles from './Settings.module.scss';
import classNames from 'classnames';

import { SettingsSidebar } from './settings/Sidebar';
import { scrollable } from '../components/util/Scrollbar';
import { Icon } from '../components/ui/elements/Icon';
import { AppContext, Page as AppPage } from '../App';

export enum Page {
	ACCOUNT
};

const PageTitles: { [key in Page]: string } = {
	[Page.ACCOUNT]: 'Account'
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

	return (
		<SettingsContext.Provider value={states}>
			<Helmet>
				<meta name="theme-color" content="#212121"/> {/*Change content to the same color as theme*/}
			</Helmet>
			<div className={styles.settings}>
				<div className={styles.header}>
					{ showContent ? <Icon className={styles.close} icon="leftArrowAltRegular" onClick={doClose} />
					: <Icon className={styles.close} icon="xRegular" onClick={doClose} /> }
					<span className={styles.title}>{showContent ? PageTitles[tab] : 'Settings'}</span>
					<Icon icon="logoutRegular" onClick={() => alert('no leaving this place')}/>
				</div>
				<div className={styles.main}>
					<SettingsSidebar />
					<div className={content}>
						yeet yeet yeet
					</div>
				</div>
			</div>
		</SettingsContext.Provider>
	);
}