import React, { useContext, Fragment } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

import { ChannelContext, channelContext } from '../Channel';
import { Icon, Icons } from '../../../components/ui/elements/Icon';
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';
import { ChatContext } from '../../Chat';

export default function Header() {
	let chat = useContext(ChatContext);
	let { channel, sidebar, setSidebar } = useContext(ChannelContext) as channelContext;

	let title, icon: Icons, description;
	if (channel instanceof DMChannel) {
		title = channel.recipient.username;
		icon = 'atRegular';
	} else if (channel instanceof GroupChannel) {
		title = channel.group.displayTitle;
		icon = 'groupSolid';
		description = channel.description;
	} else {
		title = 'TODO';
		icon = 'chatSolid';
	}

	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<div className={styles.hamburger} onClick={() => chat.setDrawer(true)}><Icon icon="menuRegular"/></div>
				<Icon className={styles.channel} icon={icon} />
				<div className={styles.title}>{title}</div>
				{ channel instanceof DMChannel && <div className={classNames(styles.indicator, styles[channel.recipient.status])}/> }
				{ channel instanceof GroupChannel && <div className={styles.dropdown}><Icon icon="chevronDownRegular"/></div>  }
				{ description && <Fragment>
					<div className={styles.divider}/>
					<div className={styles.description}>{ description }</div>
				</Fragment> }
			</div>
			<div className={styles.menu}>
                <Icon className={styles.icon} icon="bellSolid" />
				{ channel instanceof GroupChannel && <Icon className={styles.icon} icon="groupSolid" onClick={() => setSidebar(!sidebar)} /> }
                <Icon className={styles.feedback} icon="megaphoneSolid" />
			</div>
		</div>
	);
}