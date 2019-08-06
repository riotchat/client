import React, { ReactNode, Fragment } from 'react';
import styles from './MobileHeader.module.scss';

import classNames from 'classnames';
import { Icon, Icons } from '../elements/Icon';
import { useMediaQuery } from '@material-ui/core';
import Helmet from 'react-helmet';
import { useVar } from '../../util/CSS';

interface HeaderProps {
	variant?: 'default' | 'chat'
	icon?: Icons
	secondaryIcon?: Icons[]
	onClose?: () => void
	onAction?: (() => void)[]
	showContentOnDesktop?: boolean
	children: ReactNode[] | ReactNode
};

export default function MobileHeader(props: HeaderProps) {
	let isDesktop = useMediaQuery('(min-width: 900px)');
	let [ color, processRef ] =
		useVar(props.variant === 'chat' ? 'primary' : 'secondary');

	if (isDesktop) {
		if (props.showContentOnDesktop) {
			return <Fragment>{ props.children }</Fragment>;
		}

		return null;
	}

	return (
		<div className={classNames(styles.header, styles[props.variant || 'default'])}
				ref={ref => processRef(ref)}>
			<Helmet>
				<meta name='theme-color' content={color} />
			</Helmet>
			{ props.icon && <Icon className={styles.icon} icon={props.icon} onClick={props.onClose} /> }
			<div className={styles.content}>{ props.children }</div>
			{ props.secondaryIcon && props.secondaryIcon
				.map((icon, i) => <Icon icon={icon} onClick={props.onAction ? props.onAction[i] : undefined}/>) }
		</div>
	);
}