import React, { useState, ReactNode } from 'react';
import Helmet from 'react-helmet'
import classNames from 'classnames';
import styles from './Modal.module.scss';
import { Button, ButtonType } from './Button';

interface ModalProps {
	title: string
	dismiss?: () => void
	allowClose?: boolean

	children: ReactNode[] | ReactNode
	buttons: {
		type?: ButtonType
		value: ReactNode[] | ReactNode
		handler?: () => void
		close?: boolean
	}[]
};

export default function Modal(props: ModalProps) {
	let [ closing, setClosing ] = useState(false);

	function handleClose(e?: React.MouseEvent) {
		if (e && (e.target !== e.currentTarget)) return;
		if (!props.allowClose) return;

		setClosing(true);
		setTimeout(() => {
			if (props.dismiss)
				props.dismiss();
		}, 250);
	}

	// ? REDO LATER
	let modalClasses = classNames(styles.modal, {
		[styles.animInB]: !closing,
		[styles.animOutB]: closing
	});

	// ? ALSO RE-DO
	let classes = classNames(styles.root, {
		[styles.animateIn]: !closing,
		[styles.animateOut]: closing
	});

	let buttons: ReactNode[] = props.buttons
		.map(btn => <Button type={btn.type}
			click={() => {
				if (btn.close) {
					handleClose();
				} else if (btn.handler) {
					btn.handler();
				}
			}}>
				{btn.value}
			</Button>);

	return (
		<div className={modalClasses} onClick={handleClose}>
			<Helmet>
				<meta name="theme-color" content='#1D1D1E'/>
			</Helmet>
			<div className={classes}>
				<div className={styles.container}>
					<span className={styles.title}>{props.title}</span>
					<p>{props.children}</p>
				</div>
				<div className={styles.footer}>
                    {buttons}
				</div>
			</div>
		</div>
	);
}