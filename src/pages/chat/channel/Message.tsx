import React, { memo } from 'react';
import styles from './Message.module.scss';

import { Message as RMessage } from 'riotchat.js/dist/internal/Message';

const Message = memo((props: { message: RMessage }) => {
	let msg = props.message;
	return (
		<div className={styles.message}>
			<div className={styles.author}>
				<img alt={msg.author.username} src={msg.author.avatarURL} />
			</div>
			<div className={styles.content}>
				<b>{msg.author.username}</b>
				<p>{msg.content}</p>
			</div>
		</div>
	);
});

export default Message;