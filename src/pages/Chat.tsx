import React, { createContext, useState } from 'react';
import styles from './Chat.module.scss';

import { Icon } from '../components/ui/elements/Icon';
import { hiddenScrollbar } from '../components/util/Scrollbar';
import { Guild } from './chat/sidebar/Guild';
import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';

export const ChatContext = createContext({});

export enum Page {
	GUILD, // enables right sidebar, sets left sidebar to channels
	HOME,
	FEED,
	FRIENDS
};

export default function Chat() {
	let [ page, setPage ] = useState<string | Page>(Page.FRIENDS);

	return (
		<ChatContext.Provider value={{}}>
			<div className={styles.chat}>
				<div className={styles.sidebar}>
					<div className={`${styles.browse} ${hiddenScrollbar}`}	>
						<div className={styles.home}><Icon icon="homeSolid"/></div>
						<div className={styles.divider}/>
						{Array(50).fill(<Guild id="a" name="meme" icon="" />)}
						<div className={styles.add}>
							<Icon icon="plusRegular"/>
						</div>
					</div>
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