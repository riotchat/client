import React from 'react';
import styles from './Chat.module.scss';

import { Icon } from '../components/ui/elements/Icon';
import { hiddenScrollbar } from '../components/util/Scrollbar';
import { Guild } from './chat/browser/Guild';

export default function Chat() {
	return (
		<div className={styles.chat}>
			<div className={styles.sidebar}>
				<div className={`${styles.browse} ${hiddenScrollbar}`}	>
                    <div className={styles.home}><Icon icon="homeSolid"/></div>
                    <div className={styles.divider}/>
					{Array(50).fill(<Guild id="a" name="meme" icon="" />)}
                    <div className={styles.add}>
						<Icon icon="plusRegular"/>
					</div>
				</div>
				<div className={styles.conversation}>
					channels
				</div>
			</div>
			<div className={styles.main}>
				yeet
			</div>
		</div>
	);
}