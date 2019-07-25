import React, { Fragment, useState, useContext } from 'react';
import styles from './Friends.module.scss';

import { Instance } from '../../internal/Client';
import SwipeableViews from 'react-swipeable-views';
import { User } from 'riotchat.js';
import Tabs from '../../components/ui/components/Tabs';
import { ChatContext, Page } from '../Chat';

function renderList(condition: (user: User) => boolean, switchTo: (user: User) => void) {
	return <Fragment> { 
		Instance.client.users
			.array()
			.filter(condition)
			.map(u =>
				<div onClick={async () => switchTo(u)}>{u.username} ({u.status})</div>)
	} </Fragment>;
}

export default function Friends() {
	let chat = useContext(ChatContext);

	let [ index, setIndex ] = useState(0);
	let [ requestIndex, setRequestIndex ] = useState(0);

	async function switchTo(user: User) {
		let channel = await user.openDM();
		chat.switch(
			Page.DM,
			channel.id
		);
	}

	return (
		<Fragment>
			<Tabs index={index} setIndex={setIndex}>
				<Fragment>Online</Fragment>
				<Fragment>All</Fragment>
				<Fragment>Requests</Fragment>
			</Tabs>
			<SwipeableViews index={index} onChangeIndex={setIndex} className={styles.container}>
				{ renderList(u => u.relation === 'active' && u.status !== 'offline', switchTo) }
				{ renderList(u => u.relation === 'active', switchTo) }
				<Fragment>
					<Tabs index={requestIndex} setIndex={setRequestIndex}>
						<Fragment>PENDING</Fragment>
						<Fragment>INCOMING</Fragment>
					</Tabs>
					<SwipeableViews index={requestIndex} onChangeIndex={setRequestIndex}
							className={styles.container}>
						{ renderList(u => u.relation === 'pending', switchTo) }
						{ renderList(u => u.relation === 'incoming', switchTo) }
					</SwipeableViews>
				</Fragment>
			</SwipeableViews>
		</Fragment>
	);
}