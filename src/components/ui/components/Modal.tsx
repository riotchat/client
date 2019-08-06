import React, { ReactNode } from "react";
import styles from './Modal.module.scss';

import { useAnimator, Animation } from "../../../scss/animations";
import Helmet from "react-helmet";

export interface ModalProps {
	dismiss?: () => void
	allowClose?: boolean
	closeCB?: (cb: () => void) => void
	children: ReactNode[] | ReactNode
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

	if (props.closeCB) props.closeCB(handleClose);

	return (
		<div className={styles.modal} onClick={handleClose} style={fadeAnimation.styles}>
			<Helmet>
				<meta name="theme-color" content='#1D1D1E'/>
			</Helmet>
			<div style={scaleAnimation.styles}>
				{ props.children }
			</div>
		</div>
	);
}