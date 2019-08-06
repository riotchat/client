import React, { useState, createContext, useContext, CSSProperties, useEffect } from 'react';
import Helmet from 'react-helmet';
import styles from './Settings.module.scss';
import classNames from 'classnames';

import { SettingsSidebar } from './settings/Sidebar';
import { scrollable } from '../components/util/Scrollbar';
import { Icon } from '../components/ui/elements/Icon';
import { AppContext, Page as AppPage } from '../App';
import { RenderPage } from './settings/pages';
import Alert from '../components/ui/components/Alert';
import { LogoutClient } from '../internal/Client';
import { useVar } from '../components/util/CSS';
import { useAnimator, Animation } from '../scss/animations';
import MobileHeader from '../components/ui/components/MobileHeader';
import { useMediaQuery } from '@material-ui/core';

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

	let [ animation, playAnimation ] = useAnimator(Animation.PAGE_IN, 200);

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

	let isDesktop = useMediaQuery('(min-width: 900px)');
	function doClose() {
		if (showContent && !isDesktop) {
			setShown(false);
		} else {
			playAnimation(Animation.PAGE_OUT, 200)
				.then(() => app.setPage(AppPage.APP));
		}
	}

	function checkESC(e: KeyboardEvent) {
		if (e.keyCode === 27) {
			doClose();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', checkESC);
		return () => document.removeEventListener('keydown', checkESC);
	});

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
			<div className={styles.settings} ref={ref => processRef(ref)} style={animation.styles}>
				<MobileHeader
						icon={showContent ? 'leftArrowAltRegular' : 'xRegular'}
						onClose={doClose}
						secondaryIcon={['logoutRegular']}
						onAction={[() => setLogoutModal(true)]}
					>
					{ showContent ? PageTitles[tab] : 'Settings' }
				</MobileHeader>
				<div className={styles.main}>
					<SettingsSidebar />
					<div className={content}>
						<div className={styles.primary}>
							<div className={styles.title} style={doHideTitle}>{PageTitles[tab]}</div>
							{RenderPage(tab)}
						</div>
						<div className={styles.close}>
							<Icon icon="xRegular" onClick={() => doClose()} />
						</div>
					</div>
				</div>
				{ showLogout && <Alert
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
					</Alert> }
			</div>
		</SettingsContext.Provider>
	);
}