import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
	children: ReactNode[] | ReactNode
	type?: 'accept' | 'cancel' | 'warning'
};

export function Button(props: ButtonProps) {
	let classes: any = {
		[styles.button]: true,
		[styles.disabled]: true
	};

	if (props.type) {
		classes[styles[props.type]] = true;
	}

	return (
		<div className={classNames(classes)}>
			{props.children}
		</div>
	);
}