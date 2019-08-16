import React, { useContext, useState, useEffect, createContext, useRef, useLayoutEffect } from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames';

import { ChatContext, Page } from '../Chat';
import { Channel as RChannel, Collection } from 'riotchat.js';
import { Instance } from '../../internal/Client';
import { Message as RMessage } from 'riotchat.js/dist/internal/Message';
import { scrollable } from '../../components/util/Scrollbar';
import Header from './channel/Header';
import MessageList from './channel/MessageList';
import { GroupChannel, DMChannel, GuildChannel } from 'riotchat.js/dist/internal/Channel';
import MessageBox from '../../components/ui/elements/MessageBox';
import MembersSidebar from './sidebar/members/Members';
import { useMediaQuery } from '@material-ui/core';
import { sort } from 'timsort';

export type channelContext = {
	channel: RChannel,
	sidebar: boolean,
	setSidebar: (state: boolean) => void
};
export const ChannelContext = createContext<channelContext | undefined>(undefined);

export default function Channel(props: { id: string }) {
	let chat = useContext(ChatContext);
	let channel: RChannel = Instance.client.channels.get(props.id) as any;

	let isDesktop = useMediaQuery('(min-width: 900px)');
	let [ synced, setSynced ] = useState(false);
	let [ sidebar, setSidebar ] = useState(true);

	useEffect(() => setSidebar(isDesktop), [ isDesktop ]);

	const [state, updateState] = React.useState();
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

	const scrollBottom = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	useEffect(() => {
		if (!synced) {
			channel.fetchMessages()
				.then(() => setSynced(true));
		} else {
			scrollBottom.current.scrollIntoView();
		}
	}, [ chat.channel, channel, synced, scrollBottom ]);

	let messages = (channel.messages as Collection<string, RMessage>).array();
	sort(messages, (a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
	const messageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	let [ scrollInfo ] = useState({ height: 0, bottom: 0 });

	useEffect(() => {
		const { current } = messageRef;
		
		if (scrollInfo.bottom === scrollInfo.height
				|| current.scrollTop === 0)
			current.scrollBy({
				top: current.scrollHeight - scrollInfo.height
			});
	// eslint-disable-next-line
	}, [ state ]);

	useLayoutEffect(() => {
		const { current } = messageRef;

		function doScroll(this: HTMLDivElement) {
			scrollInfo.bottom = this.scrollTop + this.clientHeight;
			scrollInfo.height = this.scrollHeight;
			if (this.scrollTop === 0) {
				channel.fetchMessages({ before: messages[0].id })
					.then(() => forceUpdate());
			}
		}

		current.addEventListener('scroll', doScroll);
		return () => current.removeEventListener('scroll', doScroll);
	// eslint-disable-next-line
	}, [ messageRef, channel, forceUpdate, messages ]);

	return (
		<ChannelContext.Provider value={{ channel, sidebar, setSidebar }}>
			<div className={styles.root}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.body}>
					<div className={styles.chat}>
						<div className={classNames(styles.messages, scrollable)} ref={messageRef}>
							<MessageList messages={messages} />
							<div style={{ float: 'left', clear: 'both' }}
								ref={scrollBottom}>
							</div>
						</div>
						<div className={styles.messageBox}>
							<MessageBox send={sendMessage}
								placeholder={'Message ' +
									( channel instanceof DMChannel ? '@' + channel.recipient.username : 
									  channel instanceof GroupChannel ? channel.group.displayTitle :
									  channel instanceof GuildChannel ? '#' + channel.name : '/dev/null' )} />
						</div>
					</div>
					{ !!((Page.GROUP | Page.GUILD) & chat.page) && <MembersSidebar show={sidebar} /> }
				</div>
			</div>
		</ChannelContext.Provider>
	);
}