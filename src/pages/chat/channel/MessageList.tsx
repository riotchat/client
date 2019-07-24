import React, { Fragment, memo } from 'react';
import styles from './MessageList.module.scss';
import moment from 'moment';

import { Message as RMessage } from 'riotchat.js/dist/internal/Message';

function isDifferentDay(a: Date, b: Date) {
	return a.getDate() !== b.getDate();
}

function diffMinutes(a: Date, b: Date) {
	var diff = (a.getTime() - b.getTime()) / 1000;
	diff /= 60;
	
	return Math.abs(Math.round(diff));
}

const MessageList = memo((props: { messages: RMessage[] }) => {
	if (props.messages.length === 0)
		return <Fragment />;

	let index: RMessage[][][] = [[[]]];

	props.messages.forEach(msg => {
		let day = index[index.length - 1];
		let separator = day[day.length - 1];
		let last = separator[separator.length - 1];

		if (!last) {
			separator.push(msg);
		} else {
			if (isDifferentDay(msg.createdAt, last.createdAt)) {
				index.push([[ msg ]]);
			} if (diffMinutes(msg.createdAt, last.createdAt) > 10
				|| msg.author !== last.author) {
				day.push([ msg ]);
			} else {
				separator.push(msg);
			}
		}
	});

	return <Fragment>
		{
			index.map(day => <Fragment>
				<div className={styles.separator}>
					<div className={styles.bar}/>
					<div className={styles.text}>{day[0][0].createdAt.getDate()}</div>
					<div className={styles.bar}/>
				</div>
				{ day.map(group =>
					<div className={styles.message}>
						<div className={styles.avatar} style={{ backgroundImage: `url("${group[0].author.avatarURL}")` }}></div>
							<div className={styles.content}>
							<div className={styles.header}>
								<span className={styles.username}>{group[0].author.username}</span>
								<time>{ moment(group[0].createdAt).calendar() }</time>
							</div>
							{ group.map(x => <div>{x.content}</div>) }
						</div>
					</div>
				) }
			</Fragment>)
		}
	</Fragment>;
});

export default MessageList;