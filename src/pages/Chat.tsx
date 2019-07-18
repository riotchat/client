import React, { createContext, useState } from 'react';
import Helmet from 'react-helmet';
import styles from './Chat.module.scss';

import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';
import Browser from './chat/sidebar/Browser';
import { Profile } from './chat/sidebar/conversation/Profile';

export enum Page {
	GUILD, // switches to guild specific sidebar
	GROUP,
	// ^^ both enable member sidebar
	DM,
	HOME,
	FEED,
	FRIENDS
};

export const ChatContext = createContext<{
	page: Page,
	setPage: (page: Page) => void,
	channel?: string,
	setChannel: (channel: string) => void
}>({
	page: Page.HOME,
	setPage: () => {},
	setChannel: () => {}
});

export default function Chat() {
	let [ page, setPage ] = useState<Page>(Page.FRIENDS);
	let [ channel, setChannel ] = useState<string>();

	let states = {
		page, setPage,
		channel, setChannel
	} as any;

	return (
		<ChatContext.Provider value={states}>
		<Helmet>
			<meta name="theme-color" content="#333234"/>
		</Helmet>
			<div className={styles.chat}>
				<div className={styles.sidebar}>
					<Browser />
					<div className={styles.conversation}>
						{ page ? <HomeSidebar /> : <GuildSidebar /> }
						<Profile />
					</div>
				</div>
				<div className={styles.main}>
					yeet
				</div>
			</div>
		</ChatContext.Provider>
	);
}