import React, { memo, ReactNode } from 'react';
import styles from './index.module.scss';
import { Icons, Icon } from '../../../components/ui/elements/Icon';

export const SettingsSidebar = memo(() => {
	function Section(props: { title: string, children: ReactNode[] }) {
		return (
			<div className={styles.section}>
				<h5>{props.title}</h5>
				{props.children}
			</div>
		);
	}

	function Entry(props: { icon: Icons, name: string }) {
		return (
			<div className={styles.entry}>
				<Icon icon={props.icon} />
				{props.name}
			</div>
		);
	}

	return (
		<div className={styles.sidebar}>
			<div>
				<Section title="user settings">
					<Entry icon="idCardSolid" name="My Account" />
					<Entry icon="shieldSolid" name="Authorized Apps" />
				</Section>
                <Section title="riot pro">
					<Entry icon="idCardSolid" name="Riot PRO" />
					<Entry icon="shieldSolid" name="Billing" />
				</Section>
                <Section title="client settings">
					<Entry icon="microphoneSolid" name="Voice & Video" />
					<Entry icon="shieldSolid" name="Appearance" />
                    <Entry icon="shieldSolid" name="Accessibility" />
                    <Entry icon="shieldSolid" name="Streamer Mode" />
                    <Entry icon="shieldSolid" name="Appearance" />
				</Section>
			</div>
		</div>
	);
},
() => false);