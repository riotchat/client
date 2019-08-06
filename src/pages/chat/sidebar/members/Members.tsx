import React, { useContext, ReactNode } from 'react';
import styles from './Members.module.scss';

import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { SwipeableDrawer } from 'flatbase/dist';
import { ModalContext } from '../../modals/ModalContext';
import { hiddenScrollbar } from '../../../../components/util/Scrollbar';
import { ChatContext } from '../../../Chat';
import { Instance } from '../../../../internal/Client';
import { Channel } from 'riotchat.js';
import { GroupChannel } from 'riotchat.js/dist/internal/Channel';
import { SidebarEntry } from '../global/Entry';
import { ChannelContext, channelContext } from '../../Channel';

export default function MembersSidebar(props: { show: boolean }) {
	let chat = useContext(ChatContext);
	let channel: Channel = Instance.client.channels.get(chat.channel as string) as any;

	let { sidebar, setSidebar } = useContext(ChannelContext) as channelContext;
	let modals = useContext(ModalContext);

	let classes = classNames({
		[styles.sidebar]: true,
		[hiddenScrollbar]: true
	});

	let title: string, desc: string, members: ReactNode[], no: number;
	if (channel instanceof GroupChannel) {
		title = channel.group.displayTitle;
		desc = channel.description;

		no = channel.group.members.array().length;
		members = channel.group.members
			.array()
			.map(x =>
				<SidebarEntry for={x}
					onClick={() => modals && modals.setProfile(x)} />
			);
	}

	return (
		<MediaQuery maxWidth={900}>
			{ (matches) => (
				<SwipeableDrawer open={sidebar} onChange={setSidebar} position="right"
					closeOnOpacityClick={true} variant={matches ? "temporary" : (sidebar ? "permanent" : "temporary")}
					style={{ backgroundColor: "var(--secondary)" }}
					zIndex={100}
				>
					<div className={classes}>
						<div className={styles.header}>
							<div className={styles.channelTitle}>{ title }</div>
							<div className={styles.channelDesc}>{ desc }</div>
						</div>
                        <div className={styles.members}>
                            <div className={styles.role}>Members ― { no }</div>
                            { members }
                        </div>
					</div>
				</SwipeableDrawer>
			)}
		</MediaQuery>
	);
}