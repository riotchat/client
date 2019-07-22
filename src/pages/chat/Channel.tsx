import React, { useContext, useState, useEffect } from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames';

import { ChatContext, Page } from '../Chat';
import { Channel as RChannel, Collection } from 'riotchat.js';
import { Instance } from '../../internal/Client';
import { Message } from 'riotchat.js/dist/internal/Message';
import { scrollable, hiddenScrollbar } from '../../components/util/Scrollbar';

export default function Channel(props: { id: string }) {
	let chat = useContext(ChatContext);
	let channel: RChannel = Instance.client.channels.get(chat.channel as string) as any;
	let [ synced, setSynced ] = useState(false);

	useEffect(() => {
		if (!synced) {
			channel.fetchMessages()
				.then(() => setSynced(true));
		}
	}, [chat.channel, channel, synced]);

	let sidebar = classNames({
		[styles.sidebar]: true,
		[styles.visible]: !!((Page.GROUP | Page.GUILD) & chat.page)
	});

	let messages = (channel.messages as Collection<string, Message>).array();
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				channel id = {channel.id}
			</div>
			<div className={styles.body}>
				<div className={styles.chat}>
					<div className={classNames(styles.messages, scrollable)}>
						{ messages.map(m => <p>{m.author.username}: {m.content}</p>) }
					</div>
					<div className={styles.messageBox}>
						box
					</div>
				</div>
				<div className={classNames(sidebar, hiddenScrollbar)}>
					sidebar time
				</div>
			</div>
		</div>
	);
}