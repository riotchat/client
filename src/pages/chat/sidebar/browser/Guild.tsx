import React, { memo } from 'react';
import styles from './Guild.module.scss';

interface GuildProps {
    id: string
	name: string
	icon: string
	onClick: () => void
};

export const Guild = memo((props: GuildProps) => {
    return (
		<div className={`${styles.icon}`} draggable={true}
			style={{ backgroundImage: `url("${props.icon}")` }}
			onClick={props.onClick} />
    );
});