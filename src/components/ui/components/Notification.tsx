import React, { Fragment, ReactNode } from 'react';
import Helmet from 'react-helmet';
import styles from './Notification.module.scss';
import classNames from 'classnames';
import { useAnimator, Animation } from '../../../scss/animations';

interface NotificationProps {
	type: 'error' | 'update'
	title?: string
	children: ReactNode[] | ReactNode
	centerText?: boolean
	isElement?: boolean
	dismiss?: () => void
};

const colours = {
	error: '#D14F4F',
	update: '#36AD93'
};

export default function Notification(props: NotificationProps) {
	let [ slideAnimation ] = useAnimator(Animation.SLIDE_IN, 250);
	let classes = classNames({
		[styles.banner]: true,
		[styles[props.type]]: true,
		[styles.centered]: props.centerText,
		[styles.inherit]: props.isElement
	});

	return (
		<div className={classes}
			style={slideAnimation.styles}>
			<Helmet>
				<meta name="theme-color" content={colours[props.type]} />
			</Helmet>
			{ props.title && 
				<Fragment>
					<span className={styles.title}>{props.title}</span>
					<span className={styles.divider} />
				</Fragment>
			}
			<div className={styles.text}>
				{props.children}
			</div>
			{ props.dismiss && <p className={styles.dismiss} onClick={props.dismiss}>X</p> }
		</div>
	);
}