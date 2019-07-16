import React, { ReactNode } from 'react';
import Helmet from 'react-helmet'
import styles from './Modal.module.scss';
import { Button, ButtonType } from '../elements/Button';
import { useAnimator, Animation } from '../../../scss/animations';

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
	let [ fadeAnimation, playFade ] = useAnimator(Animation.FADE_IN, 250);
	let [ scaleAnimation, playScale ] = useAnimator(Animation.SCALE_IN, 250);

	function handleClose(e?: React.MouseEvent) {
		if (e && (e.target !== e.currentTarget)) return;
		if (!props.allowClose) return;

		playScale(Animation.SCALE_OUT, 250);
		playFade(Animation.FADE_OUT, 250)
			.then(() => props.dismiss && props.dismiss());
	}

	let buttons: ReactNode[] = props.buttons
		.map(btn => <Button theme={btn.type}
			onClick={() => {
				if (btn.close) {
					handleClose();
				} else if (btn.handler) {
					btn.handler();
				}
			}}>
				{btn.value}
			</Button>);

	return (
		<div className={styles.modal} onClick={handleClose} style={fadeAnimation.styles}>
			<Helmet>
				<meta name="theme-color" content='#1D1D1E'/>
			</Helmet>
			<div className={styles.root} style={scaleAnimation.styles}>
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