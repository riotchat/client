import React from 'react';
import styles from './Friend.module.scss';
import classNames from 'classnames';

import { User } from 'riotchat.js';
import { Icon } from '../../components/ui/elements/Icon';

interface FriendProps {
	user: User,
	onClick: () => void
};

export default function Friend(props: FriendProps) {
	let user = props.user;

	function onRemove() {}
	function onAccept() {}
	function onDecline() {}
	function onCancel() {}

	return (
		<div className={styles.friend} onClick={props.onClick}>
			<div className={styles.name}>
				<div className={styles.avatar} style={{backgroundImage: `url(${user.avatarURL})`}}>
					<span className={classNames(styles.indicatorMobile, styles[user.status])} />
				</div>
				<div className={styles.flexColumn}>
					<div style={{ display: "flex", alignItems: "center"}}>
						<span className={styles.username}>
							{user.username}
							<Icon className={styles.mobileIndicator} icon="mobileRegular"/>
						</span>
					</div>
					<span className={styles.statusText}>{user.status}</span>
				</div>
				{ user.relation === 'active' && (
					<div className={styles.status}>
						<span className={classNames(styles.indicator, styles[user.status])} />
						<span className={styles.statusText}>{user.status}</span>
					</div>
				)}
			</div>
			{ user.relation === 'active' && (
				<div className={`${styles.buttons} ${styles.desktopOnly}`}>
					<div className={styles.call}>
						<Icon icon="phoneCallSolid" />
					</div>
					<div className={styles.videochat}>
						<Icon icon="videoSolid" />
					</div>
					<div className={styles.remove} onClick={onRemove}>
						<Icon icon="userMinusSolid" />
					</div>
				</div>
			)}
			{ user.relation === 'active' ? (
				<div className={styles.mobileStatus}>
					<span className={classNames(styles.indicator, styles[user.status])} />
				</div>
			) : (
				<div className={styles.buttons}>
					{ user.relation === 'incoming' ? ([
						<div className={styles.accept} onClick={onAccept}>
							<Icon icon="userPlusSolid" />
						</div>,
						<div className={styles.decline} onClick={onDecline}>
							<Icon icon="userXSolid" />
						</div>
					]) : (
						<div className={styles.cancel} onClick={onCancel}>
							<Icon icon="xRegular"/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}