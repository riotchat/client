import React, { memo, ReactNode, useContext } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

import logo from '../../../assets/downloads/branding/logo-white-full.svg';

import { Icons, Icon } from '../../../components/ui/elements/Icon';
import { SettingsContext, Page } from '../../Settings';
import { Instance } from '../../../internal/Client';
import { scrollable } from '../../../components/util/Scrollbar';
import { VERSION } from '../../../release';

export const SettingsSidebar = memo(() => {
	let settings = useContext(SettingsContext);

	function Section(props: { title: string, children: ReactNode[] }) {
		return (
			<div className={styles.section}>
				<span className={styles.name}>{props.title}</span>
				{props.children}
			</div>
		);
	}

	function Label(props: { type: 'pro' | 'beta' }) {
		let classes = classNames(styles.tag, styles[props.type]);
		return <span className={classes}>{ props.type }</span>;
	}

	function Tab(props: { icon: Icons, for?: Page, name?: string, children?: ReactNode[] | ReactNode, beta?: boolean }) {
		let classes = classNames({
			[styles.tab]: true,
			[styles.canHide]: props.for === Page.ACCOUNT
		});

		return (
			<div className={classes} onClick={() => {
				settings.setShown(true);
				props.for && settings.setTab(props.for);
			}}>
				<Icon icon={props.icon} />
				{props.name || props.children}
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
				<Section title="user settings">
					<Tab icon="idCardSolid" name="My Account" for={Page.ACCOUNT} />
					<Tab icon="shieldSolid" name="Authorized Apps" />
					<Tab icon="extensionSolid" name="Integrations" beta/>
				</Section>
                <Section title="riot pro">
					<Tab icon="idCardSolid" name="Riot PRO" />
					<Tab icon="cardSolid" name="Billing" />
				</Section>
                <Section title="client settings">
					<Tab icon="microphoneSolid" name="Voice & Video" />
					<Tab icon="brushSolid" name="Appearance" />
                    <Tab icon="bodyRegular" name="Accessibility" />
                    <Tab icon="slideshowSolid" name="Streamer Mode" beta/>
                    <Tab icon="globeRegular" name="Language" />
					<Tab icon="wrenchSolid" name="Developer Mode" />
				</Section>
				<Section title="about">
					<Tab icon="infoCircleSolid" name="About" />
                    <Tab icon="fileRegular" name="Changelog" />
                    <Tab icon="helpCircleSolid" name="Support" />
					<Tab icon="megaphoneSolid" name="Feedback" />
				</Section>
				<Tab icon="logoutRegular" name="Log Out" />
				<div className={styles.branding}>
					<img src={logo} alt='Riot' draggable={false}/>
					<span>Version {VERSION}</span>
				</div>
			</div>
		</div>
	);
},
() => false);