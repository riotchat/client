import React, { useState, useContext } from 'react';
import styles from './Browser.module.scss';
import classNames from 'classnames';

import { hiddenScrollbar } from "../../../../components/util/Scrollbar";
import { Guild } from "./Guild";
import { Icon } from "../../../../components/ui/elements/Icon";
import { Input } from '../../../../components/ui/elements/Input';
import Alert from '../../../../components/ui/components/Alert';
import { Instance } from '../../../../internal/Client';
import { Guild as RGuild, Channel } from 'riotchat.js';
import { ChatContext, Page } from '../../../Chat';
import Notification from '../../../../components/ui/components/Notification';
import { GuildChannel } from 'riotchat.js/dist/internal/Channel';

export default function Browser() {
	const chat = useContext(ChatContext);
	let channel = Instance.client.channels.get(chat.channel as string) as Channel | undefined;

	let [ showCreate, setCreate ] = useState(false);
	let [ creating, setCreating ] = useState(false);
	let [ guildName, setName ] = useState('');
	let [ error, setError ] = useState<string>();

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const selectedGuild = channel instanceof GuildChannel ? channel.guild.id : undefined;

	console.log(selectedGuild);

    return (
        <div className={classNames(styles.browse, hiddenScrollbar)}	>
			<div className={styles.home}
				onClick={() => chat.switch(Page.HOME)}><Icon icon="homeSolid"/></div>
			<div className={styles.divider}/>
			{
				Instance.client.guilds.array()
					.map(x => <Guild id={x.id} name={x.name} icon={x.iconURL} key={x.id}
						onClick={() => chat.switch(Page.GUILD, x.channels.array()[0].id)} />)
			}
			<div className={styles.padding}></div>
			<div className={styles.add}>
				<Icon icon="plusRegular" onClick={() => setCreate(true)} />
			</div>
			{ showCreate && <Alert
				title="Create guild"
				buttons={[
					{
						type: 'confirm',
						value: 'Create',
						disabled: creating,
						handler: () => {
							if (guildName.length > 0) {
								setError(undefined);
								setCreating(true);
								RGuild.create(Instance.client, guildName)
									.then(guild => {
										chat.switch(Page.GUILD, guild.channels.array()[0].id);
										setCreate(false);
										setCreating(false);
										setName('');
										forceUpdate();
									})
									.catch(e => {
										console.log(e);
										setError("Failed to create.");
										setCreating(false);
									});
							} else {
								setError("Enter a name.");
							}
						}
					},
					{
						value: 'Cancel',
						close: true,
						disabled: creating
					}
				]}
				dismiss={() => setCreate(false)}
				allowClose={!creating}>
				{ error && <Notification type="error" isElement>{ error }</Notification>}
				<Input type="text" placeholder="guild name" value={guildName}
					onChange={e => setName(e.target.value)} required />
			</Alert> }
		</div>
    );
}