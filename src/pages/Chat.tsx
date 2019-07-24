import React, { createContext, useState, memo } from 'react';
import Helmet from 'react-helmet';
import styles from './Chat.module.scss';

import { SwipeableDrawer } from 'flatbase/dist';
import { useCheckWidth } from 'flatbase/dist/util';

import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';
import Browser from './chat/sidebar/Browser';
import { Profile } from './chat/sidebar/conversation/Profile';
import Channel from './chat/Channel';	
import { useVar } from '../components/util/CSS';

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
	setChannel: (channel: string) => void,
	setDrawer: (open: boolean) => void
}>({
	page: Page.HOME,
	setPage: () => {},
	setChannel: () => {},
	setDrawer: () => {}
});

const Chat = memo(() => {
	let [ page, setPage ] = useState<Page>(Page.FRIENDS);
	let [ channel, setChannel ] = useState<string>();
	let [ drawer, setDrawer ] = useState(false);

	let states = {
		page, setPage,
		channel, setChannel,
		setDrawer
	} as any;

	let body;
	if (page & 0x7) {
		// display a channel
		body = <Channel id={channel as string} />;
	} else if (page & Page.HOME) {
		body = <div>home-y</div>;
	} else if (page & Page.FEED) {
		body = <div>feedy</div>;
	} else if (page & Page.FRIENDS) {
		body = <div>you have no friends lol</div>;
	}

	let is900 = useCheckWidth(900);
	let [ color, processRef ] = useVar('primary');
	return (
		<ChatContext.Provider value={states}>
			<Helmet>
				<meta name="theme-color" content={color || '#000000'}/>
			</Helmet>
			<div className={styles.chat} ref={ref => processRef(ref)}>
				<SwipeableDrawer open={drawer} onChange={setDrawer}
						closeOnOpacityClick={true} variant={is900 ? 'permanent' : 'temporary'}>
					<div className={styles.sidebar}>
						<Browser />
						<div className={styles.conversation}>
							{ page ? <HomeSidebar /> : <GuildSidebar /> }
							<Profile />
						</div>
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