import React, { createContext, useState, memo, useEffect } from 'react';
import Helmet from 'react-helmet';
import styles from './Chat.module.scss';

import { SwipeableDrawer } from 'flatbase/dist';
import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';
import Browser from './chat/sidebar/Browser';
import { Profile } from './chat/sidebar/conversation/Profile';
import Channel from './chat/Channel';	

export enum Page {
	GUILD = 0x1, // switches to guild specific sidebar
	GROUP = 0x1 << 1,
	// ^^ both enable member sidebar
	DM = 0x1 << 2,
	HOME = 0x1 << 3,
	FEED = 0x1 << 4,
	FRIENDS = 0x1 << 5
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

const Chat = memo(() => {
	let [ page, setPage ] = useState<Page>(Page.FRIENDS);
	let [ channel, setChannel ] = useState<string>();
	let [ drawer, setDrawer ] = useState(false);

	useEffect(() => setDrawer(false), [page, channel]);

	let states = {
		page, setPage,
		channel, setChannel
	} as any;

	let body;
	if (page & 0x7) {
		// display a channel
		body = <Channel id={channel as string} />;
	} else {
		// other things
		body = <div>other things yes</div>;
	}

	return (
		<ChatContext.Provider value={states}>
		<Helmet>
			<meta name="theme-color" content="#333234"/>
		</Helmet>
			<div className={styles.chat}>
				<SwipeableDrawer className={styles.sidebar} open={drawer}
					onChange={setDrawer} closeOnOpacityClick={true}>
					<Browser />
					<div className={styles.conversation}>
						{ page ? <HomeSidebar /> : <GuildSidebar /> }
						<Profile />
					</div>
				</SwipeableDrawer>
				<div className={styles.main}>
					{ body }
				</div>
			</div>
		</ChatContext.Provider>
	);
});

export default Chat;