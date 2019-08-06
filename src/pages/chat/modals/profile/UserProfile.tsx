import React, { useState, Fragment } from 'react';
import styles from './UserProfile.module.scss';

import classNames from 'classnames';
import Modal from "../../../../components/ui/components/Modal";
import { User } from "riotchat.js";
import MobileHeader from '../../../../components/ui/components/MobileHeader';
import Tabs from '../../../../components/ui/components/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { scrollable } from '../../../../components/util/Scrollbar';

interface ProfileProps {
	user: User
	dismiss: () => void
};

export default function UserProfile(props: ProfileProps) {
	let [ index, setIndex ] = useState(0);
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
						<div className={styles.status}>Currently playing Overwatch</div>
						<div className={styles.badges}>
							
						</div>
					</div>
				</div>
				<div className={styles.container}>
					<Tabs variant='compact' index={index} setIndex={setIndex} fullWidth>
						<Fragment>User Info</Fragment>
						<Fragment>Mutual Servers</Fragment>
						<Fragment>Mutual Friends</Fragment>
					</Tabs>
					<SwipeableViews index={index} onChangeIndex={setIndex}>
						<Fragment>
							<div className={classNames(styles.view)}>
								<div className={styles.category}>User Bio</div>
									<div className={styles.text}>this is a user bio. there should be a character limit for this {'nice'.repeat(2000)}</div>
								<div className={styles.category}>Showcase</div>
									<div className={styles.text}>here is my toilet paper collection</div>
								<div className={styles.category}>Linked Accounts</div>
									<div className={styles.text}>here is my toilet paper collection</div>
							</div>
						</Fragment>
						<Fragment>
							<div className={styles.view}>
								
							</div>
						</Fragment>
						<Fragment>
							<div className={styles.view}>
								
							</div>
						</Fragment>
					</SwipeableViews>
				</div>
			</div>
		</Modal>
	);
}