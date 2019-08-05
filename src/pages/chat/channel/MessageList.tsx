import React, { Fragment, memo, useState } from 'react';
import styles from './MessageList.module.scss';
import moment from 'moment';

import { Message as RMessage } from 'riotchat.js/dist/internal/Message';
import useContextMenu from '../../../components/ui/components/ContextMenu';
import MenuItem from '../../../components/ui/components/contextMenu/MenuItem';

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

	let days: RMessage[][][] = [[[]]];

	props.messages.forEach(msg => {
		let day = days[days.length - 1];
		let group = day[day.length - 1];

		let lastMessage = group[group.length - 1];

		if (!lastMessage) {
			group.push(msg);
		} else {
			let a = msg.createdAt || new Date();
			let b = lastMessage.createdAt || new Date();
			if (isDifferentDay(a, b)) {
				days.push([[ msg ]]);
			} else if (diffMinutes(a, b) > 10
				|| msg.author !== lastMessage.author) {
				day.push([ msg ]);
			} else {
				group.push(msg);
			}
		}
	});

	let [ selectedMessage, setMessage ] = useState<RMessage>();
	function share() {
		if (typeof navigator.share === 'undefined' ||
			typeof selectedMessage === 'undefined')
			return alert('oooofed');
		
		navigator.share({
			title: selectedMessage.author.username,
			text: selectedMessage.content
		}).then(x => console.log('shared'))
		.catch(e => alert(e));
	}

	let [ contextMenu, showMenu ] = useContextMenu([
		<MenuItem hideOnDesktop type='header' className={styles.contextHeader}>
			<div className={styles.avatar} style={{ backgroundImage: `url('${selectedMessage && selectedMessage.author.avatarURL}')`}}/>
			<div className={styles.context}>
				<div className={styles.username}>{ selectedMessage && selectedMessage.author.username }</div>
				<div className={styles.cMessage}>{ selectedMessage && selectedMessage.content }</div>
			</div>
		</MenuItem>,
		<MenuItem icon='copyAltRegular'>Copy Text</MenuItem>,
		<MenuItem icon='smileyHappySolid'>Add Reaction</MenuItem>,
		<MenuItem icon='pencilSolid'>Edit</MenuItem>,
		<MenuItem icon='pinSolid'>Pin Message</MenuItem>,
		<MenuItem hideOnDesktop icon='shareAltSolid' onClick={share}>Share</MenuItem>
	]);

	function onContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>, x: RMessage) {
		e.preventDefault();
		setMessage(x);
		showMenu(e.pageX, e.pageY);
	}

	return <Fragment>
		{
			days.map(day => <Fragment>
				<div className={styles.separator}>
					<div className={styles.bar}/>
					<div className={styles.text}>
						<time>{moment(day[0][0].createdAt).format('ll')}</time>
					</div>
					<div className={styles.bar}/>
				</div>
				{ day.map(group =>
					<div className={styles.message}>
						<div className={styles.avatar} style={{ backgroundImage: `url("${group[0].author.avatarURL}")` }}></div>
							<div className={styles.content}>
							<div className={styles.header}>
								<span className={styles.username}>{group[0].author.username}</span>
								<time> { moment(group[0].createdAt).calendar() }</time>
							</div>
							{ group.map(x => <div className={styles.line}
												onContextMenu={e => onContextMenu(e, x)}>{x.content}</div>) }
						</div>
					</div>
				) }
			</Fragment>)
		}
		{ contextMenu }
	</Fragment>;
});

export default MessageList;