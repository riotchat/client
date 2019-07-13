import React from 'react';
import Helmet from 'react-helmet';
import styles from './Notification.module.scss';

interface NotificationProps {
	title: string,
	text: string,
	dismiss?: () => void
};

export default function Notification(props: NotificationProps) {
	return (
		<div className={styles.banner}>
			<Helmet>
				<meta name="theme-color" content='#D14F4F' />
			</Helmet>
			<span className={styles.title}>{props.title}</span>
			{ props.text && <span className={styles.divider} /> }
			<span className={styles.text}>{props.text}</span>
			{ props.dismiss && <p className={styles.dismiss} onClick={props.dismiss}>X</p> }
			{/*<Icon className={styles.dismiss} icon="x" type="regular"/>*/}
		</div>
	);
}