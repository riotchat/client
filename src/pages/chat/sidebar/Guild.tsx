import React from 'react';
import styles from './Guild.module.scss';

interface GuildProps {
    id: string
	name: string
	icon: string
};

export function Guild(props: GuildProps) {
    return (
        <div className={`${styles.icon}`} draggable={true} style={{ backgroundImage: `url("${props.icon}")` }}/>
    );
}