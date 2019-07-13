import React, { ReactNode } from 'react';
import styles from './Link.module.scss';

interface LinkProps {
	href: string
	children: ReactNode[] | ReactNode
};

export default function Link(props: LinkProps) {
	return (
		<a className={styles.link} href={props.href}>
			{props.children}
		</a>
	);
}