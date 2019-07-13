import React, { useState } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import styles from './Load.module.scss';
import Logo from '../assets/downloads/branding/logo-gradient-full.svg';

export default function Load(props: { waitForClient: boolean }) {
	let [ bound, setBound ] = useState(false);

	function bind(setPage: (page: Page) => void) {
		if (bound) return;
		setBound(true);

		Instance.client.once('connected', () => setPage(Page.APP));
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.preloader}>
				<img alt="RIOT" className={styles.image} src={Logo} />
				<div className={styles.spinner}>
					<div className={styles.bounce1}></div>
					<div className={styles.bounce2}></div>
					<div className={styles.bounce3}></div>
				</div>
			</div>

			{
				props.waitForClient && 
				<AppContext.Consumer>
					{ app => bind(app.setPage) }
				</AppContext.Consumer>
			}
		</div>
	);
}