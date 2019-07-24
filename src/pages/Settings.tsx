import React, { useState, createContext, useContext, CSSProperties } from 'react';
import Helmet from 'react-helmet';
import styles from './Settings.module.scss';
import classNames from 'classnames';

import { SettingsSidebar } from './settings/Sidebar';
import { scrollable } from '../components/util/Scrollbar';
import { Icon } from '../components/ui/elements/Icon';
import { AppContext, Page as AppPage } from '../App';
import { RenderPage } from './settings/pages';
import Modal from '../components/ui/components/Modal';
import { LogoutClient } from '../internal/Client';
import { useVar } from '../components/util/CSS';

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
	setShown: (show: boolean) => void,
	setLogoutModal: (show: boolean) => void
}>({
	tab: Page.ACCOUNT,
	setTab: () => {},
	showContent: false,
	setShown: () => {},
	setLogoutModal: () => {}
});

export function Settings() {
	let app = useContext(AppContext);
	let [ tab, setTab ] = useState(Page.ACCOUNT);
	let [ showContent, setShown ] = useState(false);
	let [ showLogout, setLogoutModal ] = useState(false);

	let content = classNames({
		[styles.content]: true,
		[styles.shown]: showContent,
		[scrollable]: true
	});

	const states = {
		tab, setTab,
		showContent, setShown,
		setLogoutModal
	} as any;

	function doClose(force?: any) {
		if (showContent && force !== true) {
			setShown(false);
		} else {
			app.setPage(AppPage.APP);
		}
	}

	function doLogout() {
		app.setPage(AppPage.LOGIN);
		LogoutClient();
	}

	let doHideTitle: CSSProperties = {
		display: (tab === Page.ACCOUNT ||
				tab === Page.PRO) ?
					'none' : undefined
	};

	let [ color, processRef ] = useVar('secondary');
	return (
		<SettingsContext.Provider value={states}>
			<Helmet>
				<meta name="theme-color" content={color || '#000000'}/>
			</Helmet>
			<div className={styles.settings} ref={ref => processRef(ref)}>
				<div className={styles.header}>
					{ showContent ? <Icon className={styles.x} icon="leftArrowAltRegular" onClick={doClose} />
					: <Icon className={styles.x} icon="xRegular" onClick={doClose} /> }
					<span className={styles.title}>{showContent ? PageTitles[tab] : 'Settings'}</span>
					<Icon icon="logoutRegular" onClick={() => setLogoutModal(true)}/>
				</div>
				<div className={styles.main}>
					<SettingsSidebar />
					<div className={content}>
						<div className={styles.primary}>
							<div className={styles.title} style={doHideTitle}>{PageTitles[tab]}</div>
							{RenderPage(tab)}
						</div>
						<div className={styles.close}>
							<Icon icon="xRegular" onClick={() => doClose(true)} />
						</div>
					</div>
				</div>
				{ showLogout && <Modal
							title='Are you sure?'
							buttons={[
								{
									type: 'warning',
									value: 'Logout',
									handler: doLogout
								},
								{
									close: true,
									value: 'Cancel'
								}
							]}
							dismiss={() => setLogoutModal(false)}
							allowClose={true}>
						You will be logged out of your RIOT account.
					</Modal> }
			</div>
		</SettingsContext.Provider>
	);
}