import React from 'react';
import main from '../index.module.scss';
import styles from './Account.module.scss';

import { Button } from '../../../../components/ui/elements/Button';
import { Instance } from '../../../../internal/Client';

export default function Account() {
	return (
		<div className={styles.panel}>
				<div className={main.section}>
					<div className={styles.account}>
						<div className={styles.pfp} style={{ backgroundImage: `url("${Instance.client.user.avatarURL}")` }}>
							<div className={styles.edit}>
							</div>
						</div>
						<div className={styles.details}>
							<span className={styles.name}>{Instance.client.user.username}</span>
							<span className={styles.id}>
								<span className={styles.title}>UID</span>
								<span className={styles.copy}>{Instance.client.user.id}</span>
							</span>
									<span className={styles.infoTitle}>E-Mail</span>
									<span className={styles.copy}>{Instance.client.user.email}</span>
						</div>
						<Button theme="confirm">Edit</Button>
					</div>
					<Button theme="confirm">Edit</Button>
				</div>
				{/*!this.state.options.streamerMode.enabled && ( <div className={`${main.section} ${styles.mobile}`}>
					<div className={main.category}>UID
					</div>
					<span className={styles.copy}>{Instance.client.user.id}</span>
				</div> )*/}
				<div className={main.section}>
					<div className={main.category}>2FA Authentication</div>
					<div className={styles.securityEnabled}>
						<span>2FA has been enabled on this account.</span>
					</div>
					<Button theme="confirm">View Backup Codes</Button>
					<Button theme="confirm">Disable 2FA</Button>
				</div>
				<div className={main.section}>
					<div className={main.category}>Pending Community Strikes</div>
					<div className={styles.timeline}>
						<div className={styles.strike}>
							<div className={styles.date}>02/07/2019</div>
							<div className={styles.title}>Strike<span className={styles.count}>2</span></div>
							<div className={styles.details}>You have been issued a warning by a community moderator for playing Fortnite on a public server.</div>
							<div className={styles.expires} style={{color: "red", fontWeight: "bold"}}>This is your last warning — your account may get suspended if you get one more strike this month.</div>
							<div className={styles.expires}>Expires 01/08/2019</div>
						</div>
						<div className={styles.strike}>
							<div className={styles.date}>02/07/2019</div>
							<div className={styles.title}>Strike<span className={styles.count}>1</span></div>
							<div className={styles.details}>You have been issued a warning by a community moderator for playing Fortnite on a public server.</div>
							<div className={styles.expires}>Expires 01/08/2019</div>
						</div>
					</div>
				</div>
				<div className={main.section}>
					<div className={main.category}>Account Management</div>
					<div>
						<Button theme="confirm">Disable Account</Button>
						<Button theme="warning">Delete Account</Button>
					</div>
				</div>
			</div>
	);
}