import React, { useContext, useState, useEffect, FormEvent, createContext } from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { SwipeableDrawer } from 'flatbase';

import { ChatContext, Page } from '../Chat';
import { Channel as RChannel, Collection } from 'riotchat.js';
import { Instance } from '../../internal/Client';
import { Message as RMessage } from 'riotchat.js/dist/internal/Message';
import { scrollable, hiddenScrollbar } from '../../components/util/Scrollbar';
import { Input } from '../../components/ui/elements/Input';
import Header from './channel/Header';
import MessageList from './channel/MessageList';
import { GroupChannel } from 'riotchat.js/dist/internal/Channel';
import { SidebarEntry } from './sidebar/global/Entry';

export const ChannelContext = createContext<RChannel | undefined>(undefined);

export default function Channel(props: { id: string }) {
	let chat = useContext(ChatContext);
	let channel: RChannel = Instance.client.channels.get(chat.channel as string) as any;

	let [ synced, setSynced ] = useState(false);
	let [ message, setMessage ] = useState('');
	let [ drawer, setDrawer ] = React.useState(false);

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	useEffect(() => {
		Instance.client.on('message', forceUpdate);
		Instance.client.on('messageUpdate', forceUpdate);

		return (() => {
			Instance.client.removeListener('message', forceUpdate);
			Instance.client.removeListener('messageUpdate', forceUpdate);
		});
	});

	async function sendMessage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage('');
		await channel.send(message);
	}

	useEffect(() => {
		setSynced(false);
	}, [props.id]);

	useEffect(() => {
		if (!synced) {
			channel.fetchMessages()
				.then(() => setSynced(true));
		}
	}, [chat.channel, channel, synced]);

	let sidebar = classNames({
		[styles.sidebar]: true,
		[hiddenScrollbar]: true,
		[styles.visible]: !!((Page.GROUP | Page.GUILD) & chat.page)
	});

	let messages = (channel.messages as Collection<string, RMessage>).array();
	return (
		<ChannelContext.Provider value={channel}>
			<div className={styles.root}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.body}>
					<div className={styles.chat}>
						<div className={classNames(styles.messages, scrollable)}>
							<MessageList messages={messages} />
							<div style={{ float: 'left', clear: 'both' }}
								ref={e => e && e.scrollIntoView()}>
							</div>
						</div>
						<div className={styles.messageBox}>
							<form onSubmit={sendMessage}>
								<Input type='text' value={message} onChange={e => setMessage(e.target.value)} />
							</form>
						</div>
					</div>
					{ !!((Page.GROUP | Page.GUILD) & chat.page) && <MediaQuery maxWidth={900}>
						{ (matches) => (
							<SwipeableDrawer open={drawer} onChange={setDrawer} position="right"
								closeOnOpacityClick={true} variant={matches ? "temporary" : "permanent"}
								style={{ backgroundColor: "var(--primary)" }}
							>
								<div className={sidebar}>
									{
										channel instanceof GroupChannel
										&& channel.group.members
											.array()
											.map(x =>
												<SidebarEntry for={x} />
											)
									}
								</div>
							</SwipeableDrawer>
						)}
					</MediaQuery> }
				</div>
			</div>
		</ChannelContext.Provider>
	);
}