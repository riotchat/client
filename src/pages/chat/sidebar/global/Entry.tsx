import React, { useContext, memo } from 'react';
import styles from './Channel.module.scss';

import { Icon } from "../../../../components/ui/elements/Icon";
import { DMChannel, GroupChannel } from 'riotchat.js/dist/internal/Channel';
import { ChatContext, Page } from '../../../Chat';
import { User } from 'riotchat.js';

interface EntryProps {
    for: DMChannel | GroupChannel | User
}

export const SidebarEntry = memo((props: EntryProps) => {
    let chat = useContext(ChatContext);
    let iconURL, name, status, click;

	if (props.for instanceof User) {
		let user = props.for;
        iconURL = user.avatarURL;
        name = user.username;
        status = user.status;

        click = async () => chat.switch(Page.DM, (await user.openDM()).id);
	} else if (props.for instanceof DMChannel) {
		let user = props.for.recipient;
        iconURL = user.avatarURL;
        name = user.username;
        status = user.status;

        click = () => chat.switch(Page.DM, props.for.id);
    } else {
        iconURL = 'GROUP ICON';
        name = props.for.group.displayTitle;

        click = () => chat.switch(Page.GROUP, props.for.id);
    }

    return (
		<div className={styles.parent} onClick={click} key={props.for.id}
				data-active={props.for.id === chat.channel}>
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