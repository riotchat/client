import React, { useState, Fragment, memo } from 'react';
import styles from './Home.module.scss';

import classNames from 'classnames';
import { Icon, Icons } from "../../../../components/ui/elements/Icon";
import { scrollable } from '../../../../components/util/Scrollbar';
import { Instance } from '../../../../internal/Client';
import { DMChannel, GroupChannel, Channel } from 'riotchat.js/dist/internal/Channel';
import { ChannelEntry } from './home/Channel';

export const HomeSidebar = memo(() => {
	function Channels(props: { array: Channel[], collapse: boolean }) {
		return (
			<div className={styles.directMessages}>
				{ props.array
					.slice(0, props.collapse ? 5 : props.array.length)
					.map((x: any) => <ChannelEntry channel={x} />) }
			</div>
		);
	}

	function Section(props: { title: string, icon: Icons, type: any }) {
		let [ collapsed, setCollapsed ] = useState(true);

		function toggle() {
			setCollapsed(!collapsed);
		}
		
		let array = Instance.client.channels
			.array()
			.filter(x => x instanceof props.type);

		// make array longer
		// array = array.concat(array, array, array, array, array, array, array);

		return (
			<Fragment>
				<div className={styles.category}>
                    <Icon icon="dropdown" className={classNames({[styles.collapsed]: collapsed})} />
					<span className={styles.title} onClick={toggle}>{props.title}</span>
					<Icon icon={props.icon} />
				</div>
				<Channels array={array} collapse={collapsed} />
				{ (collapsed && array.length > 5) &&
					<div className={styles.show} onClick={toggle}>Show all</div>
				}
			</Fragment>
		);
	}

	return (
		<div className={scrollable}>
			<div className={styles.tabs}>
				<div className={styles.tab}><Icon icon="homeSolid"/>Feed</div>
				<div className={styles.tab}><Icon icon="newsSolid"/>News</div>
				<div className={styles.tab}><Icon icon="userdetailSolid"/>Friends</div>
			</div>
			<Section title="Direct Messages" icon="userplusSolid" type={DMChannel} />
			<Section title="Group Messages" icon="plusRegular" type={GroupChannel} />
		</div>
	);
});