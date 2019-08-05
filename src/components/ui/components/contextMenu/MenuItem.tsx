import React, { ReactNode } from 'react';
import styles from './MenuItem.module.scss';
import classNames from 'classnames';
import { Icons, Icon } from '../../elements/Icon';
import { useMediaQuery } from '@material-ui/core';
import { ClassValue } from 'classnames/types';

interface ItemProps {
	type?: 'item' | 'header'
	icon?: Icons
	hideOnDesktop?: boolean
	className?: ClassValue
	onClick?: () => void
	children: ReactNode[] | ReactNode
};

export default function MenuItem(props: ItemProps) {
	let isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop && props.hideOnDesktop)
		return null;

	return (
		<div className={classNames(styles.item, props.className)}
			data-type={props.type || 'item'}
			onClick={props.onClick}>
			{ props.icon && <Icon className={styles.icon} icon={props.icon} /> }
			{props.children}
		</div>
	);
}