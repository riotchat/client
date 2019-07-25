import React, { ReactNode } from 'react';
import styles from './Tabs.module.scss';

interface TabProps {
	children: ReactNode[],
	index: number,
	setIndex: (i: number) => void
};

export default function Tabs(props: TabProps) {
	return (
		<div className={styles.tabs}>
			{
				props.children
					.map((child, i) =>
						<div className={styles.tab}
							onClick={() => props.setIndex(i)}
							data-active={props.index === i}>
							{ child }	
						</div>
					)
			}
		</div>
	);
}