import React, { useContext, useState, useEffect, createContext } from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames';

import { ChatContext, Page } from '../Chat';
import { Channel as RChannel, Collection } from 'riotchat.js';
import { Instance } from '../../internal/Client';
import { Message as RMessage } from 'riotchat.js/dist/internal/Message';
import { scrollable } from '../../components/util/Scrollbar';
import Header from './channel/Header';
import MessageList from './channel/MessageList';
import { GroupChannel, DMChannel } from 'riotchat.js/dist/internal/Channel';
import MessageBox from '../../components/ui/elements/MessageBox';
import MembersSidebar from './sidebar/members/Members';

export type channelContext = {
	channel: RChannel,
	sidebar: boolean,
	setSidebar: (state: boolean) => void
};
export const ChannelContext = createContext<channelContext | undefined>(undefined);

export default function Channel(props: { id: string }) {
	let chat = useContext(ChatContext);
	let channel: RChannel = Instance.client.channels.get(chat.channel as string) as any;

	let [ synced, setSynced ] = useState(false);
	let [ sidebar, setSidebar ] = useState(true);

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

	async function sendMessage(message: string) {
		forceUpdate();
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

	let messages = (channel.messages as Collection<string, RMessage>).array();
	return (
		<ChannelContext.Provider value={{ channel, sidebar, setSidebar }}>
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
							<MessageBox send={sendMessage}
								placeholder={'Message ' +
									( channel instanceof DMChannel ? '@' + channel.recipient.username : 
									  channel instanceof GroupChannel ? channel.group.displayTitle :
									  'guild' )} />
						</div>
					</div>
					{ !!((Page.GROUP | Page.GUILD) & chat.page) && <MembersSidebar show={sidebar} /> }
				</div>
			</div>
		</ChannelContext.Provider>
	);
}