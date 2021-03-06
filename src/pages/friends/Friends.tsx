import React, { Fragment, useState, useContext } from 'react';
import styles from './Friends.module.scss';

import { Instance } from '../../internal/Client';
import SwipeableViews from 'react-swipeable-views';
import { User } from 'riotchat.js';
import Tabs from '../../components/ui/components/Tabs';
import { ChatContext, Page } from '../Chat';
import Friend from './Friend';
import MobileHeader from '../../components/ui/components/MobileHeader';

function renderList(condition: (user: User) => boolean, switchTo: (user: User) => void) {
	return <Fragment> { 
		Instance.client.users
			.array()
			.filter(condition)
			.map(u =>
				<Friend user={u}
					onClick={() => switchTo(u)} />)
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
			<MobileHeader
					variant={'chat'}
					icon={'menuRegular'}
					secondaryIcon={['padding']}
					showContentOnDesktop={true}
				>
				<Tabs index={index} setIndex={setIndex}>
					<Fragment>Online</Fragment>
					<Fragment>All</Fragment>
					<Fragment>Requests</Fragment>
				</Tabs>
			</MobileHeader>
			<SwipeableViews index={index} onChangeIndex={setIndex} className={styles.container}>
				{ renderList(u => u.relation === 'active' && u.status !== 'offline', switchTo) }
				{ renderList(u => u.relation === 'active', switchTo) }
				<Fragment>
					{/*<Tabs index={requestIndex} setIndex={setRequestIndex}>
						<Fragment>PENDING</Fragment>
						<Fragment>INCOMING</Fragment>
					</Tabs>*/}
					
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