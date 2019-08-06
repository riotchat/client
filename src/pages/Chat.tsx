import React, { createContext, useState, memo, useEffect } from 'react';
import Helmet from 'react-helmet';
import styles from './Chat.module.scss';

import { SwipeableDrawer } from '@material-ui/core';
import { HomeSidebar } from './chat/sidebar/conversation/Home';
import { GuildSidebar } from './chat/sidebar/conversation/Guild';
import Browser from './chat/sidebar/browser/Browser';
import { Profile } from './chat/sidebar/conversation/Profile';
import Channel from './chat/Channel';	
import { useVar } from '../components/util/CSS';
import Friends from './friends/Friends';
import MediaQuery from 'react-responsive';
import Notif from '../components/ui/components/Notification';
import { UpdateEmitter } from '..';
import { ModalContext, useModals, Modals } from './chat/modals/ModalContext';
import { Message } from 'riotchat.js/dist/internal/Message';
import { Instance } from '../internal/Client';
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';

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
	setDrawer: (open: boolean) => void,
	switch: (page: Page, channel?: string) => void
}>({
	page: Page.HOME,
	setPage: () => {},
	setChannel: () => {},
	setDrawer: () => {},
	switch: () => {}
});

const updateStrings = [
	"Senpai, senpai! An new update is available, just for you!",
	"🎉 An new update is available!",
	"A new update is ready for you, chief."
];

function Notify(title?: string, notif?: NotificationOptions, onclick?: () => void) {
	if (!('Notification' in window)) {
		alert("This browser does not support desktop notifications!");
	}
	
	else if (Notification.permission === "granted") {
		if (title) new Notification(title, notif).onclick = onclick || null;
	}
	
	else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(permission => {
			if (permission === "granted") {
				if (title) new Notification(title, notif).onclick = onclick || null;
			}
		});
	}
}

let messageDing = new Audio('/message.mp3');

const Chat = memo(() => {
	let [ page, setPage ] = useState<Page>(Page.HOME);
	let [ channel, setChannel ] = useState<string>();
	let [ drawer, setDrawer ] = useState(false);

	function switchTo(page: Page, channel?: string) {
		setChannel(channel);
		setPage(page);
		setDrawer(false);
	}

	let [ updateAvailable, setUpdate ] = useState(false);
	let [ updateString, setUpdateString ] = useState<string>();

	UpdateEmitter.removeAllListeners();
	UpdateEmitter.once('update', () => {
		setUpdate(true);
		setUpdateString(updateStrings[Math.floor(Math.random() * updateStrings.length)]);
	});

	Notify();
	function onMessage(msg: Message) {
		messageDing.play();
		Notify(msg.author.username, {
			body: msg.content,
			icon: msg.author.avatarURL,
			silent: true
		}, () => switchTo(msg.channel instanceof DMChannel ? Page.DM
				: msg.channel instanceof GroupChannel ? Page.GROUP : Page.GUILD, msg.channel.id));
	}

	useEffect(() => Instance.client.on('message', onMessage));

	let states = {
		page, setPage,
		channel, setChannel,
		setDrawer,
		switch: switchTo
	} as any;

	let body;
	if (page & 0x7) {
		body = <Channel id={channel as string} />;
	} else if (page & Page.HOME) {
		body = <div>home-y</div>;
	} else if (page & Page.FEED) {
		body = <div>feedy</div>;
	} else if (page & Page.FRIENDS) {
		body = <Friends />;
	}

	let sidebar = <div className={styles.sidebar}>
		<Browser />
		<div className={styles.conversation}>
			{ page ? <HomeSidebar /> : <GuildSidebar /> }
			<Profile />
		</div>
	</div>;

	let [ color, processRef ] = useVar('primary');
	let modalValues = useModals();
	return (
		<ChatContext.Provider value={states}>
			<ModalContext.Provider value={modalValues}>
				<Helmet>
					<meta name="theme-color" content={color || '#000000'} />
				</Helmet>
				<div className={styles.chat} ref={ref => processRef(ref)}>
					<MediaQuery minWidth={900}>
						{ (matches) =>
							<SwipeableDrawer
								variant={matches ? 'permanent' : 'temporary'}
								anchor="left"
								swipeAreaWidth={30}
								disableSwipeToOpen={
									(typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !((navigator as any).standalone))
								}
								open={drawer}
								onOpen={() => setDrawer(true)}
								onClose={() => setDrawer(false)}
								classes={{
									docked: styles.docked,
									paper: styles.drawer
								}}
								
							>
								{sidebar}
							</SwipeableDrawer>
						}
					</MediaQuery>
					<div className={styles.main}>
						{ updateAvailable && <Notif isElement={true} type='update' centerText={true}>
							{updateString}
							<button onClick={() => window.location.reload()}>Update</button>
						</Notif> }
						{body}
					</div>
				</div>
				<Modals />
			</ModalContext.Provider>
		</ChatContext.Provider>
	);
});

export default Chat;