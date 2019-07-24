import React, { useContext, memo } from 'react';
import styles from './Channel.module.scss';

import { Icon } from "../../../../../components/ui/elements/Icon";
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';
import { ChatContext, Page } from '../../../../Chat';

interface ChannelProps {
    channel: DMChannel | GroupChannel
}

export const ChannelEntry = memo((props: ChannelProps) => {
    let chat = useContext(ChatContext);
    let iconURL, name, status, click;

    if (props.channel instanceof DMChannel) {
		let user = props.channel.recipient;
        iconURL = user.avatarURL;
        name = user.username;
        status = user.status;

        click = () => {
            chat.setPage(Page.DM);
            chat.setChannel(props.channel.id);
        };
    } else {
        iconURL = 'GROUP ICON';
        name = props.channel.group.displayTitle;

        click = () => {
            chat.setPage(Page.GROUP);
            chat.setChannel(props.channel.id);
        };
    }

    return (
        <div className={styles.parent} onClick={click} key={props.channel.id}>
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
                    <span className={styles.mobile}><Icon icon="mobileRegular"/></span>
                    {/*this.props.mobile && <div className={styles.mobile}><Icon icon="mobile"/></div>*/}
                </div>
                {
                    status && <div className={styles.status}>{status}</div>
                }
            </div>
        </div>
    );
});