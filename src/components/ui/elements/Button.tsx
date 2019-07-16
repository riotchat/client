import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonType = 'confirm' | 'cancel' | 'warning';

interface ButtonProps {
	children: ReactNode[] | ReactNode
	type?: ButtonType
	click?: () => void
};

export function Button(props: ButtonProps) {
	let classes: any = {
		[styles.button]: true,
		[styles.disabled]: false
	};

	if (props.type) {
		classes[styles[props.type]] = true;
	}

	return (
		<div className={classNames(classes)} onClick={props.click}>
			{props.children}
		</div>
	);
}