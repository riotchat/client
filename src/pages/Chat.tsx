import React, { createContext, useState } from 'react';
import styles from './Chat.module.scss';

import { Icon } from '../components/ui/elements/Icon';
import { hiddenScrollbar } from '../components/util/Scrollbar';
import { Guild } from './chat/sidebar/Guild';
import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';
import Browser from './chat/sidebar/Browser';

export const ChatContext = createContext({});

export enum Page {
	GUILD, // enables right sidebar, sets left sidebar to channels
	HOME,
	FEED,
	FRIENDS
};

export default function Chat() {
	let [ page ] = useState<string | Page>(Page.FRIENDS);

	return (
		<ChatContext.Provider value={{}}>
			<div className={styles.chat}>
				<div className={styles.sidebar}>
					<Browser />
					<div className={styles.conversation}>
						{ page ? <HomeSidebar /> : <GuildSidebar /> }
					</div>
				</div>
				<div className={styles.main}>
					yeet
				</div>
			</div>
		</ChatContext.Provider>
	);
}