import React from 'react';
import styles from './Settings.module.scss';
import { SettingsSidebar } from './settings/sidebar';

export function Settings() {
	return (
		<div className={styles.settings}>
			<SettingsSidebar />
			<div className={styles.content}>content
				
			</div>
		</div>
	);
}