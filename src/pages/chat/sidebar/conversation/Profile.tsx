import React, { useContext } from 'react';
import styles from './Profile.module.scss';

import { Instance } from '../../../../internal/Client';
import { Icon } from '../../../../components/ui/elements/Icon';
import { AppContext, Page } from '../../../../App';

export function Profile() {
	let app = useContext(AppContext);
	let user = Instance.client.user;

	return (
		<div className={styles.profile}>
			{/*this.state.statusMenuOpen && <StatusMenu onSet={(status: "online" | "away" | "busy" | "offline") => {
				RiotClient.user.setStatus(status);
				this.setStatusMenu(false);
			}}/>*/}
			<div className={styles.info}>
				<div className={styles.picture} style={{ backgroundImage: `url("${user.avatarURL}")` }}>
					<div className={`${styles.indicator} ${styles[user.status]}`}
						aria-label={user.status}
					/>
				</div>
				<div className={styles.username}>
					<span>{user.username}</span>
					<span className={styles.status}>{ user.status }</span>
				</div>
				<Icon icon="cogSolid" className={styles.settings} onClick={() => app.setPage(Page.SETTINGS)} />
			</div>
		</div>
	);
}