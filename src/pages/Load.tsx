import React, { useState, useContext, useEffect } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import styles from './Load.module.scss';
import Logo from '../assets/downloads/branding/logo-gradient-full.svg';

export default function Load(props: { waitForClient: boolean }) {
	let [ bound, setBound ] = useState(false);
	let app = useContext(AppContext);

	useEffect(() => {
		if (props.waitForClient) {
			if (bound) return;
			setBound(true);

			Instance.client.once('connected', () => {
				app.setPage(Page.APP);
			});

			Instance.client.once('error', () => {
				app.setPage(Page.LOGIN);
			});
		}
	}, [props.waitForClient, bound, app]);

	return (
		<div className={styles.container}>
			<div className={styles.preloader}>
				<img alt="Riot" className={styles.image} src={Logo}/>
				<div className={styles.spinner}>
					<div className={styles.bounce1}/>
					<div className={styles.bounce2}/>
					<div className={styles.bounce3}/>
				</div>
			</div>
		</div>
	);
}