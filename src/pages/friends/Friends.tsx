import React, { Fragment, useState } from 'react';
import styles from './Friends.module.scss';

import { Instance } from '../../internal/Client';
import SwipeableViews from 'react-swipeable-views';
import { User } from 'riotchat.js';

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

	return (
		<Fragment>
			<div className={styles.tabs}>
				<span onClick={() => setIndex(0)} data-active={index === 0}>ONLINE</span>
				<span onClick={() => setIndex(1)} data-active={index === 1}>ALL</span>
				<span onClick={() => setIndex(2)} data-active={index === 2}>PENDING</span>
			</div>
			<SwipeableViews index={index} onChangeIndex={setIndex}>
				{ renderList(u => u.relation === 'active' && u.status !== 'offline') }
				{ renderList(u => u.relation === 'active') }
				{ renderList(u => u.relation === 'pending' || u.relation === 'incoming') }
			</SwipeableViews>
		</Fragment>
	);
}