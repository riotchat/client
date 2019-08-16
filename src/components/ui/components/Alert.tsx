import React, { ReactNode } from 'react';
import styles from './Alert.module.scss';
import { Button, ButtonType } from '../elements/Button';
import Modal, { ModalProps } from './Modal';

interface AlertProps extends ModalProps {
	title: string
	buttons: {
		type?: ButtonType
		value: ReactNode[] | ReactNode
		handler?: () => void
		close?: boolean
		disabled?: boolean
	}[]
};

export default function Alert(props: AlertProps) {
	let handleClose: () => void;
	let buttons: ReactNode[] = props.buttons
		.map(btn => <Button theme={btn.type}
			onClick={() => {
				if (btn.disabled) return;
				if (btn.close && handleClose) {
					handleClose();
				} else if (btn.handler) {
					btn.handler();
				}
			}}
			disabled={btn.disabled}>
				{btn.value}
			</Button>);

	return (
		<Modal dismiss={props.dismiss} allowClose={props.allowClose} closeCB={cb => handleClose = cb}>
			<div className={styles.root}>
				<div className={styles.container}>
					<span className={styles.title}>{props.title}</span>
					<p>{props.children}</p>
				</div>
				<div className={styles.footer}>
                    {buttons}
				</div>
			</div>
		</Modal>
	);
}