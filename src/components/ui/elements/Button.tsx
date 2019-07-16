import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { killChildren } from '../../util/Children';

export type ButtonType = 'confirm' | 'cancel' | 'warning';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode[] | ReactNode
	theme?: ButtonType
	fullWidth?: boolean
};

export function Button(props: ButtonProps) {
	let classes: any = {
		[styles.button]: true,
		[styles.disabled]: props.disabled,
		[styles.fullwidth]: props.fullWidth
	};

	if (props.theme) {
		classes[styles[props.theme]] = true;
	}
	
	return (
		<button {...killChildren(props)} className={classNames(classes)}>
			{props.children || props.value}
		</button>
	);
}