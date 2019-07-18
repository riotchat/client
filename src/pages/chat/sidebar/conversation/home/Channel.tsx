import React from 'react';
import styles from './Channel.module.scss';

import { Icon } from "../../../../../components/ui/elements/Icon";
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';

interface ChannelProps {
    channel: DMChannel | GroupChannel
}

export function ChannelEntry(props: ChannelProps) {
    let iconURL, name, status;

    if (props.channel instanceof DMChannel) {
        iconURL = props.channel.users[1].avatarURL; // ! FIX
        name = props.channel.users[1].username;
        status = props.channel.users[1].status;
    } else {
        iconURL = 'GROUP ICON';
        name = props.channel.group.displayTitle;
    }

    return (
        <div className={styles.parent}>
				<div className={styles.avatar}
					aria-label={name}
					style={{ backgroundImage: `url("${iconURL}")` }}>
					{
                        status && <div className={`${styles.indicator} ${styles[status]}`} aria-label={status}  />
                    }
				</div>
				<div className={styles.username}>
					<div className={styles.usernameInline}>
						<span>{name}</span>
						<span className={styles.mobile}><Icon icon="mobile"/></span>
						{/*this.props.mobile && <div className={styles.mobile}><Icon icon="mobile"/></div>*/}
					</div>
                    {
                        status && <div className={styles.status}>{status}</div>
                    }
				</div>
			</div>
    );
}