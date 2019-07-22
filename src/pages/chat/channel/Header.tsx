import React, { useContext } from 'react';
import styles from './Header.module.scss';

import { ChannelContext } from '../Channel';
import { Channel } from 'riotchat.js';
import { Icon, Icons } from '../../../components/ui/elements/Icon';
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';

export default function Header() {
	let channel = useContext(ChannelContext) as Channel;
	let title, icon: Icons;
	if (channel instanceof DMChannel) {
		title = channel.recipient.username;
		icon = 'atRegular';
	} else if (channel instanceof GroupChannel) {
		title = channel.group.displayTitle;
		icon = 'groupSolid';
	} else {
		title = 'TODO';
		icon = 'chatSolid';
	}

	return (
        <div className={styles.header}>
            <div className={styles.info}>
                <div className={styles.hamburger}><Icon icon="menuRegular"/></div>
                <Icon className={styles.channel} icon={icon} />
                <div className={styles.title}>{title}</div>
                <div className={styles.dropdown}><Icon icon="chevronDownRegular"/></div>
                <div className={styles.divider}/>
                <div className={styles.description}>Hello this is a test description</div>
                <div className={styles.indicator}/>
            </div>
            <div className={styles.menu}>

            </div>
        </div>
	);
}