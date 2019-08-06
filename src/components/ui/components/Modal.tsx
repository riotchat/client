import React, { ReactNode } from "react";
import styles from './Modal.module.scss';

import { useAnimator, Animation } from "../../../scss/animations";
import Helmet from "react-helmet";
import { useMediaQuery } from "@material-ui/core";

export interface ModalProps {
	dismiss?: () => void
	allowClose?: boolean
	closeCB?: (cb: () => void) => void
	canActAsPage?: boolean
	children: ReactNode[] | ReactNode
};

export default function Modal(props: ModalProps) {
	let isDesktop = useMediaQuery('(min-width: 900px)');
	
	let [ fadeAnimation, playFade ] = useAnimator(isDesktop || !props.canActAsPage ? Animation.FADE_IN : Animation.PAGE_IN, 250);
	let [ scaleAnimation, playScale ] = useAnimator(Animation.SCALE_IN, 250);

	function handleClose(e?: React.MouseEvent) {
		if (e && (e.target !== e.currentTarget)) return;
		if (!props.allowClose) return;

		playScale(Animation.SCALE_OUT, 250);
		playFade(isDesktop || !props.canActAsPage ? Animation.FADE_OUT : Animation.PAGE_OUT, 250)
			.then(() => props.dismiss && props.dismiss());
	}

	if (props.closeCB) props.closeCB(handleClose);

	return (
		<div className={styles.modal} onClick={handleClose} style={fadeAnimation.styles}>
			<Helmet>
				<meta name="theme-color" content='#1D1D1E'/>
			</Helmet>
			<div style={isDesktop || !props.canActAsPage ? scaleAnimation.styles : undefined}>
				{ props.children }
			</div>
		</div>
	);
}