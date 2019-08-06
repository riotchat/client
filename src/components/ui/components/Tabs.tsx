import React, { ReactNode } from 'react';
import styles from './Tabs.module.scss';
import classNames from 'classnames';

interface TabProps {
	variant?: 'default' | 'compact'
	fullWidth?: boolean
	children: ReactNode[]
	index: number
	setIndex: (i: number) => void
};

export default function Tabs(props: TabProps) {
	return (
		<div className={classNames(styles.tabs, styles[props.variant || 'default'], { [styles.fullwidth]: props.fullWidth })}>
			{
				props.children
					.map((child, i) =>
						<div className={styles.tab}
							onClick={() => props.setIndex(i)}
							data-active={props.index === i}>
							{ child }
							{ props.index === i && <div className={styles.bar}/> }
						</div>
					)
			}
		</div>
	);
}