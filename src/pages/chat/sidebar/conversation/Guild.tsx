import React, { memo, useContext } from 'react';
//import styles from './Guild.module.scss';
import common from './common.module.scss';

import classNames from 'classnames';
import { scrollable } from '../../../../components/util/Scrollbar';
import { ChatContext } from '../../../Chat';
import { GuildChannel } from 'riotchat.js';
import { Instance } from '../../../../internal/Client';

export const GuildSidebar = memo(() => {
	let chat = useContext(ChatContext);
	let guild = (Instance.client.channels.get(chat.channel as string) as GuildChannel).guild;

	let classes = classNames(scrollable, common.sidebar);
	return (
		<div className={classes}>
			guild time
			<p>name: {guild.name}</p>
			<ul>
				{
					guild.channels.array()
						.map(x => <li>#{x.name}</li>)
				}
			</ul>
		</div>
	);
});