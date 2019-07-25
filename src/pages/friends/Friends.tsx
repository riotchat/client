import React, { Fragment, useState } from 'react';
//import styles from './Friends.module.scss';

import { Instance } from '../../internal/Client';
import SwipeableViews from 'react-swipeable-views';
import { User } from 'riotchat.js';
import Tabs from '../../components/ui/components/Tabs';

function renderList(condition: (user: User) => boolean) {
	return <Fragment> { 
		Instance.client.users
			.array()
			.filter(condition)
			.map(u =>
				<div>{u.username} ({u.status})</div>)
	} </Fragment>;
}

export default function Friends() {
	let [ index, setIndex ] = useState(0);
	let [ requestIndex, setRequestIndex ] = useState(0);

	return (
		<Fragment>
			<Tabs index={index} setIndex={setIndex}>
				<Fragment>ONLINE</Fragment>
				<Fragment>ALL</Fragment>
				<Fragment>REQUESTS</Fragment>
			</Tabs>
			<SwipeableViews index={index} onChangeIndex={setIndex}>
				{ renderList(u => u.relation === 'active' && u.status !== 'offline') }
				{ renderList(u => u.relation === 'active') }
				<Fragment>
					<Tabs index={requestIndex} setIndex={setRequestIndex}>
						<Fragment>PENDING</Fragment>
						<Fragment>INCOMING</Fragment>
					</Tabs>
					<SwipeableViews index={requestIndex} onChangeIndex={setRequestIndex}>
						{ renderList(u => u.relation === 'pending') }
						{ renderList(u => u.relation === 'incoming') }
					</SwipeableViews>
				</Fragment>
			</SwipeableViews>
		</Fragment>
	);
}