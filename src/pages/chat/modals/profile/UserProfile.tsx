import React from 'react';
import styles from './UserProfile.module.scss';

import classNames from 'classnames';
import Modal from "../../../../components/ui/components/Modal";
import { User } from "riotchat.js";
import MobileHeader from '../../../../components/ui/components/MobileHeader';

interface ProfileProps {
	user: User
	dismiss: () => void
};

export default function UserProfile(props: ProfileProps) {
	let user = props.user;

	var close: () => void;
	return (
		<Modal
				allowClose={true}
				dismiss={props.dismiss}
				closeCB={cb => close = cb}
				canActAsPage={true}
			>
			<div className={styles.root}>
				<MobileHeader
						variant={'chat'}
						icon={'xRegular'}
						onClose={() => close()}
					>
					Profile
				</MobileHeader>
				<div className={styles.profile}>
					<div className={styles.avatar} style={{ backgroundImage: `url('${user.avatarURL}')` }}>
						<div className={classNames(styles.indicator, styles[user.status])} />
					</div>
					<div className={styles.info}>
						<div className={styles.username}>{ user.username }</div>
						<div className={styles.status}>Currently playing something...</div>
					</div>
				</div>
				<div className={styles.container}>
						test
						test
						test
						test
						test
						test
						test
					</div>
			</div>
		</Modal>
	);
}