import React, { memo, ReactNode, useContext } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames';

import logo from '../../assets/downloads/branding/logo-white-full.svg';

import { Icons, Icon } from '../../components/ui/elements/Icon';
import { SettingsContext, Page, PageTitles } from '../Settings';
import { Instance } from '../../internal/Client';
import { scrollable } from '../../components/util/Scrollbar';
import { VERSION } from '../../release';

export const SettingsSidebar = memo(() => {
	let settings = useContext(SettingsContext);

	function Section(props: { title: string, children: ReactNode[] }) {
		return (
			<div className={styles.section} aria-label={props.title}>
				<div className={styles.name}>{props.title}</div>
				{props.children}
			</div>
		);
	}

	function Label(props: { type: 'pro' | 'beta' }) {
		let classes = classNames(styles.tag, styles[props.type]);
		return <span className={classes}>{ props.type }</span>;
	}

	function Tab(props: { icon: Icons, for?: Page, custom?: boolean, children?: ReactNode[] | ReactNode, beta?: boolean, classes?: any, canHide?: boolean, onClick?: Function }) {
		let classes = classNames(props.classes, {
			[styles.tab]: true,
			[styles.canHide]: props.canHide
		});

		let name = typeof props.for === 'undefined' ? undefined : PageTitles[props.for];
		return (
			<div className={classes} aria-label={name} onClick={() => {
				props.onClick && props.onClick();
				if (typeof props.for === 'undefined') return;
				settings.setShown(true);
				settings.setTab(props.for);
			}}>
				<Icon icon={props.icon} />
				{props.custom ? props.children : name}
				{props.beta && <Label type='beta' />}
			</div>
		);
	}
	
	let classes = classNames({
		[styles.sidebar]: true,
		[styles.shown]: !settings.showContent,
		[scrollable]: true
	});

	return (
		<div className={classes}>
			<div className={styles.wrapper}>
				<div className={styles.account} onClick={() => {
					settings.setShown(true);
					settings.setTab(Page.ACCOUNT);
				}}>
					<div className={styles.pfp} style={{backgroundImage: `url("${Instance.client.user.avatarURL}")`}}/>
						<div className={styles.details}>
						<span className={styles.username}>{Instance.client.user.username}</span>
						<span className={styles.email}>E-Mail:</span>
						<span className={styles.address}>{Instance.client.user.email}</span>
					</div>
				</div>
				<Section title="User Settings">
					<Tab icon="idCardSolid" for={Page.ACCOUNT} canHide />
					<Tab icon="shieldSolid" for={Page.APPS} />
					<Tab icon="extensionSolid" for={Page.INTEGRATIONS} beta />
				</Section>
                <Section title="Riot PRO">
					<Tab icon="idCardSolid" classes={styles.pro} for={Page.PRO} custom>
						RIOT IMAGE HERE
						<Label type='pro' />
					</Tab>
					<Tab icon="cardSolid" for={Page.BILLING} />
				</Section>
                <Section title="Client Settings">
					<Tab icon="microphoneSolid" for={Page.VOICE} />
					<Tab icon="brushSolid" for={Page.APPEARANCE} />
                    <Tab icon="bodyRegular" for={Page.ACCESSIBILITY} />
                    <Tab icon="slideshowSolid" for={Page.STREAMER} beta/>
                    <Tab icon="globeRegular" for={Page.LANGUAGE} />
					<Tab icon="wrenchSolid" for={Page.DEVELOPER} />
				</Section>
				<Section title="About">
					<Tab icon="infoCircleSolid" for={Page.ABOUT} />
                    <Tab icon="fileRegular" for={Page.CHANGELOG} />
                    <Tab icon="helpCircleSolid" for={Page.SUPPORT} />
					<Tab icon="megaphoneSolid" for={Page.FEEDBACK} />
				</Section>
				<Tab icon="logoutRegular" classes={styles.logoutButton} onClick={() => settings.setLogoutModal(true)} custom canHide>
					Logout
				</Tab>
				<div className={styles.branding}>
					<img src={logo} alt='Riot' draggable={false}/>
					<span>Version {VERSION}</span>
				</div>
			</div>
		</div>
	);
},
() => false);